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

import { NgbModule,NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

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

moment.tz.setDefault("Europe/Istanbul");


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,

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

  ],
  providers: [
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true,
    },
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
