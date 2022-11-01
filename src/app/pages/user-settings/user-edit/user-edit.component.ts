import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { RestService } from "src/app/services/rest.service";

@Component({
  selector: "app-user-edit",
  templateUrl: "./user-edit.component.html",
  styleUrls: ["./user-edit.component.scss"],
})
export class UserEditComponent implements OnInit {
  user: any = [];
  userText: any;
  loading: Boolean = true;
  company: any = {};
  selectedCompany: any = null;
  companies: any;

  focus;
  focus1;
  focus2;
  focus3;
  focus4;
  focus8;
  constructor(
    private restService: RestService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.restService
      .getUser(this.activeRoute.snapshot.params["id"])
      .toPromise()
      .then((data) => {
        this.user = data["user"];
        console.log(this.user);
        this.getCompanies();
        this.loading = false;
      });
  }

  send() {
    if (!this.user.fullName) {
      this.toaster.error("İsim alanını boş bırakmayınız!");
      return;
    }
    console.log(this.user, "göndermeden önceki user");
    this.restService
      .updateUser(this.user)
      .toPromise()
      .then((res) => {
        this.toaster.success("Kişi Düzenleme Başarılı");
        setTimeout(() => {
          setTimeout(() => {
            this.router.navigateByUrl("/user-list");
          });
        }, 2000);
      });
  }

  delete() {
    if (this.user._id == "616dcf9ffbebe5234ca7c8e6") {
      this.toaster.error("Bu kullanıcıyı silemezsiniz!");
      return;
    }
    this.restService
      .deleteUser(this.user._id)
      .toPromise()
      .then((res) => {
        this.toaster.success("Kişi Silindi");
        setTimeout(() => {
          setTimeout(() => {
            this.router.navigateByUrl("/user-list");
          });
        }, 2000);
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
          this.companies.map((company) => {
            if (this.user.company && this.user.company._id == company._id) {
              this.company = company;
              console.log(this.company, "company");
            }
          });
        }
      });
  }
  selectCompany() {
    this.company = this.companies.find((x) => x._id === this.user.company._id);
    console.log(this.company, "company");
    console.log(this.user);
  }
}
