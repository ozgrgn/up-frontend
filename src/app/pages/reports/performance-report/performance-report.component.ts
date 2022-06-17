import { Component, OnInit, Output } from "@angular/core";
import { RestService } from "src/app/services/rest.service";
import { DaterangeModel } from "src/app/components/date-range-picker/date-range-picker.component";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-performance-report",
  templateUrl: "./performance-report.component.html",
  styleUrls: ["./performance-report.component.scss"],
})
export class PerformanceReportComponent implements OnInit {


  loading: Boolean = true;
  totalDataCount: number;
  limit: number = 10;
  rowSize: number = 10;
  skip: number = 0;
  company: any ={};
  selectedCompany:any;
  companies: any;
  branches: any;
  branch: any;
  invoiceNo: any;
  status: any;
  noPending:Boolean=false;
  pending: any;
  confirmed:any;
  declined:any;
  total:any;
  year: any = 2022;
  invoiceDate: DaterangeModel = {} as DaterangeModel;
  approveDate: DaterangeModel = {} as DaterangeModel;
  deparDate: DaterangeModel = {} as DaterangeModel;
  perm: any;
  constructor(
    private restService: RestService,
    private authService: AuthService
  ) {}

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
          this.getData();
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
                this.getData();
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
  getData() {
    this.restService
      .getPerformance(
        this.selectedCompany,
        this.branch,
        this.noPending,
        this.year,
        this.invoiceDate?.startDate
          ? this.invoiceDate.startDate.toISOString()
          : undefined,
        this.invoiceDate?.endDate
          ? this.invoiceDate.endDate.toISOString()
          : undefined,
        this.approveDate?.startDate
          ? this.approveDate.startDate.toISOString()
          : undefined,
        this.approveDate?.endDate
          ? this.approveDate.endDate.toISOString()
          : undefined,
        this.deparDate?.startDate
          ? this.deparDate.startDate.toISOString()
          : undefined,
        this.deparDate?.endDate
          ? this.deparDate.endDate.toISOString()
          : undefined
      )
      .toPromise()
      .then((data) => {
        console.log(data);
        this.pending=data['pending']
        this.confirmed=data['confirmed']
        this.declined=data['declined']
        this.total=data['total']
        if(this.selectedCompany && this.perm=="SUPERADMIN")
        this.company = this.companies.find((x) => x._id === this.selectedCompany);
        console.log(this.company, "company");
        this.loading = false;
      });
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
      this.getData();
    }
  }
  changeRowSize() {
    this.limit = this.rowSize;
    this.getData();
  }
  resetDate(valueName: string) {
    this[valueName] = undefined;
  }
}
