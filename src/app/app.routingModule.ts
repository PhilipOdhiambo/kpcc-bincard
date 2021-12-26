// Routing Modules 
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component Modules
// Kpcc-bincard components
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ReceiptsComponent } from './pages/inventory-transfer/receipts/receipts.component';
import { IssuesComponent } from './pages/inventory-transfer/issues/issues.component';
import { RetrievalsComponent } from './pages/retrievals/retrievals.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { DepartmentComponent } from './pages/department/department.component';
import { InventoryComponent } from './pages/inventory/inventory.component';

const routes:Routes = [   
    {path:'home', component: HomePageComponent },
    { path:'add-receipt', component: ReceiptsComponent },
    { path:'add-issue', component: IssuesComponent },
    { path: 'retrievals', component: RetrievalsComponent},
    { path: 'reports', component: ReportsComponent},
    { path: 'departments', component: DepartmentComponent},
    { path: 'inventory', component: InventoryComponent},
    { path: '**', redirectTo:'home', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}