import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { RestService } from "src/app/services/rest.service";
import { DaterangeModel } from "src/app/components/date-range-picker/date-range-picker.component";

@Component({
  selector: "app-product-report",
  templateUrl: "./product-report.component.html",
  styleUrls: ["./product-report.component.scss"],
})
export class ProductReportComponent implements OnInit {
  loading: Boolean = true;
  totalDataCount: number;
  limit: number = 10;
  rowSize: number = 10;
  skip: number = 0;
  company: any = {};
  selectedCompany: any;
  companies: any;
  branches: any;
  branch: any;
  invoiceNo: any;
  status: any;
  noPending: Boolean = false;
  products: any;
  allProducts:any=[];
  selectedProduct:any
  categories: any;

  total: any;
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
    this.getCategories();
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
          this.getCompanies();
          this.getData();
        } else {
          this.restService
            .getUser(localStorage.getItem("userId"))
            .toPromise()
            .then((data) => {
              if (data["status"]) {
                this.selectedCompany = data["user"].company._id;
                this.company = data["user"].company;
                console.log(this.company, "company");
                this.getData();
              } else return;
            });
        }
      });
  }
  getData() {
    this.restService
      .getProductReports(
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
          : undefined,
this.selectedProduct
      )
      .toPromise()
      .then((data) => {
        console.log(data);
        this.products = data["product"];
        console.log(this.products);
        if (this.selectedCompany && this.perm == "SUPERADMIN")
          this.company = this.companies.find(
            (x) => x._id === this.selectedCompany
          );
        console.log(this.company, "company");

        this.loading = false;
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
  getCategories() {
    this.restService
      .getCategories()
      .toPromise()
      .then((data) => {
        if (data["status"]) {
          this.categories = data["category"]; 
          console.log(this.categories)
          this.categories.map((cat)=>{
            cat.product.map((product)=>{
              this.allProducts=[...this.allProducts,product];
            })
            
          })
          console.log(this.allProducts, "allProducts");
        }
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
