import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VermittlerRegistryComponent } from './vermittler-registry.component';

describe('VermittlerRegistryComponent', () => {
  let component: VermittlerRegistryComponent;
  let fixture: ComponentFixture<VermittlerRegistryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VermittlerRegistryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VermittlerRegistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
