import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user.component';
import {ExploreComponent} from "./explore/explore/explore.component";
import {MainpageComponent} from "./mainpage/mainpage/mainpage.component";
import {NavbarComponent} from "./navbar/navbar/navbar.component";
import {AuthService} from "./services/auth.service";


@NgModule({
  declarations: [
    AppComponent, UserComponent,
    ExploreComponent,
    MainpageComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
