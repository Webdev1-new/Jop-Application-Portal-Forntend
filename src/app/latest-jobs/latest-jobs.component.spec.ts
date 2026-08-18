import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestJobsComponent } from './latest-jobs.component';

describe('LatestJobsComponent', () => {
  let component: LatestJobsComponent;
  let fixture: ComponentFixture<LatestJobsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LatestJobsComponent]
    });
    fixture = TestBed.createComponent(LatestJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
