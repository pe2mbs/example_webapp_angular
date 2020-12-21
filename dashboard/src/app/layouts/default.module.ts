import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule, 
		 LocationStrategy, 
		 HashLocationStrategy } from '@angular/common';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { RouterModule, Route } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer.component';
import { NavSidebarComponent } from './sidebar/sidebar.component';
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
import { UserProfileComponent } from './user-profile.component';
import { ThemeSwitcherComponent } from './theme-switcher.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkTreeModule } from '@angular/cdk/tree';
import { PortalModule } from '@angular/cdk/portal';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import { MatBadgeModule } from '@angular/material/badge';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginDialogComponent } from './login/login.dialog.component';
import { SignupDialogComponent } from './login/signup.dialog.component';
import { BreadcrumbComponent } from './breadcrumb.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SignedOutComponent } from './signedout.component';
import { TickerComponent } from './ticker/ticker.component';
import { TickerDataService } from './ticker/service';
import { ProfileService } from './profile.service';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CustomLoader } from './language-loader';

const materialModules = [
    MatPasswordStrengthModule,
	BreadcrumbModule,
	CdkTreeModule,
	MatAutocompleteModule,
	MatButtonModule,
	MatCardModule,
	MatCheckboxModule,
	MatChipsModule,
	MatDividerModule,
	MatExpansionModule,
	MatIconModule,
	MatInputModule,
	MatListModule,
	MatMenuModule,
	MatProgressSpinnerModule,
	MatProgressBarModule,
	MatPaginatorModule,
	MatRippleModule,
	MatSelectModule,
	MatSidenavModule,
	MatSnackBarModule,
	MatSortModule,
	MatTableModule,
	MatTabsModule,
	MatToolbarModule,
	MatFormFieldModule,
	MatButtonToggleModule,
	MatTreeModule,
	OverlayModule,
	PortalModule,
	MatBadgeModule,
	MatGridListModule,
	MatRadioModule,
	MatDatepickerModule,
	MatTooltipModule,
	MatSlideToggleModule,
	MatSliderModule,
	MatDialogModule,
    FlexLayoutModule,
];

const defaultRoute: Route = { 	
	path: '',
	component: SignedOutComponent,
	children: [
		{
			path: 'login',
			component: LoginComponent,
		}
	]
};

@NgModule({
	declarations: [
		DashboardComponent,
		HeaderComponent,
		FooterComponent,
		NavSidebarComponent,
		HelpComponent,
		HelpDialogComponent,
		MenuListItemComponent,
		LoginComponent,
		LoginDialogComponent,
		SignupDialogComponent,
		UserProfileComponent,
		ThemeSwitcherComponent,
        DefaultComponent,
        SignedOutComponent,
        BreadcrumbComponent,
        TickerComponent
  	],
  	imports: [
		CommonModule,
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
		MarkdownModule.forChild(),
		GridsterModule,
        RouterModule.forChild( [ defaultRoute ] ),
        TranslateModule.forRoot( {
            defaultLanguage: 'en',
            loader: {
                provide: TranslateLoader, 
                useClass: CustomLoader
            }
        } ),
		...materialModules
	],
	exports: [
		DefaultComponent,
		BreadcrumbComponent,
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
        TranslateModule,
		...materialModules
	],
	entryComponents: [
		HelpDialogComponent,
		LoginDialogComponent,
		SignupDialogComponent
	],
	providers: [
		HelpService,
		NavService,
    	AuthGuard,
		AdminAuthGuard,
		AuthService,
		ThemeSwitcherComponent,
		ProfileService,
        TickerDataService,
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
	static forRoot(): ModuleWithProviders {
        return {
            ngModule: DefaultModule,
            providers: [
                HelpService,
				NavService,
    			AuthGuard,
				AdminAuthGuard,
				AuthService,
                ThemeSwitcherComponent,
                TickerDataService
            ]
        };
    }
    static forChild(): ModuleWithProviders
    {
        return { ngModule: DefaultModule };
    }
}

