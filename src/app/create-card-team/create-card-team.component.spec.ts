import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCardTeamComponent } from './create-card-team.component';

describe('CreateCardTeamComponent', () => {
  let component: CreateCardTeamComponent;
  let fixture: ComponentFixture<CreateCardTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCardTeamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCardTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
