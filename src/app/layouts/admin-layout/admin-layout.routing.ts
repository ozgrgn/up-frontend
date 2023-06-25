import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { InvoiceFormComponent } from 'src/app/pages/invoices/invoice-form/invoice-form.component';
import { InvoiceEditComponent } from 'src/app/pages/invoices/invoice-edit/invoice-edit.component';
import { InvoiceListComponent } from 'src/app/pages/invoices/invoice-list/invoice-list.component';
import { ProductsComponent } from 'src/app/pages/products/products.component';
import { GeneralSettingsComponent } from 'src/app/pages/general-settings/general-settings.component';
import { PerformanceReportComponent } from 'src/app/pages/reports/performance-report/performance-report.component';
import { UserListComponent } from 'src/app/pages/user-settings/user-list/user-list.component';
import { UserFormComponent } from 'src/app/pages/user-settings/user-form/user-form.component';
import { UserEditComponent } from 'src/app/pages/user-settings/user-edit/user-edit.component';
import { ProductReportComponent } from 'src/app/pages/reports/product-report/product-report.component';
import { IcmalComponent } from 'src/app/pages/reports/icmal/icmal.component';
import { CustomerListComponent } from 'src/app/pages/reports/customer-list/customer-list.component';
import { IcmalKuyumComponent } from 'src/app/pages/reports/icmal-kuyum/icmal-kuyum.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'invoice-form',   component: InvoiceFormComponent },
    { path: 'invoice-list',   component: InvoiceListComponent },
    { path: 'products',   component: ProductsComponent },
    { path: 'general-settings',   component: GeneralSettingsComponent },
    { path: 'invoice-edit/:id',   component: InvoiceEditComponent },
    { path: 'performance-reports',   component: PerformanceReportComponent },
    { path: 'product-reports',   component: ProductReportComponent },
    { path: 'icmal',   component: IcmalComponent },
    { path: 'icmal-kuyum',   component: IcmalKuyumComponent },
    { path: 'user-list',   component: UserListComponent },
    { path: 'user-form',   component: UserFormComponent },
    { path: 'user-edit/:id',   component: UserEditComponent },
    { path: 'customer-list',   component: CustomerListComponent },
];
