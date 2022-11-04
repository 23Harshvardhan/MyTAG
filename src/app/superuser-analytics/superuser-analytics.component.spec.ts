import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperuserAnalyticsComponent } from './superuser-analytics.component';

describe('SuperuserAnalyticsComponent', () => {
  let component: SuperuserAnalyticsComponent;
  let fixture: ComponentFixture<SuperuserAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperuserAnalyticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperuserAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
