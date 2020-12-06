import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default/default.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
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
		
  	],
  	imports: [
		CommonModule,
		RouterModule,
		AngularMaterialModule,
		FlexLayoutModule,
		MarkdownModule.forChild(),
		GridsterModule,
	],
	exports:[
		DefaultComponent,
		DashboardComponent 
	],
	entryComponents: [
		HelpDialogComponent
	],
	providers: [
		HelpService,
		NavService
	]
} )
export class DefaultModule 
{ 
	
}
