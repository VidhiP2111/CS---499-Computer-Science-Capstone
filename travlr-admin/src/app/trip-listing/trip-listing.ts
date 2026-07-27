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

  page: number = 1;
  limit: number = 10;
  startFilter: string = '';
  maxPriceFilter: number | null = null;

  constructor(private tripDataService: TripDataService) { }

  ngOnInit(): void {
    this.getTrips();
  }

  getTrips(): void {
    this.tripDataService.getTrips(this.page, this.limit, this.startFilter, this.maxPriceFilter ?? undefined).subscribe({
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

  applyFilters(): void {
    this.page = 1;
    this.getTrips();
  }

  nextPage(): void {
    this.page = this.page + 1;
    this.getTrips();
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page = this.page - 1;
      this.getTrips();
    }
  }
}