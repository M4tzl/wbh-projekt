import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoriesDetailComponent } from './stories-detail.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('StoriesDetailComponent', () => {
  let component: StoriesDetailComponent;
  let fixture: ComponentFixture<StoriesDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoriesDetailComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoriesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
