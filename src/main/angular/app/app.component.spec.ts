import {async, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import { RouterTestingModule } from '@angular/router/testing';
import {InserateComponent} from "./inserate/inserate.component";
import { StoriesComponent } from './stories/stories.component';
import { StoriesDetailComponent } from './stories-detail/stories-detail.component';
describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule,RouterTestingModule],
            declarations: [
                AppComponent,
                InserateComponent,
                StoriesComponent,
                StoriesDetailComponent
            ],
        }).compileComponents();
    }));

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
    it(`should have as title 'app'`, async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual('app');
    }));

});

