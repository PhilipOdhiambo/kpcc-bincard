// Routing Modules 
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component Modules
// Kpcc-bincard components
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ReceiptsComponent } from './pages/inventory-transfer/order/order.component';
import { IssuesComponent } from './pages/inventory-transfer/issues/issues.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { DepartmentComponent } from './pages/deparmentModule/components/department/department.component';
import { InventoryComponent } from './pages/inventoryModule/components/inventory/inventory.component';
import { PreauthsComponent } from './preauthModule/components/preauths/preauths.component';
import { NewPreauthComponent } from './preauthModule/new-preauth/new-preauth.component';

const routes:Routes = [   
    {path:'home', component: HomePageComponent },
    { path:'add-receipt', component: ReceiptsComponent },
    { path:'add-issue', component: IssuesComponent },
    { path: 'reports', component: ReportsComponent},
    { path: 'departments', component: DepartmentComponent},
    { path: 'inventory', component: InventoryComponent},
    {path: 'preauths', component: PreauthsComponent},
    {path: 'preauths/new', component: NewPreauthComponent},
    { path: '**', redirectTo:'home', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}