import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from './material.module';
import { GenCrudModule } from './common/gencrud.module';
import { UserModule } from './backend/user/module';

@NgModule({
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    GenCrudModule,
    UserModule,
    AppRoutingModule
  ],
  providers: [
    {
      multi: true,
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService
    }
  ]
})
export class AppModule { }
