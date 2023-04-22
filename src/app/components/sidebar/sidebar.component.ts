import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd, NavigationStart } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { HelperService } from "src/app/services/helper.service";
import { Location, PopStateEvent } from "@angular/common";
import { RestService } from "src/app/services/rest.service";

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: any[] = [
  // {
  //   path: "/calculator",
  //   title: "Ücret Hesaplama",
  //   icon: "fa fa-calculator  text-icon",
  //   class: "",
  // },

  {
    path: "/invoice-form",
    title: "FATURA OLUŞTUR",
    icon: "fa fa-receipt text-icon",
    class: "",
    toggleSide: false,
  },
  {
    path: "/invoice-list",
    title: "FATURALAR",
    icon: "ni ni-briefcase-24 text-icon",
    class: "",
    toggleSide: true,
  },
  // {
  //   path: "/lawsuit-form",
  //   title: "Dosya Ekle",
  //   icon: "ni ni-folder-17 text-icon",
  //   class: "",
  // },
  // {
  //   path: "/user-list",
  //   title: "Kişiler",
  //   icon: "fas fa-users text-icon",
  //   class: "",
  //   toggleSide: true,
  // },
  // {
  //   path: "/user-form",
  //   title: "Kişi Ekle",
  //   icon: "ni ni-single-02 text-icon",
  //   class: "",
  // },
  // { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-icon', class: '' },
  // { path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '' },
  // { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '' },
  // { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' },
  // { path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '' },

  //     { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' }
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  permission: any;
  auth: Boolean = false;
  fullName: String;
  allMessages: any;
  userMessages: any;
  i: number = 0;
  flag: Boolean = false;
  loading: Boolean = true;
  userId: String;
  user: any;
  perm: any;
  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];
  public menuItems: any[];
  public isCollapsed = true;

  constructor(
    private router: Router,
    private helperService: HelperService,
    private authService: AuthService,
    public location: Location,
    private restService: RestService
  ) {}

  toggleSide() {
    this.helperService.toggleSide();
  }
  ngOnInit() {
    console.log("on init sidebar");
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
      if (event instanceof NavigationStart) {
        if (event.url != this.lastPoppedUrl)
          this.yScrollStack.push(window.scrollY);
      } else if (event instanceof NavigationEnd) {
        this.authService.checkLoginStatus();

        if (event.url == this.lastPoppedUrl) {
          this.lastPoppedUrl = undefined;
          window.scrollTo(0, this.yScrollStack.pop());
        } else window.scrollTo(0, 0);
      }
    });
    this.authService.auth$.subscribe((auth) => {
      this.auth = auth;
      if (auth) {
        this.authService
          .getPermission()
          .toPromise()
          .then((perm) => {
            this.permission = perm;
            this.perm = perm["userType"];
            this.permission = this.permission.userType;
            this.fullName = localStorage.getItem("fullName");
            this.userId = localStorage.getItem("userId");
            console.log(this.permission,"perm")
          });

        this.location.subscribe((ev: PopStateEvent) => {
          this.lastPoppedUrl = ev.url;
        });
      }
    });
    this.userId = localStorage.getItem("userId");
    this.restService
      .getUser(this.userId)
      .toPromise()
      .then((res) => {
        this.user = res["user"];
      });
  }
  logout() {
    this.authService.logout();
  }

}
