import {InserateComponent} from './inserate.component';
import {InserateService} from "../../services/inserate.service";
import {instance, mock, when} from "ts-mockito";
import {Inserat} from "../../model/inserat";
import {of} from "rxjs";

function createInserat(titel: string = 'random title') {
    return <Inserat>{
        id: 1,
        titel: titel,
        beschreibung: 'beschreibung'
    };
}

describe('InserateComponent', () => {
    it('should display inserate from server', () => {
        const inserate = [
            createInserat()
        ];
        const inserateServiceMock = mock(InserateService);
        when(inserateServiceMock.loadAll()).thenReturn(of(inserate));
        const component = new InserateComponent(instance(inserateServiceMock));

        expect(component.inserate).toEqual(inserate);
    });
});
