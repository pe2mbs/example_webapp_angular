import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MarkdownModule } from 'ngx-markdown';
import { GridsterModule } from 'angular-gridster2';
import { GenCrudModule } from './layouts/gencrud.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoleModule } from './layouts/core/role/module';
import { UserModule } from './layouts/core/user/module';
import { RecordLocksModule } from './layouts/core/locking/module';
import { TrackingModule } from './layouts/core/tracking/module';
import { ExampleHttpDatabase } from './modules/demo/table-http-service';
import { TableHttpExample } from './modules/demo/table-http-example';
import localeNl from '@angular/common/locales/nl';
import { registerLocaleData } from '@angular/common';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { CustDataTableComponent } from './modules/demo2/cust.data.table.component';

registerLocaleData(localeNl);

@NgModule({
  	bootstrap: [
    	AppComponent
  	],
  	declarations: [
    	AppComponent,
    	TableHttpExample,
		DashboardComponent,
		CustDataTableComponent
	],
  	imports: [
    	BrowserModule,
    	AppRoutingModule,
    	BrowserAnimationsModule,
    	HttpClientModule,
    	GridsterModule,
    	GenCrudModule,
    	FormsModule,
    	ReactiveFormsModule,
    	MarkdownModule.forRoot(),
    	RoleModule,
    	RecordLocksModule,
    	TrackingModule,
    	UserModule,
  	],
  	providers: [
    	ExampleHttpDatabase,
    	{ 
        	provide: LOCALE_ID, 
        	useValue: 'nl' 
    	}
  	]
})
export class AppModule { }
