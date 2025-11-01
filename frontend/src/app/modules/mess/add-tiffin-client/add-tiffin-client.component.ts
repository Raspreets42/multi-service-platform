import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessService } from '../../../core/services/mess.service';

@Component({
  selector: 'app-add-tiffin-client',
  templateUrl: './add-tiffin-client.component.html',
  styleUrls: ['./add-tiffin-client.component.css']
})
export class AddTiffinClientComponent implements OnInit {
  clientForm!: FormGroup;
  isEditMode = false;
  clientId: string | null = null;
  loading = false;
  clientImageFile: File | null = null;
  currentClient = null;

  constructor(
    private fb: FormBuilder,
    private messService: MessService,
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

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      clientName: ['', Validators.required],
      clientMobileNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      clientAddress: ['', Validators.required],
      clientFareBudget: ['', [Validators.required, Validators.min(0)]],
      clientDescription: ['']
    });
  }

  populateForm(vehicleClient: any): void {
    this.clientForm.patchValue({
      clientName: vehicleClient.clientName,
      clientMobileNumber: vehicleClient.clientMobileNumber,
      clientAddress: vehicleClient.clientAddress || '',
      clientFareBudget: vehicleClient.clientFareBudget,
      clientDescription: vehicleClient.clientDescription,
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
      ? this.messService.updateClient(this.clientId!, formData)
      : this.messService.addClient(formData);

    request.subscribe({
      next: () => {
        this.router.navigate(['/mess/dashboard']);
      },
      error: (error) => {
        console.error('Error saving client:', error);
        alert('Failed to save client');
        this.loading = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/mess/dashboard']);
  }
}
