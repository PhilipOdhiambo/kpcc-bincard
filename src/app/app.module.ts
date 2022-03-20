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
import { ReceiptsComponent } from './pages/inventory-transfer/order/order.component';
import { IssuesComponent } from './pages/inventory-transfer/issues/issues.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ClickOutsideModule } from 'ng-click-outside';

import { AppRoutingModule } from './app.routingModule';
import { AutoFocusDirective } from './directives/auto-focus.directive';
import { ReportsComponent } from './pages/reports/reports.component';
import { DepartmentComponent } from './pages/deparmentModule/components/department/department.component';
import { AddDepartmentComponent } from './pages/deparmentModule/components/add-department/add-department.component';
import { EditDepartmentComponent } from './pages/deparmentModule/components/edit-department/edit-department.component';
import { RemoveDepartmentComponent } from './pages/deparmentModule/components/remove-department/remove-department.component';
import { DeleteAlertComponent } from './components/delete-alert/delete-alert.component';
import { InventoryComponent } from './pages/inventoryModule/components/inventory/inventory.component';
import { InventoryDetailComponent } from './pages/inventoryModule/components/inventory-detail/inventory-detail.component';
import { InventoryAddComponent } from './pages/inventoryModule/components/inventory-add/inventory-add.component';
import { InventoryTransferComponent } from './pages/inventory-transfer/inventory-transfer.component';
import { IssueComponent } from './pages/inventory-transfer/issues/issue/issue.component';
import { PreauthsComponent } from './pages/preauthModule/components/preauths/preauths.component';
import { ReceiptReportComponent } from './pages/reports/receipt-report/receipt-report.component';
import { IssueReportComponent } from './pages/reports/issue-report/issue-report.component';
import { RetrievalReportComponent } from './pages/reports/retrieval-report/retrieval-report.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavComponent,
    ReceiptsComponent,
    IssuesComponent,
    AutoFocusDirective,
    ReportsComponent,
    DepartmentComponent,
    AddDepartmentComponent,
    EditDepartmentComponent,
    RemoveDepartmentComponent,
    DeleteAlertComponent,
    InventoryComponent,
    InventoryDetailComponent,
    InventoryAddComponent,
    InventoryTransferComponent,
    IssueComponent,
    PreauthsComponent,
    ReceiptReportComponent,
    IssueReportComponent,
    RetrievalReportComponent,
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
