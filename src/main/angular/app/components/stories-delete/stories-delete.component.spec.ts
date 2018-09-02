import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoriesDeleteComponent } from './stories-delete.component';

describe('StoriesDeleteComponent', () => {
  let component: StoriesDeleteComponent;
  let fixture: ComponentFixture<StoriesDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoriesDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoriesDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
