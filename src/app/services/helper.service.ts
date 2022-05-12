import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class HelperService {
  constructor() {}

  toggleSide(oneway?) {
    let side: any = document.getElementsByClassName("navbar-expand-md")[0];
    let mainContent: any = document.getElementsByClassName("main-content")[0];
    if (window.getComputedStyle(side).opacity == "1") {
      document.body.classList.remove("modal250");
      side.style.opacity = "0";
      side.style.transition = "all 1s ease-in-out;";
      mainContent.style.marginLeft = "0px";
    } else if (!oneway) {
      document.body.classList.add("modal250");
      side.style.opacity = "1";
      side.style.transition = "all 1s ease-in-out;";
      mainContent.style.marginLeft = "250px";
    }
  }
}
