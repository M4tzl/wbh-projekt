import {InserateUebersichtComponent} from './inserate-uebersicht.component';
import {InserateService} from "../../../services/inserate.service";
import {instance, mock, when} from "ts-mockito";
import {InseratUebersicht} from "../../../model/inserat-uebersicht";
import {of} from "rxjs";

function createInserat(titel: string = 'random title') {
    return <InseratUebersicht>{
        id: 1,
        titel: titel,
        beschreibung: 'beschreibung'
    };
}

describe('InserateUebersichtComponent', () => {
    it('should display inserate from server', () => {
        const inserate = [
            createInserat()
        ];
        const inserateServiceMock = mock(InserateService);
        when(inserateServiceMock.loadAll()).thenReturn(of(inserate));
        const component = new InserateUebersichtComponent(instance(inserateServiceMock));

        expect(component.inserate).toEqual(inserate);
    });
});
