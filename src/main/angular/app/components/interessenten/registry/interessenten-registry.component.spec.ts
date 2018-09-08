import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InteressentenRegistryComponent } from './interessenten-registry.component';

describe('InteressentenRegistryComponent', () => {
  let component: InteressentenRegistryComponent;
  let fixture: ComponentFixture<InteressentenRegistryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InteressentenRegistryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InteressentenRegistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
