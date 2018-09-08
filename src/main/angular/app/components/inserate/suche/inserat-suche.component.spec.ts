import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InseratSucheComponent } from './inserat-suche.component';

describe('InseratSucheComponent', () => {
  let component: InseratSucheComponent;
  let fixture: ComponentFixture<InseratSucheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InseratSucheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InseratSucheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
