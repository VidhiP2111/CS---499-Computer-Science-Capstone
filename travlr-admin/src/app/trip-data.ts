import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from './models/trip';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {
  private apiBaseUrl = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) { }

  //Handling parameters page, limit, start & maxPrixe
  getTrips(page?: number, limit?: number, start?: string, maxPrice?: number, sort?: string, order?: string): Observable<Trip[]> {
    let params = new HttpParams();

    if (page) {
      params = params.set('page', page);
    }
    if (limit) {
      params = params.set('limit', limit);
    }
    if (start) {
      params = params.set('start', start);
    }
    if (maxPrice) {
      params = params.set('maxPrice', maxPrice);
    }
    if (sort) {
      params = params.set('sort', sort);
    }
    if (order) {
      params = params.set('order', order);
    }

    return this.http.get<Trip[]>(`${this.apiBaseUrl}trips`, { params });
  }

  getTrip(tripCode: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.apiBaseUrl}trips/${tripCode}`);
  }

  addTrip(formData: Trip): Observable<Trip> {
    return this.http.post<Trip>(`${this.apiBaseUrl}trips`, formData);
  }

  updateTrip(formData: Trip): Observable<Trip> {
    return this.http.put<Trip>(`${this.apiBaseUrl}trips/${formData.name}`, formData);
  }

  deleteTrip(tripName: string): Observable<any> {
    return this.http.delete(`${this.apiBaseUrl}trips/${tripName}`);
  }
}