import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DriverService } from '../../../core/services/driver.service';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent implements OnInit {
  vehicleForm!: FormGroup;
  isEditMode = false;
  vehicleId: string | null = null;
  loading = false;
  driverImageFile: File | null = null;
  vehicleImageFile: File | null = null;
  currentVehicle = null;

  constructor(
    private fb: FormBuilder,
    private driverService: DriverService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Get data from router state
    const navigation = this.router.getCurrentNavigation();
    console.log(navigation)
    if (navigation?.extras.state) {
      const vehicle = navigation.extras.state['vehicle'];
      this.isEditMode = navigation.extras.state['isEditMode'] || false;

      if (vehicle) {
        this.currentVehicle = vehicle;
        this.vehicleId = vehicle._id;
        setTimeout(() => {
          this.populateForm(vehicle);
        });
      }
    }
  }

  ngOnInit(): void {

    this.vehicleForm = this.fb.group({
      driverName: ['', Validators.required],
      driverMobileNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      driverVehicleNumber: ['', Validators.required],
      driverAddress: ['', Validators.required],
      driverFare: ['', [Validators.required, Validators.min(0)]],
      driverDescription: ['']
    });
  }

  populateForm(vehicle: any): void {
    this.vehicleForm.patchValue({
      driverName: vehicle.driverName,
      driverMobileNumber: vehicle.driverMobileNumber,
      driverVehicleNumber: vehicle.driverVehicleNumber || '',
      driverAddress: vehicle.driverAddress,
      driverFare: vehicle.driverFare,
      driverDescription: vehicle.driverDescription
    });
  }

  onFileSelect(event: any, type: 'driver' | 'vehicle'): void {
    if (type === 'driver') {
      this.driverImageFile = event.target.files[0];
    } else {
      this.vehicleImageFile = event.target.files[0];
    }
  }

  onSubmit(): void {
    if (this.vehicleForm.invalid) {
      Object.keys(this.vehicleForm.controls).forEach(key => {
        this.vehicleForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.loading = true;
    const formData = new FormData();

    Object.keys(this.vehicleForm.value).forEach(key => {
      formData.append(key, this.vehicleForm.value[key]);
    });

    if (this.driverImageFile) {
      formData.append('driverImage', this.driverImageFile);
    }

    if (this.vehicleImageFile) {
      formData.append('vehicleImage', this.vehicleImageFile);
    }

    const request = this.isEditMode
      ? this.driverService.updateVehicle(this.vehicleId!, formData)
      : this.driverService.addVehicle(formData);

    request.subscribe({
      next: () => {
        this.router.navigate(['/driver/dashboard']);
      },
      error: (error) => {
        console.error('Error saving vehicle:', error);
        alert('Failed to save vehicle');
        this.loading = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/driver/dashboard']);
  }
}
