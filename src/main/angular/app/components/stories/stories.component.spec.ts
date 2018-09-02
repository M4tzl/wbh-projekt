import {StoriesComponent} from './stories.component';
import {instance, mock, when} from "ts-mockito";
import {of} from "rxjs";
import {Story} from "../../model/story";
import {StoriesService} from "../../services/stories.service";

function createStory(titel: string = 'random title') {
    return <Story>{
        id: 1,
        titel: titel,
        beschreibung: 'beschreibung'
    };
}

describe('StoriesComponent', () => {
    it('should display stories from server', () => {
        const stories = [
            createStory()
        ];
        const storiesServiceMock = mock(StoriesService);
        when(storiesServiceMock.loadAll()).thenReturn(of(stories));
        const component = new StoriesComponent(instance(storiesServiceMock));

        expect(component.stories).toEqual(stories);
    });
});
