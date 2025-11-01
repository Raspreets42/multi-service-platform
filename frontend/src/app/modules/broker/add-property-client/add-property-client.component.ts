import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BrokerService } from '../../../core/services/broker.service';

@Component({
  selector: 'app-add-property-client',
  templateUrl: './add-property-client.component.html',
  styleUrls: ['./add-property-client.component.css']
})
export class AddPropertyClientComponent implements OnInit {
  clientForm!: FormGroup;
  isEditMode = false;
  clientId: string | null = null;
  loading = false;
  clientImageFile: File | null = null;
  propertyTypes = ['1BHK', '2BHK', '3BHK', 'PG', 'HOSTEL'];
  currentClient = null;

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
      const client = navigation.extras.state['client'];
      this.isEditMode = navigation.extras.state['isEditMode'] || false;

      if (client) {
        this.currentClient = client;
        this.clientId = client._id;
        setTimeout(() => {
          this.populateForm(client);
        });
      }
    }
  }

  populateForm(property: any): void {
    this.clientForm.patchValue({
      clientName: property.clientName,
      clientMobileNumber: property.clientMobileNumber,
      clientAddress: property.clientAddress || '',
      clientBudget: property.clientBudget,
      clientLookingForPropertyType: property.clientLookingForPropertyType
    });
  }

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      clientName: ['', Validators.required],
      clientMobileNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      clientAddress: ['', Validators.required],
      clientBudget: ['', [Validators.required, Validators.min(0)]],
      clientLookingForPropertyType: ['', Validators.required]
    });
  }

  onFileSelect(event: any): void {
    this.clientImageFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.clientForm.invalid) {
      Object.keys(this.clientForm.controls).forEach(key => {
        this.clientForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.loading = true;
    const formData = new FormData();

    Object.keys(this.clientForm.value).forEach(key => {
      formData.append(key, this.clientForm.value[key]);
    });

    if (this.clientImageFile) {
      formData.append('clientImage', this.clientImageFile);
    }

    const request = this.isEditMode
      ? this.brokerService.updateClient(this.clientId!, formData)
      : this.brokerService.addClient(formData);

    request.subscribe({
      next: () => {
        this.router.navigate(['/broker/dashboard']);
      },
      error: (error) => {
        console.error('Error saving client:', error);
        alert('Failed to save client');
        this.loading = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/broker/dashboard']);
  }
}
