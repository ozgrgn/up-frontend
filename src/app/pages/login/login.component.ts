import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  focus;
  focus1;

  username: String;
  password: String;
  constructor(
    private authService: AuthService,
    private toaster: ToastrService,
  ) {}

  ngOnInit() {}

  login() {
    this.authService
      .login(this.username, this.password)
      .toPromise()
      .then((data) => {
        console.log(data)
       if (data['status']){
        this.toaster.success("Giriş Başarılı!");
       }
       else
       this.toaster.error("Kullanıcı Adı ya da Şifre Hatalı");
      });
  }
}
