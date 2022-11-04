import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperuserEmailSignatureComponent } from './superuser-email-signature.component';

describe('SuperuserEmailSignatureComponent', () => {
  let component: SuperuserEmailSignatureComponent;
  let fixture: ComponentFixture<SuperuserEmailSignatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperuserEmailSignatureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperuserEmailSignatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
