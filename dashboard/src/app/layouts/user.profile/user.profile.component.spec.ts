import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { User.ProfileComponent } from './user.profile.component';

describe('User.ProfileComponent', () => {
  let component: User.ProfileComponent;
  let fixture: ComponentFixture<User.ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ User.ProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(User.ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
