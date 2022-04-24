import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPreauthComponent } from './new-preauth.component';

describe('NewPreauthComponent', () => {
  let component: NewPreauthComponent;
  let fixture: ComponentFixture<NewPreauthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPreauthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPreauthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
