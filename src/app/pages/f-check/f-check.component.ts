import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "src/app/services/auth.service";
import { RestService } from "src/app/services/rest.service";
@Component({
  selector: "app-f-check",
  templateUrl: "./f-check.component.html",
  styleUrls: ["./f-check.component.scss"],
})
export class FCheckComponent implements OnInit {
  perm: any;
  loading: Boolean = true;
  search: any="FRN2024000001681";
  invoices: any;

  constructor(
    private authService: AuthService,
    private restService: RestService
  ) {}

  ngOnInit(): void {
    this.getPermission();
  }
  getData() {
    if (this.search) {
      this.restService
        .getFcheck(this.search)
        .toPromise()
        .then((data) => {
          console.log(data);
          this.invoices = undefined;

          this.invoices = data["invoices"];
          this.loading = false;
        });
    }
  }

  getPermission() {
    this.authService
      .getPermission()
      .toPromise()
      .then((perm) => {
        this.perm = perm["userType"];

        console.log(perm, "perm");
        if (this.perm == "SUPERADMIN" || this.perm == "EXIT") {
        }
      });
  }
}
