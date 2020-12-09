import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './layouts/default.module';
import { MarkdownModule } from 'ngx-markdown';
import { GridsterModule } from 'angular-gridster2';
import { GenCrudModule } from './common/gencrud.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoleModule } from './backend/gn_role/module';
import { UserModule } from './backend/gn_user/module';


@NgModule({
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DefaultModule,
    HttpClientModule,
    GridsterModule,
    GenCrudModule,
    FormsModule,
	ReactiveFormsModule,
	MarkdownModule.forRoot(),
	RoleModule,
	UserModule,   
  ],
  providers: [
  ]
})
export class AppModule { }
