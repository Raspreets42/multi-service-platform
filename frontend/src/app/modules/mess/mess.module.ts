import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MessDashboardComponent } from './mess-dashboard/mess-dashboard.component';
import { AddCatererComponent } from './add-caterer/add-caterer.component';
import { AddTiffinClientComponent } from './add-tiffin-client/add-tiffin-client.component';

const routes: Routes = [
  { path: 'dashboard', component: MessDashboardComponent },
  { path: 'add-caterer', component: AddCatererComponent },
  { path: 'add-caterer/:id', component: AddCatererComponent },
  { path: 'add-client', component: AddTiffinClientComponent },
  { path: 'add-client/:id', component: AddTiffinClientComponent }
];

@NgModule({
  declarations: [
    MessDashboardComponent,
    AddCatererComponent,
    AddTiffinClientComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class MessModule { }
