import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVertNavbarComponent } from './admin-vert-navbar.component';

describe('AdminVertNavbarComponent', () => {
  let component: AdminVertNavbarComponent;
  let fixture: ComponentFixture<AdminVertNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminVertNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminVertNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
