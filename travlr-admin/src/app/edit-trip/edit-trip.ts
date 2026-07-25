import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TripDataService } from '../trip-data';

@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.html',
  styleUrls: ['./edit-trip.css'],
  standalone: false
})
export class EditTripComponent implements OnInit {
  editForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private tripDataService: TripDataService
  ) { }

  ngOnInit(): void {
    const tripName = this.route.snapshot.paramMap.get('tripName') || '';
    
    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.tripDataService.getTrip(tripName).subscribe({
      next: (data) => {
        this.editForm.patchValue(data);
      },
      error: (err) => {
        console.error('Error fetching trip', err);
      }
    });
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      this.tripDataService.updateTrip(this.editForm.value).subscribe({
        next: () => {
          this.router.navigate(['']);
        },
        error: (err) => {
          console.error('Error updating trip', err);
        }
      });
    }
  }
}