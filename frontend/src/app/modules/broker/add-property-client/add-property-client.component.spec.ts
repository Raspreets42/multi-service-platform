import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPropertyClientComponent } from './add-property-client.component';

describe('AddPropertyClientComponent', () => {
  let component: AddPropertyClientComponent;
  let fixture: ComponentFixture<AddPropertyClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPropertyClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPropertyClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
