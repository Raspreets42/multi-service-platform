import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRideClientComponent } from './add-ride-client.component';

describe('AddRideClientComponent', () => {
  let component: AddRideClientComponent;
  let fixture: ComponentFixture<AddRideClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRideClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRideClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
