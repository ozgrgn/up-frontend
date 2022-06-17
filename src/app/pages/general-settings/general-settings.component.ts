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
  page: any = "company";
  campaigns: any;
  newCampaign: any = {};
  reasons: any;
  newReason: any = {};
  newBranch: any = {};
  companies: any;
  selectedCompany: any = {};
  newCompany: any = {};

  constructor(
    private restService: RestService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.loading = false;
    this.getCampaigns();
    this.getCompanies();
  }
  //COMPANIES
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
  addCompany() {
    console.log(this.newCampaign.name);
    if (!this.newCompany.name) {
      this.toaster.error("Firma İsmi Girmelisiniz");
      return;
    }
    this.restService
      .addCompany(this.newCompany.name)
      .toPromise()
      .then((data) => {
        if (data["status"]) {
          this.getCompanies();
          this.selectedCompany = data["company"];
          this.toaster.success("Yeni Firma Oluşturuldu");
          console.log(data);
        }
        this.getCampaigns();
      });
  }

  getCompany() {
    this.restService
      .getCompany(this.selectedCompany._id)
      .toPromise()
      .then((data) => {
        if (data["status"]) {
          console.log(data);
          this.selectedCompany = data["company"];
        }
      });
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
  addBranch() {
    console.log(this.newBranch.name);
    if (!this.newBranch.name) {
      this.toaster.error("Şube İsmi Girmelisiniz");
      this.newBranch = {};
      return;
    }
    this.selectedCompany.branches.push({ name: this.newBranch.name });
    this.restService
      .updateCompany(this.selectedCompany)
      .toPromise()
      .then((data) => {
        if (data["status"]) {
          this.toaster.success("Yeni Şube Eklendi");
          this.newBranch = {};
        }
        // this.getReasons();
      });
  }
  updateCompany() {
    console.log(this.selectedCompany);
    this.restService
      .updateCompany(this.selectedCompany)
      .toPromise()
      .then((data) => {
        if (data["status"]) {
          this.toaster.success("Firma Güncellendi");
          this.newBranch = {};
          this.getCompanies()
        }
        // this.getReasons();
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
