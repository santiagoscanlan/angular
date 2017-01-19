/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IdComponent } from './id.component';

describe('IdComponent', () => {
  let component: IdComponent;
  let fixture: ComponentFixture<IdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
