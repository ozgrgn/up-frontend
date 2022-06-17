import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { RestService } from 'src/app/services/rest.service';
import { DaterangeModel } from "src/app/components/date-range-picker/date-range-picker.component";


@Component({
  selector: 'app-icmal',
  templateUrl: './icmal.component.html',
  styleUrls: ['./icmal.component.scss']
})
export class IcmalComponent implements OnInit {
  page: any = "onay";
  closeResult: any;
  loading: Boolean = true;
  totalDataCount: number;
  limit: number = 1000000;
  rowSize: number = 1000000;
  skip: number = 0;
  fullName: any;
  company: any = {};
  branch: any;
  invoiceNo: any;
  invoices: any;
  selectedInvoiceID: any;
  reasons: any;
  reason: any = {};
  status: any ;
  newStatus: any;
  invoiceDate: DaterangeModel = {} as DaterangeModel;
  approveDate: DaterangeModel = {} as DaterangeModel;
  deparDate: DaterangeModel = {} as DaterangeModel;
  perm: any;

  constructor(
    private modalService: NgbModal,
    private restService: RestService,
    private toaster: ToastrService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getPermission();
  }
  getPermission() {
    this.authService
      .getPermission()
      .toPromise()
      .then((perm) => {
        this.perm = perm["userType"];

        console.log(perm, "perm");
        if (this.perm == "SUPERADMIN") {
          this.company._id = undefined;
          this.getInvoices();
        } else {
          this.restService
            .getUser(localStorage.getItem("userId"))
            .toPromise()
            .then((data) => {
              if (data["status"]) {
                this.company = data["user"].company;
                console.log(this.company, "company");
                this.getInvoices();
              } else return;
            });
        }
      });
  }

  getInvoices() {
    console.log(this.company._id);
    this.restService
      .getInvoices(
        this.limit,
        this.skip,
        this.company._id,
        this.branch,
        this.invoiceNo,
        this.fullName,
        this.status,
        undefined,
        undefined,
        this.invoiceDate?.startDate
          ? this.invoiceDate.startDate.toISOString()
          : undefined,
        this.invoiceDate?.endDate
          ? this.invoiceDate.endDate.toISOString()
          : undefined
      )
      .toPromise()
      .then((data) => {
        console.log(data);
        this.totalDataCount = data["count"];
        this.invoices = data["invoices"];
        this.loading = false;
      });
  }
  resetDate(valueName: string) {
    this[valueName] = undefined;
  }
  convertIsoString(date: any) {
    if (date) {
      return new Date(`${date.year}-${date.month}-${date.day}`).toISOString();
    }
  }
}
