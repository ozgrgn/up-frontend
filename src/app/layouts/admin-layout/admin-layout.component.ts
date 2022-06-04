import { Component, OnInit, HostListener } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { HelperService } from "src/app/services/helper.service";
@Component({
  selector: "app-admin-layout",
  templateUrl: "./admin-layout.component.html",
  styleUrls: ["./admin-layout.component.scss"],
})
export class AdminLayoutComponent implements OnInit {
auth:Boolean;

  constructor(
    private helperService: HelperService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.checkLoginStatus();
    this.authService.auth$.subscribe((data) => {
      if (!data) {
        this.router.navigate(["/login"]);
      }
      this.auth = data;
    });
    this.helperService.toggleSide();
  }

  toggleSide(oneway?) {
    this.helperService.toggleSide(oneway);
  }
  @HostListener("window:resize", ["$event"])
  onResize(event) {
    if (window.innerWidth < 1300) {
      this.toggleSide("close");
      return;
    }
  }
}

