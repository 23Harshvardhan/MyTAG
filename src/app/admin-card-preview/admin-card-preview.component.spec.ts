import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCardPreviewComponent } from './admin-card-preview.component';

describe('AdminCardPreviewComponent', () => {
  let component: AdminCardPreviewComponent;
  let fixture: ComponentFixture<AdminCardPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCardPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCardPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
