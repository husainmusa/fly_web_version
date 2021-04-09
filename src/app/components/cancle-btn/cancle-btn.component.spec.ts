import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancleBtnComponent } from './cancle-btn.component';

describe('CancleBtnComponent', () => {
  let component: CancleBtnComponent;
  let fixture: ComponentFixture<CancleBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancleBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancleBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
