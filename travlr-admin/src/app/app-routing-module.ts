import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TripListingComponent } from './trip-listing/trip-listing';
import { AddTripComponent } from './add-trip/add-trip';
import { EditTripComponent } from './edit-trip/edit-trip';

const routes: Routes = [
  { path: '', component: TripListingComponent },
  { path: 'add-trip', component: AddTripComponent },
  { path: 'edit-trip/:tripName', component: EditTripComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }