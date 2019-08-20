import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsploraPage } from './esplora.page';

describe('EsploraPage', () => {
  let component: EsploraPage;
  let fixture: ComponentFixture<BessiaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsploraPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsploraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
