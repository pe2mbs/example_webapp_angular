import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './layouts/default.module';
import { PostsComponent } from './modules/posts/posts.component';
import { AngularMaterialModule } from './material.module';
import { MarkdownModule } from 'ngx-markdown';
import { GridsterModule } from 'angular-gridster2';
import { GenCrudModule } from './common/gencrud.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoleModule } from './backend/gn_role/module';
import { UserModule } from './backend/gn_user/module';
import { CustomMaterialModule } from './material.module';


@NgModule({
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent,
    PostsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    DefaultModule,
    HttpClientModule,
    GridsterModule,
    UserModule,
    GenCrudModule,
    FormsModule,
    ReactiveFormsModule,
    RoleModule,
    CustomMaterialModule,
    MarkdownModule.forRoot()
  ],
  providers: [
  ]
})
export class AppModule { }
