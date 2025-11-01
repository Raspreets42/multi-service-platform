import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleToggleComponent } from './role-toggle.component';

describe('RoleToggleComponent', () => {
  let component: RoleToggleComponent;
  let fixture: ComponentFixture<RoleToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleToggleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
