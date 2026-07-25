import { Component, OnInit } from '@angular/core';
import { TripDataService } from '../trip-data';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-trip-listing',
  templateUrl: './trip-listing.html',
  styleUrls: ['./trip-listing.css'],
  standalone: false
})
export class TripListingComponent implements OnInit {
  trips: Trip[] = [];
  message: string = '';

  constructor(private tripDataService: TripDataService) { }

  ngOnInit(): void {
    this.getTrips();
  }

  getTrips(): void {
    this.tripDataService.getTrips().subscribe({
      next: (data: Trip[]) => {
        this.trips = data;
        this.message = `There are ${data.length} trips available.`;
      },
      error: (err) => {
        console.error('Error fetching trips', err);
        this.message = 'Error loading trips.';
      }
    });
  }
}