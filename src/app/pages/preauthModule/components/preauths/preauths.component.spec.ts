import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreauthsComponent } from './preauths.component';

describe('PreauthsComponent', () => {
  let component: PreauthsComponent;
  let fixture: ComponentFixture<PreauthsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreauthsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreauthsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
