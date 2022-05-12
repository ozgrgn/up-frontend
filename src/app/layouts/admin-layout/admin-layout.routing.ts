import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { InvoiceFormComponent } from 'src/app/pages/invoices/invoice-form/invoice-form.component';
import { InvoiceEditComponent } from 'src/app/pages/invoices/invoice-edit/invoice-edit.component';
import { InvoiceListComponent } from 'src/app/pages/invoices/invoice-list/invoice-list.component';
import { ProductsComponent } from 'src/app/pages/products/products.component';
import { GeneralSettingsComponent } from 'src/app/pages/general-settings/general-settings.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'invoice-form',   component: InvoiceFormComponent },
    { path: 'invoice-list',   component: InvoiceListComponent },
    { path: 'products',   component: ProductsComponent },
    { path: 'general-settings',   component: GeneralSettingsComponent },
    { path: 'invoice-edit/:id',   component: InvoiceEditComponent },

];
