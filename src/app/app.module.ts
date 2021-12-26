import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// AngularFire Modules and environment config
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppComponent } from './app.component';

// Components
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NavComponent } from './components/nav/nav.component';
import { ReceiptsComponent } from './pages/inventory-transfer/receipts/receipts.component';
import { ReceiptComponent } from './pages/inventory-transfer/receipts/receipt/receipt.component';
import { IssuesComponent } from './pages/inventory-transfer/issues/issues.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ClickOutsideModule } from 'ng-click-outside';

import { AppRoutingModule } from './app.routingModule';
import { AutoFocusDirective } from './directives/auto-focus.directive';
import { ReportsComponent } from './pages/reports/reports.component';
import { RetrievalsComponent } from './pages/retrievals/retrievals.component';
import { DepartmentComponent } from './pages/department/department.component';
import { AddDepartmentComponent } from './pages/department/add-department/add-department.component';
import { EditDepartmentComponent } from './pages/department/edit-department/edit-department.component';
import { RemoveDepartmentComponent } from './pages/department/remove-department/remove-department.component';
import { DeleteAlertComponent } from './components/delete-alert/delete-alert.component';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { InventoryDetailComponent } from './pages/inventory/inventory-detail/inventory-detail.component';
import { InventoryAddComponent } from './pages/inventory/inventory-add/inventory-add.component';
import { InventoryTransferComponent } from './pages/inventory-transfer/inventory-transfer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavComponent,
    ReceiptsComponent,
    ReceiptComponent,
    IssuesComponent,
    AutoFocusDirective,
    ReportsComponent,
    RetrievalsComponent,
    DepartmentComponent,
    AddDepartmentComponent,
    EditDepartmentComponent,
    RemoveDepartmentComponent,
    DeleteAlertComponent,
    InventoryComponent,
    InventoryDetailComponent,
    InventoryAddComponent,
    InventoryTransferComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ClickOutsideModule,
    HttpClientModule,
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
