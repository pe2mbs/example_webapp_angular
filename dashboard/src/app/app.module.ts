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
import { RecordLocksModule } from './backend/locking/module';
import { TrackingModule } from './backend/tracking/module';
import { ExampleHttpDatabase } from './modules/demo/table-http-service';
import { TableHttpExample } from './modules/demo/table-http-example';


@NgModule({
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent,
    TableHttpExample
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    GridsterModule,
    GenCrudModule,
    DefaultModule,
    FormsModule,
    ReactiveFormsModule,
    MarkdownModule.forRoot(),
    RoleModule,
    RecordLocksModule,
    TrackingModule,
    UserModule
  ],
  providers: [
    ExampleHttpDatabase
  ]
})
export class AppModule { }
