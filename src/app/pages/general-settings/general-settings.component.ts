import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { RestService } from "src/app/services/rest.service";

@Component({
  selector: "app-general-settings",
  templateUrl: "./general-settings.component.html",
  styleUrls: ["./general-settings.component.scss"],
})
export class GeneralSettingsComponent implements OnInit {
  loading: Boolean = true;
  page: any = "campaigns";
  campaigns: any;
  newCampaign: any = {};
  reasons:any;
  newReason:any={}

  constructor(
    private restService: RestService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.loading = false;
    this.getCampaigns();
  }

  //CAMPAIGNS
  getCampaigns() {
    this.restService
      .getCampaigns()
      .toPromise()
      .then((data) => {
        if (data["status"]) {
          console.log(data);
          this.campaigns = data["campaigns"];
        }
      });
  }

  addCampaign() {
    console.log(this.newCampaign.name);
    if (!this.newCampaign.name) {
      this.toaster.error("Kampanya İsmi Girmelisiniz");
      return;
    }
    this.restService
      .addCampaign(this.newCampaign.name)
      .toPromise()
      .then((data) => {
        if (data["status"]) {
          this.toaster.success("Yeni Kampanya Oluşturuldu");
          this.newCampaign = {};
        }
        this.getCampaigns();
      });
  }
  deleteCampaign(id) {
    console.log(id);
    this.restService
      .deleteCampaign(id)
      .toPromise()
      .then((data) => {
        if (data["status"]) {
          this.toaster.success("Kampanya Silindi");
          this.newCampaign = {};
        }
        this.getCampaigns();
      });
  }

//ONAYLANMAMA SEBEPLERİ
getReasons() {
  this.restService
    .getReasons()
    .toPromise()
    .then((data) => {
      if (data["status"]) {
        console.log(data);
        this.reasons = data["reasons"];
      }
    });
}

addReason() {
  console.log(this.newReason.name);
  if (!this.newReason.name) {
    this.toaster.error("Onaylanmama Nedeni Girmelisiniz");
    return;
  }
  this.restService
    .addReason(this.newReason.name)
    .toPromise()
    .then((data) => {
      if (data["status"]) {
        this.toaster.success("Onaylanmama Sebebi Oluşturuldu");
        this.newReason = {};
      }
      this.getReasons();
    });
}
deleteReason(id) {
  console.log(id);
  this.restService
    .deleteReason(id)
    .toPromise()
    .then((data) => {
      if (data["status"]) {
        this.toaster.success("Onaylanmama Sebebi Silindi");
        this.newReason = {};
      }
      this.getReasons();
    });
}

}