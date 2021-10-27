import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetrievalsComponent } from './retrievals.component';

describe('RetrievalsComponent', () => {
  let component: RetrievalsComponent;
  let fixture: ComponentFixture<RetrievalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetrievalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetrievalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
