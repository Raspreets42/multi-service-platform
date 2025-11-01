import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'broker',
    loadChildren: () => import('./modules/broker/broker.module').then(m => m.BrokerModule),
    canActivate: [AuthGuard],
    data: { role: 'broker' }
  },
  {
    path: 'driver',
    loadChildren: () => import('./modules/driver/driver.module').then(m => m.DriverModule),
    canActivate: [AuthGuard],
    data: { role: 'driver' }
  },
  {
    path: 'mess',
    loadChildren: () => import('./modules/mess/mess.module').then(m => m.MessModule),
    canActivate: [AuthGuard],
    data: { role: 'caterer' }
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
