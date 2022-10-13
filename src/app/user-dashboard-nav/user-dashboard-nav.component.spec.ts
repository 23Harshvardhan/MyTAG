import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashboardNavComponent } from './user-dashboard-nav.component';

describe('UserDashboardNavComponent', () => {
  let component: UserDashboardNavComponent;
  let fixture: ComponentFixture<UserDashboardNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDashboardNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDashboardNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
