import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// AngularFire Modules and environment config
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppComponent } from './app.component';

// Components
import { HomePageComponent } from './home-page/home-page.component';
import { NavComponent } from './nav/nav.component';
import { ReceiptsComponent } from './pages/receipts/receipts.component';
import { IssuesComponent } from './pages/issues/issues.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ClickOutsideModule } from 'ng-click-outside';

import { AppRoutingModule } from './app.routingModule';
import { AutoFocusDirective } from './directives/auto-focus.directive';
import { ReportsComponent } from './pages/reports/reports.component';
import { RetrievalsComponent } from './pages/retrievals/retrievals.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavComponent,
    ReceiptsComponent,
    IssuesComponent,
    AutoFocusDirective,
    ReportsComponent,
    RetrievalsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ClickOutsideModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BsDatepickerModule.forRoot(),
    AngularFirestoreModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
