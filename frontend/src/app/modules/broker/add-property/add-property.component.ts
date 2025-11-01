import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BrokerService } from '../../../core/services/broker.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
  propertyForm!: FormGroup;
  isEditMode = false;
  propertyId: string | null = null;
  loading = false;
  selectedFiles: File[] = [];
  ownerImageFile: File | null = null;
  propertyTypes = ['1BHK', '2BHK', '3BHK', 'PG', 'HOSTEL'];
  currentProperty = null;

  constructor(
    private fb: FormBuilder,
    private brokerService: BrokerService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Get data from router state
    const navigation = this.router.getCurrentNavigation();
    console.log(navigation)
    if (navigation?.extras.state) {
      const property = navigation.extras.state['property'];
      this.isEditMode = navigation.extras.state['isEditMode'] || false;

      if (property) {
        this.currentProperty = property;
        this.propertyId = property._id;
        setTimeout(() => {
          this.populateForm(property);
        });
        console.log(this.currentProperty)
        console.log(this.isEditMode)
      }
    }
  }

  populateForm(property: any): void {
    this.propertyForm.patchValue({
      ownerName: property.ownerName,
      ownerMobileNumber: property.ownerMobileNumber,
      propertyAddress: property.propertyAddress || '',
      propertyRent: property.propertyRent,
      propertyType: property.propertyType,
      propertyDescription: property.propertyDescription
    });
  }

  ngOnInit(): void {
    // this.propertyId = this.route.snapshot.paramMap.get('id');
    // this.isEditMode = !!this.propertyId;

    this.propertyForm = this.fb.group({
      ownerName: ['', Validators.required],
      ownerMobileNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      propertyAddress: ['', Validators.required],
      propertyRent: ['', [Validators.required, Validators.min(0)]],
      propertyType: ['', Validators.required],
      propertyDescription: [''],
    });
  }

  onFileSelect(event: any, type: 'property' | 'owner'): void {
    if (type === 'property') {
      this.selectedFiles = Array.from(event.target.files);
    } else {
      this.ownerImageFile = event.target.files[0];
    }
  }

  onSubmit(): void {
    if (this.propertyForm.invalid) {
      Object.keys(this.propertyForm.controls).forEach(key => {
        this.propertyForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.loading = true;
    const formData = new FormData();

    Object.keys(this.propertyForm.value).forEach(key => {
      formData.append(key, this.propertyForm.value[key]);
    });

    this.selectedFiles.forEach(file => {
      formData.append('propertyMedia', file);
    });

    if (this.ownerImageFile) {
      formData.append('ownerImage', this.ownerImageFile);
    }

    const request = this.isEditMode
      ? this.brokerService.updateProperty(this.propertyId!, formData)
      : this.brokerService.addProperty(formData);

    request.subscribe({
      next: () => {
        this.router.navigate(['/broker/dashboard']);
      },
      error: (error) => {
        console.error('Error saving property:', error);
        alert('Failed to save property');
        this.loading = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/broker/dashboard']);
  }
}
