import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DriverDashboardComponent } from './driver-dashboard/driver-dashboard.component';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';
import { AddRideClientComponent } from './add-ride-client/add-ride-client.component';

const routes: Routes = [
  { path: 'dashboard', component: DriverDashboardComponent },
  { path: 'add-vehicle', component: AddVehicleComponent },
  { path: 'add-vehicle/:id', component: AddVehicleComponent },
  { path: 'add-client', component: AddRideClientComponent },
  { path: 'add-client/:id', component: AddRideClientComponent }
];

@NgModule({
  declarations: [
    DriverDashboardComponent,
    AddVehicleComponent,
    AddRideClientComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class DriverModule { }
