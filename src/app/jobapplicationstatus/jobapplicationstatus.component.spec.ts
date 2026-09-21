import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobapplicationstatusComponent } from './jobapplicationstatus.component';

describe('JobapplicationstatusComponent', () => {
  let component: JobapplicationstatusComponent;
  let fixture: ComponentFixture<JobapplicationstatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobapplicationstatusComponent]
    });
    fixture = TestBed.createComponent(JobapplicationstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
