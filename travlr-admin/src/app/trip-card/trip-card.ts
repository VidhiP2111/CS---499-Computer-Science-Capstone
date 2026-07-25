import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { TripDataService } from '../trip-data';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.html',
  styleUrls: ['./trip-card.css'],
  standalone: false
})
export class TripCardComponent {
  @Input() trip!: Trip;
  @Output() deleteTrip = new EventEmitter();

  constructor(
    private router: Router,
    private tripDataService: TripDataService
  ) { }

  editTrip(tripName: string): void {
    localStorage.setItem('tripName', tripName);
    this.router.navigate(['edit-trip', tripName]);
  }

  onDeleteTrip(tripName: string): void {
    this.tripDataService.deleteTrip(tripName).subscribe({
      next: () => {
        this.deleteTrip.emit();
      },
      error: (err) => {
        console.error('Error deleting trip', err);
      }
    });
  }
}