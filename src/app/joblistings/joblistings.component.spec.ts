import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoblistingsComponent } from './joblistings.component';

describe('JoblistingsComponent', () => {
  let component: JoblistingsComponent;
  let fixture: ComponentFixture<JoblistingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JoblistingsComponent]
    });
    fixture = TestBed.createComponent(JoblistingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
