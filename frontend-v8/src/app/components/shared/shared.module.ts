import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpComponent } from './help/help.component';
import { DialogComponent } from './help/dialog/dialog.component';
import { LogInComponent } from './log-in/log-in.component';
import { ScreenComponent } from 'src/app/pages/screen/screen.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';



@NgModule({
	declarations: 
	[
		HelpComponent,
		DialogComponent,
		LogInComponent,
		RegisterComponent,
		ScreenComponent,
		HeaderComponent,
		FooterComponent,
		SidebarComponent
  	],
	imports: 
	[
    	CommonModule
  	]
})
export class SharedModule { }
