import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {InserateComponent} from './inserate.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('InserateComponent', () => {
    let component: InserateComponent;
    let fixture: ComponentFixture<InserateComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [InserateComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InserateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
