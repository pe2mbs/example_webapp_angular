import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { PostsComponent } from './modules/posts/posts.component';
import { AuthGuard } from './layouts/auth-guard.service';


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
				path: 'posts',
				component: PostsComponent
			}
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
