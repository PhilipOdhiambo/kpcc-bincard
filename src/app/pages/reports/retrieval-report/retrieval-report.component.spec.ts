import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetrievalReportComponent } from './retrieval-report.component';

describe('RetrievalReportComponent', () => {
  let component: RetrievalReportComponent;
  let fixture: ComponentFixture<RetrievalReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetrievalReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetrievalReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
