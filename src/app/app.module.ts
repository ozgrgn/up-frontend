import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";

import { NgbModule,NgbDateParserFormatter, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { TurkishDatePickerI18 } from './pages/invoices/invoice-list/TurkishDatePickerI18.1';
import { ClickOutsideModule } from "ng-click-outside";

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { DateRangePickerComponent } from "./components/date-range-picker/date-range-picker.component";
import { Interceptor } from './services/interceptor';
import { NgbDateCustomParserFormatter } from './services/ngbDateFormatter';
import * as moment from "moment-timezone";
import { ToastrModule } from 'ngx-toastr';
import { NgxMaskModule } from 'ngx-mask';
import { InvoiceFormComponent } from './pages/invoices/invoice-form/invoice-form.component';
import { InvoiceListComponent } from './pages/invoices/invoice-list/invoice-list.component';
import { InvoiceEditComponent } from './pages/invoices/invoice-edit/invoice-edit.component';
import { ProductsComponent } from './pages/products/products.component';
import { GeneralSettingsComponent } from './pages/general-settings/general-settings.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { PerformanceReportComponent } from './pages/reports/performance-report/performance-report.component';
import { UserListComponent } from './pages/user-settings/user-list/user-list.component';
import { UserFormComponent } from './pages/user-settings/user-form/user-form.component';
import { UserEditComponent } from './pages/user-settings/user-edit/user-edit.component';
import { ProductReportComponent } from './pages/reports/product-report/product-report.component';
import { IcmalComponent } from './pages/reports/icmal/icmal.component';
import { CustomerListComponent } from './pages/reports/customer-list/customer-list.component';
import { IcmalKuyumComponent } from './pages/reports/icmal-kuyum/icmal-kuyum.component';
import { FCheckComponent } from './pages/f-check/f-check.component';
import { FCheckEditComponent } from './pages/f-check-edit/f-check-edit.component';
import { FCheckRatioComponent } from './pages/f-check-ratio/f-check-ratio.component';
import { CurrencyComponent } from './pages/currency/currency.component';
import { TransactionListComponent } from './pages/reports/transaction-list/transaction-list.component';

moment.tz.setDefault("Europe/Istanbul");


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    ClickOutsideModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    BsDatepickerModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: "toast-bottom-right",
    }),
    NgxMaskModule.forRoot(),
    NgSelectModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    DateRangePickerComponent,
    InvoiceFormComponent,
    InvoiceListComponent,
    InvoiceEditComponent,
    ProductsComponent,
    GeneralSettingsComponent,
    PerformanceReportComponent,
    UserListComponent,
    UserFormComponent,
    UserEditComponent,
    ProductReportComponent,
    IcmalComponent,
    CustomerListComponent,
    IcmalKuyumComponent,
    FCheckComponent,
    FCheckEditComponent,
    FCheckRatioComponent,
    CurrencyComponent,
    TransactionListComponent,
  ],
  providers: [
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true,
    },
    { provide: NgbDatepickerI18n, useClass: TurkishDatePickerI18 } ,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
