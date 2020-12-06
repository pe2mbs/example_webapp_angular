import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from './components/shared/shared.module';


@NgModule( {
  	declarations: [
    	AppComponent,
  	],
  	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule, 
		ReactiveFormsModule, 
		BrowserAnimationsModule,
		AngularMaterialModule,
		FlexLayoutModule,
		SharedModule
  	],
  	providers: [

	],
	bootstrap: [ AppComponent ],
	schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
} )
export class AppModule 
{

}
