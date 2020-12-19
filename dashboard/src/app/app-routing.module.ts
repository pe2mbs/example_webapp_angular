import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { AuthGuard } from './layouts/auth-guard.service';
import { TableHttpExample } from './demo/table-http-example';


const routes: Routes = [
	{ 	path: '',
		component: DefaultComponent,
		canActivate: [ AuthGuard ],
		children: [
			{
				path: '',
				component: DashboardComponent
			},
			{
				path: 'demo',
				component: TableHttpExample
			},
		]
	}
];

@NgModule({
  	imports: [ 
		RouterModule.forRoot( routes, {
	  		useHash: true,
	  		enableTracing: false
	  	} ) 
	],
  	exports: [ 
		RouterModule 
	]
})
export class AppRoutingModule 
{ 
	
}
