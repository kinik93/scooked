import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocknotePage } from './blocknote.page';

describe('BlocknotePage', () => {
  let component: BlocknotePage;
  let fixture: ComponentFixture<BlocknotePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlocknotePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocknotePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
