import { NgModule } from '@angular/core';
import { CommonModule, 
		 LocationStrategy, 
		 HashLocationStrategy } from '@angular/common';
import { DefaultComponent } from './default/default.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { RouterModule, Route } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavSidebarComponent } from './sidebar/sidebar.component';
import { AngularMaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HelpComponent } from './help/help.component';
import { HelpService } from './help/service.service';
import { HelpDialogComponent } from './help/dialog.component';
import { MarkdownModule } from 'ngx-markdown';
import { GridsterModule } from 'angular-gridster2';
import { MenuListItemComponent } from './sidebar/item.component';
import { NavService } from './sidebar/nav.service';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';
import { AdminAuthGuard } from './admin-auth-gaurd.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './token-interceptor.service';
import { LoginComponent } from './login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserProfileComponent } from './user.profile/user.profile.component';
import { ThemeSwitcherComponent } from './theme-switcher/theme-switcher.component';


const defaultRoute: Route = { 	
	path: '',
	component: DefaultComponent,
	children: [
		{
			path: 'login',
			component: LoginComponent,
		}
	]
};

@NgModule({
	declarations: [
		DefaultComponent,
		DashboardComponent,
		HeaderComponent,
		FooterComponent,
		NavSidebarComponent,
		HelpComponent,
		HelpDialogComponent,
		MenuListItemComponent,
		LoginComponent,
		UserProfileComponent,
		ThemeSwitcherComponent,
  	],
  	imports: [
		CommonModule,
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
		AngularMaterialModule,
		FlexLayoutModule,
		MarkdownModule.forChild(),
		GridsterModule,
		RouterModule.forChild( [ defaultRoute ] )
	],
	exports: [
		DefaultComponent,
		DashboardComponent 
	],
	entryComponents: [
		HelpDialogComponent
	],
	providers: [
		HelpService,
		NavService,
    	AuthGuard,
		AdminAuthGuard,
		AuthService,
		{
		  provide: LocationStrategy,
		  useClass: HashLocationStrategy
		},
		{
		  provide: HTTP_INTERCEPTORS,
		  useClass: TokenInterceptorService,
		  multi: true
		}
	]
} )
export class DefaultModule 
{ 
}
