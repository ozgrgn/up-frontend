import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { RestService } from 'src/app/services/rest.service';
import { DaterangeModel } from "src/app/components/date-range-picker/date-range-picker.component";
import * as XLSX from "xlsx";


@Component({
  selector: 'app-icmal',
  templateUrl: './icmal.component.html',
  styleUrls: ['./icmal.component.scss']
})
export class IcmalComponent implements OnInit {
  fileName = "icmal.xlsx";
  page: any = "onay";
  closeResult: any;
  loading: Boolean = true;
  totalDataCount: number;
  limit: number = 100000000000000;
  rowSize: number = 10;
  skip: number = 0;
  fullName: any;
  company: any = {};
  selectedCompany:any;
  companies: any;
  branch: any;
  invoiceNo: any;
  invoices: any;
  selectedInvoiceID: any;
  reasons: any;
  reason: any = {};
  status: any = "CONFIRMED" ;
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
          this.getCompanies()
          this.getIcmal();
        } else {
          this.restService
            .getUser(localStorage.getItem("userId"))
            .toPromise()
            .then((data) => {
              if (data["status"]) {
                this.selectedCompany=data["user"].company._id
                console.log(this.selectedCompany,"selected")
                this.company = data["user"].company;
                console.log(this.company, "company");
                this.getIcmal();
              } else return;
            });
        }
      });
  }
  getCompanies() {
    this.restService
      .getCompanies()
      .toPromise()
      .then((data) => {
        if (data["status"]) {
          console.log(data);
          this.companies = data["companies"];
        }
      });
  }
  getIcmal() {
    if(this.perm!="SUPERADMIN") {
return
    }
    console.log(this.company._id);
    this.restService
      .getIcmal(
        this.limit,
        this.skip,
        this.selectedCompany,
        this.branch,
        this.invoiceNo,
        this.fullName,
        this.status,
        this.deparDate?.startDate
        ? this.deparDate.startDate.toISOString()
        : undefined,
      this.deparDate?.endDate
        ? this.deparDate.endDate.toISOString()
        : undefined,
        this.approveDate?.startDate
        ? this.approveDate.startDate.toISOString()
        : undefined,
      this.approveDate?.endDate
        ? this.approveDate.endDate.toISOString()
        : undefined,
        this.invoiceDate?.startDate
          ? this.invoiceDate.startDate.toISOString()
          : undefined,
        this.invoiceDate?.endDate
          ? this.invoiceDate.endDate.toISOString()
          : undefined,


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

  pages(): any[] {
    if (this.totalDataCount >= this.limit) {
      return new Array(Math.ceil(this.totalDataCount / this.limit));
    } else {
      return [1];
    }
  }

  ceilAndCalculate() {
    if (
      Math.ceil(this.skip / this.limit) !=
      Math.ceil(this.totalDataCount / this.limit) - 1
    ) {
      this.skip = this.skip + this.limit;
      this.getIcmal();
    }
  }
  changeRowSize() {
    this.limit = this.rowSize;
    this.getIcmal();
  }

  exportexcel(): void {
    /* table id is passed over here */
    let element = document.getElementById("excel-table");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element,  {raw:true});

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
