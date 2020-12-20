import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { AuthGuard } from './layouts/auth-guard.service';
import { TableHttpExample } from './modules/demo/table-http-example';


const routes: Routes = [
	{ 	path: '',
		component: DefaultComponent,
		canActivate: [ AuthGuard ],
		children: [
			{
                path: '',
                data: 
                {
                    breadcrumb: 'Dashboard',
                },
				component: DashboardComponent
			},
			{
                path: 'demo',
                data: 
                {
                    breadcrumb: 'Demo',
                },
				component: TableHttpExample
			},
		]
	}
];

@NgModule({
  	imports: [ 
		RouterModule.forRoot( routes, {
	  		useHash: true,
	  		enableTracing: true
	  	} ) 
	],
  	exports: [ 
		RouterModule 
	]
})
export class AppRoutingModule 
{ 
	
}
