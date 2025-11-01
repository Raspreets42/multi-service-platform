import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessService } from '../../../core/services/mess.service';

@Component({
  selector: 'app-add-caterer',
  templateUrl: './add-caterer.component.html',
  styleUrls: ['./add-caterer.component.css']
})
export class AddCatererComponent implements OnInit {
  catererForm!: FormGroup;
  isEditMode = false;
  catererId: string | null = null;
  loading = false;
  catererImageFile: File | null = null;
  currentCaterer = null;

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
      const caterer = navigation.extras.state['caterer'];
      this.isEditMode = navigation.extras.state['isEditMode'] || false;

      if (caterer) {
        this.currentCaterer = caterer;
        this.catererId = caterer._id;
        setTimeout(() => {
          this.populateForm(caterer);
        });
      }
    }
  }

  ngOnInit(): void {
    this.catererForm = this.fb.group({
      catererName: ['', Validators.required],
      catererMobileNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      catererAddress: ['', Validators.required],
      catererFare: ['', [Validators.required, Validators.min(0)]],
      catererDescription: ['']
    });
  }

  populateForm(caterer: any): void {
    this.catererForm.patchValue({
      catererName: caterer.catererName,
      catererMobileNumber: caterer.catererMobileNumber,
      catererAddress: caterer.catererAddress || '',
      catererFare: caterer.catererFare,
      catererDescription: caterer.catererDescription,
    });
  }

  onFileSelect(event: any): void {
    this.catererImageFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.catererForm.invalid) {
      Object.keys(this.catererForm.controls).forEach(key => {
        this.catererForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.loading = true;
    const formData = new FormData();

    Object.keys(this.catererForm.value).forEach(key => {
      formData.append(key, this.catererForm.value[key]);
    });

    if (this.catererImageFile) {
      formData.append('catererImage', this.catererImageFile);
    }

    const request = this.isEditMode
      ? this.messService.updateCaterer(this.catererId!, formData)
      : this.messService.addCaterer(formData);

    request.subscribe({
      next: () => {
        this.router.navigate(['/mess/dashboard']);
      },
      error: (error) => {
        console.error('Error saving caterer:', error);
        alert('Failed to save caterer');
        this.loading = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/mess/dashboard']);
  }
}
