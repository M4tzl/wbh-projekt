import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InseratKontaktComponent } from './inserat-kontakt.component';

describe('InseratKontaktComponent', () => {
  let component: InseratKontaktComponent;
  let fixture: ComponentFixture<InseratKontaktComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InseratKontaktComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InseratKontaktComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
