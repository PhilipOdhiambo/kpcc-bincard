// Routing Modules 
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component Modules
// Kpcc-bincard components
import { HomePageComponent } from './home-page/home-page.component';
import { ReceiptsComponent } from './receipts/receipts.component';
import { IssuesComponent } from './issues/issues.component';
import { ReportsComponent } from './reports/reports.component';

const routes:Routes = [   
    {path:'home', component: HomePageComponent },
    { path:'add-receipt', component: ReceiptsComponent },
    { path:'add-issue', component: IssuesComponent },
    { path: 'reports', component: ReportsComponent},
    { path: '**', redirectTo:'home', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}