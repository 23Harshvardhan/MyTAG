import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperuserSettingsComponent } from './superuser-settings.component';

describe('SuperuserSettingsComponent', () => {
  let component: SuperuserSettingsComponent;
  let fixture: ComponentFixture<SuperuserSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperuserSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperuserSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
