import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "src/app/services/auth.service";
import { RestService } from "src/app/services/rest.service";

@Component({
  selector: "app-user-form",
  templateUrl: "./user-form.component.html",
  styleUrls: ["./user-form.component.scss"],
})
export class UserFormComponent implements OnInit {
  fullName: any;
  username: any;
  password: any;
  company: any = {};
  agencyId: any = null;
  nation: any = null;
  way: any = null;
  airport: any = null;
  airlineId: any = null;
  destCountry: any = null;
  selectedCompany: any = null;
  selectedBranch: any = "all";
  branch: any;
  userType: any;
  companies: any;
  focus;
  focus1;
  constructor(
    private restService: RestService,
    private authService: AuthService,
    private router: Router,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCompanies();
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
  selectCompany() {
    this.company = this.companies.find((x) => x._id === this.selectedCompany);
    console.log(this.company, "company");
  }
  save() {
    if (!this.fullName) {
      this.toaster.error("Lütfen İsim Soyisim Bölümünü Boş Bırakmayın");
      return;
    }
    // if (!this.selectedCompany) {
    //   this.toaster.error("Lütfen Şirket Bölümünü Boş Bırakmayın");
    //   return;
    // }
    this.authService
      .addUser(
        this.username,
        this.password,
        this.fullName,
        this.selectedCompany,
        this.selectedBranch,
        this.userType
      )
      .toPromise()
      .then((res) => {
        if (res["status"]) {
          this.toaster.success("Yeni Kullanıcı Oluşturuldu");
          this.router.navigate(["/user-list"]);
          
        } else {
          this.toaster.error("Bir şeyler ters gitti");
        }
        console.log(res);
      });
  }
}
