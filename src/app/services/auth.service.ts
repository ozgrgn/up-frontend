import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  auth: BehaviorSubject<boolean> = new BehaviorSubject(false);
  auth$ = this.auth.asObservable();

  permission: BehaviorSubject<string> = new BehaviorSubject(undefined);
  permission$ = this.permission.asObservable();
  apiUrl: String = environment.apiUrl
  constructor(private http: HttpClient, private router: Router) {}

  getPermission() {
    return this.http.get(`${this.apiUrl}/auth/permission`, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("token"),
      }),
    });
  }

  login(username: String, password: String) {
    return this.http
      .post(`${this.apiUrl}/auth/login`, { username, password })
      .pipe(
        tap((res) => {
          if (res["status"]) {
            localStorage.setItem("token", res["token"]);
            localStorage.setItem("fullName", res["fullName"]);
            localStorage.setItem("userId", res["userId"]);
            localStorage.setItem("username", res["username"]);
            this.checkLoginStatus();
          }
        })
      );
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("fullName");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    this.checkLoginStatus();
  }

  async checkLoginStatus(): Promise<any> {
    if (!localStorage.getItem("token")) {
      if (this.router.url != "/register") {
        this.router.navigateByUrl("/login");
      }
      this.permission.next(undefined);
      this.auth.next(false);
    } else {
      this.getPermission()
        .toPromise()
        .then((res) => {
          this.permission.next(res["userType"]);
        });
      if (this.router.url == "/login") {
        this.router.navigateByUrl("/");
      }

      this.auth.next(true);
    }
  }

  addUser(username: String, password: String, fullName: String, company:String,branch:String,userType:String) {
    return this.http.post(`${this.apiUrl}/auth/signup`, {
      username,
      password,
      fullName,
      company,
      branch,

      userType: userType,
    });
  }
}
