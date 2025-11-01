import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTiffinClientComponent } from './add-tiffin-client.component';

describe('AddTiffinClientComponent', () => {
  let component: AddTiffinClientComponent;
  let fixture: ComponentFixture<AddTiffinClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTiffinClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTiffinClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
