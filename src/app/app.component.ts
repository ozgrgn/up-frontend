import { Component } from '@angular/core';
import { AuthService } from "src/app/services/auth.service";
import { RestService } from "src/app/services/rest.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'upartner';

constructor(
  private authService: AuthService,
  private restService: RestService,
  private router: Router


) {}
perm: any;

getPermission() {
  this.authService
    .getPermission()
    .toPromise()
    .then((perm) => {
      this.perm = perm["userType"];

      if (this.perm == "EXIT") {
        this.router.navigate(["/customer-list"]);

        // this.syncInvoices();
      } 
    });
}
ngOnInit() {
  this.getPermission() 
}
}
