import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrokerDashboardComponent } from './broker-dashboard/broker-dashboard.component';
import { AddPropertyComponent } from './add-property/add-property.component';
import { AddPropertyClientComponent } from './add-property-client/add-property-client.component';

const routes: Routes = [
  { path: 'dashboard', component: BrokerDashboardComponent },
  { path: 'add-property', component: AddPropertyComponent },
  { path: 'add-property/:id', component: AddPropertyComponent },
  { path: 'add-client', component: AddPropertyClientComponent },
  { path: 'add-client/:id', component: AddPropertyClientComponent }
];

@NgModule({
  declarations: [
    BrokerDashboardComponent,
    AddPropertyComponent,
    AddPropertyClientComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class BrokerModule { }
