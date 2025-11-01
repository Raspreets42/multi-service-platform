import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCatererComponent } from './add-caterer.component';

describe('AddCatererComponent', () => {
  let component: AddCatererComponent;
  let fixture: ComponentFixture<AddCatererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCatererComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCatererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
