import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TripDataService } from '../trip-data';

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.html',
  styleUrls: ['./add-trip.css'],
  standalone: false
})
export class AddTripComponent implements OnInit {
  addForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripDataService: TripDataService
  ) { }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.addForm.valid) {
      this.tripDataService.addTrip(this.addForm.value).subscribe({
        next: () => {
          this.router.navigate(['']);
        },
        error: (err) => {
          console.error('Error adding trip', err);
        }
      });
    }
  }
}