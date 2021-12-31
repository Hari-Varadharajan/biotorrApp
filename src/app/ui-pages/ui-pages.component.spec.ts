import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiPagesComponent } from './ui-pages.component';

describe('UiPagesComponent', () => {
  let component: UiPagesComponent;
  let fixture: ComponentFixture<UiPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiPagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UiPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
