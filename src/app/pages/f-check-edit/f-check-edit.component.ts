import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { RestService } from "src/app/services/rest.service";
import { NgSelectConfig } from "@ng-select/ng-select";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-f-check-edit",
  templateUrl: "./f-check-edit.component.html",
  styleUrls: ["./f-check-edit.component.scss"],
})
export class FCheckEditComponent implements OnInit {
  closeResult: any;
  loading: Boolean = true;
  newProduct: any = {};
  invoice: any = {};
  selectedCategory: any;
  selectedProduct: any;
  cats: any;
  categories: any;
  agencies: any;
  airlines: any;
  airports: any;
  ways: any = ["Havayolu", "Karayolu", "DenizYolu"];
  terminals: any = [];
  countries: any;
  campaigns: any;
  product: any = {};
  reasons: any;
  units: any = ["Adet", "Kilo", "Gram", "Karat"];
  selectedInvoiceID: any;
  oldAgencyId: any;
  oldCampaignId: any;
  oldTerminalId: any;
  oldAirlineId: any;
  perm: any;
  companies: any;
  totalProduct: any;
  totalBrut: any;
  totalKdv: any;
  totalKdv10: any = 0;
  totalKdv20: any = 0;
  totalKdv8: any = 0;
  totalKdv18: any = 0;
  userId: any;
  currency: any;
  tldov: any;
  selectedCurrency: any;
  fullName: any;
  upBranches: any;
  boxOffices: any;

  focus;
  focus1;
  focus2;
  focus3;
  focus4;
  focus5;
  focus6;
  focus7;
  focus8;
  focus9;
  focus10;
  focus11;
  focus12;
  focus13;
  focus14;
  focus15;
  focus16;
  focus17;
  focus18;
  focus19;
  focus20;
  focus21;
  focus22;
  focus23;
  focus24;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private restService: RestService,
    private modalService: NgbModal,
    private toaster: ToastrService,
    private config: NgSelectConfig,

    private authService: AuthService
  ) {}
  printContent() {
    if (!this.invoice.payed) {
      this.send();
    }
    const printContents =
      document.getElementById("printable-content")?.innerHTML;
    const originalContents = document.body.innerHTML;

    if (printContents) {
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      location.reload();
    }
  }

  ngOnInit(): void {
    this.authService
      .getPermission()
      .toPromise()
      .then((perm) => {
        this.perm = perm["userType"];
      });
    this.userId = localStorage.getItem("userId");
    this.fullName = localStorage.getItem("username");

    this.getCompanies();
    this.getBoxOffices();
    this.getUpBranches();
    this.getCurrency();
    this.getData();
  }

  calcPayingTaxFree() {
    this.invoice.payedCurrency = this.boxOffices.find(
      (x) => x._id === this.invoice.boxOffice
    ).currency;
    console.log(this.invoice.payedCurrency, "lllll");

    if (this.invoice.payedCurrency == "USD") {
      console.log(this.currency.realUSD, "currencyyyy");
      this.invoice.payedTaxFree = Number(
        this.invoice.invoiceFcheckTotal /
          (this.currency.realUSD ? this.currency.realUSD : this.currency.apiUSD)
      ).toFixed(0);
      this.tldov = this.numberBeautify4(
        1 /
          (this.currency.realUSD ? this.currency.realUSD : this.currency.apiUSD)
      );
      console.log(this.tldov, " tldov");
    } else if (this.invoice.payedCurrency == "EUR") {
      console.log(this.currency.realEUR, "currencyyyy");
      this.invoice.payedTaxFree = Number(
        this.invoice.invoiceFcheckTotal /
          (this.currency.realEUR ? this.currency.realEUR : this.currency.apiEUR)
      ).toFixed(0);
      this.tldov = this.numberBeautify4(
        1 /
          (this.currency.realEUR ? this.currency.realEUR : this.currency.apiEUR)
      );

      console.log(this.tldov, " tldov");
    } else {
      Number(
        (this.invoice.payedTaxFree = this.invoice.invoiceFcheckTotal)
      ).toFixed(0);
    }
  }

  findUpBranch() {
    console.log(this.upBranches, "upBranches");
    return this.upBranches.find((x) => x._id === this.invoice.upBranch).name;
  }
  getCurrency() {
    this.restService
      .getTodayCurrency()
      .toPromise()
      .then((data) => {
        if (data["status"]) {
          console.log(data, "todayCurrencys");
          this.currency = data["todayCurrencys"];
        }
      });
  }

  getCompanies() {
    this.restService
      .getCompanies()
      .toPromise()
      .then((data) => {
        if (data["status"]) {
          this.companies = data["companies"];
        }
      });
  }
  getBoxOffices() {
    this.restService
      .getBoxOffices()
      .toPromise()
      .then((data) => {
        if (data["status"]) {
          this.boxOffices = data["boxOffices"];
          console.log(data, this.boxOffices, "BOXOFFICES");
        }
      });
  }

  getUpBranches() {
    this.restService
      .getUpBranches()
      .toPromise()
      .then((data) => {
        if (data["status"]) {
          this.upBranches = data["upBranches"];
          console.log(data, this.upBranches, "upBranches");
        }
      });
  }
  getData() {
    this.restService
      .getFcheckInvoice(this.activeRoute.snapshot.params["id"])
      .toPromise()
      .then((data) => {
        this.invoice = data["invoice"];
        this.loading = false;

        if (this.invoice && this.invoice.invoiceDate) {
          this.invoice.invoiceDate = this.deConvertIsoString(
            this.invoice.invoiceDate
          );
        }
        if (this.invoice && this.invoice.approveDate) {
          this.invoice.approveDate = this.deConvertIsoString(
            this.invoice.approveDate
          );
          console.log(this.invoice.approveDate, " this.invoice.approveDate");
        }
        if (this.invoice && this.invoice.transactionDate) {
          this.invoice.transactionDate = this.deConvertIsoString(
            this.invoice.transactionDate
          );
        }
        if (!this.invoice.transactionDate) {
          this.invoice.transactionDate = new Date();
          this.invoice.transactionDate = this.deConvertIsoString(
            this.invoice.transactionDate
          );
        }
        if (!this.invoice.tlCurrency) {
          this.invoice.tlCurrency = 1.0;
        }
        if (this.invoice.invoiceBrutTotal && this.invoice.invoiceTaxTotal) {
          this.invoice.invoiceTaxRatio =
            this.invoice.invoiceTaxTotal / this.invoice.invoiceBrutTotal;
          this.invoice.invoiceTaxRatio = `% ${this.numberBeautify(
            this.invoice.invoiceTaxRatio * 100
          )}`;
        }
        this.invoice.upBranch = this.upBranches[0]._id;

        this.oldAgencyId = this.invoice.agencyId;
        this.oldCampaignId = this.invoice.campaignId;
        this.oldTerminalId = this.invoice.terminalId;
        this.oldAirlineId = this.invoice.airlineId;
        this.totalProduct = 0;
        this.totalBrut = 0;
        this.totalKdv = 0;
        this.invoice.details.map((product) => {
          this.totalProduct = this.totalProduct + product.productTotal;
          this.totalBrut = this.totalBrut + product.productBrut;
          this.totalKdv =
            this.totalKdv + (product.productTotal - product.productBrut);
          if (product.kdv == 8) {
            this.totalKdv8 =
              this.totalKdv8 + (product.productTotal - product.productBrut);
          }
          if (product.kdv == 18) {
            this.totalKdv18 =
              this.totalKdv18 + (product.productTotal - product.productBrut);
          }
          if (product.kdv == 10) {
            this.totalKdv10 =
              this.totalKdv10 + (product.productTotal - product.productBrut);
          }
          if (product.kdv == 20) {
            this.totalKdv20 =
              this.totalKdv20 + (product.productTotal - product.productBrut);
          }
        });
        console.log(this.invoice, "inboics");
      });
  }
  getCampaigns() {
    this.restService
      .getCampaigns()
      .toPromise()
      .then((data) => {
        if (data["status"]) {
          this.campaigns = data["campaigns"];
        }
      });
  }
cancelPayment() {
  this.restService
  .cancelPayment(this.invoice._id)
  .toPromise()
  .then((data) => {
    if (data["status"]) {
      console.log(data);

      this.toaster.success("Ödeme Başarıyla İptal Edildi");
    }
  });
}
  send() {
    if (!this.invoice.company || !this.invoice.company._id) {
      this.toaster.error("Lütfen Şirket Seçiniz");
      return;
    }
    if (!this.invoice.branch) {
      this.toaster.error("Lütfen Şube Seçiniz");
      return;
    }

    if (!this.invoice.client.name) {
      this.toaster.error("Lütfen Yolcu Adı Giriniz");
      return;
    }
    if (!this.invoice.client.surname) {
      this.toaster.error("Lütfen Yolcu Soyadı Giriniz");
      return;
    }
    if (!this.invoice.client.nation) {
      this.toaster.error("Lütfen Uyruk Giriniz");
      return;
    }
    if (!this.invoice.client.passportNo) {
      this.toaster.error("Lütfen Pasaport No Giriniz");
      return;
    }
    if (this.invoice.invoiceFcheckTotal)
      this.invoice.invoiceFcheckTotal = Number(this.invoice.invoiceFcheckTotal);
    console.log(
      this.invoice.invoiceFcheckTotal,
      "this.invoice.invoiceFcheckTotal"
    );

    if (this.invoice.invoiceDate)
      console.log(this.invoice.invoiceDate, "invoicededada");
    this.invoice.invoiceDate = this.convertIsoString(this.invoice.invoiceDate);
    console.log(this.invoice.invoiceDate, "invoicededada");

    if (this.invoice.transactionDate)
      console.log(this.invoice.transactionDate, "transactionDate");

    this.invoice.transactionDate = this.convertIsoString(
      this.invoice.transactionDate
    );
    console.log(this.invoice.transactionDate, "transactionDate");

    if (this.invoice.approveDate)
      console.log(this.invoice.approveDate, "approveDate");

    this.invoice.approveDate = this.convertIsoString(this.invoice.approveDate);
    console.log(this.invoice.approveDate, "approveDate");

    if (this.invoice.client.passportNo)
      this.invoice.client.passportNo =
        this.invoice.client.passportNo.toUpperCase();
    if (this.invoice.client.name)
      this.invoice.client.name = this.invoice.client.name.toUpperCase();
    if (this.invoice.client.surname)
      this.invoice.client.surname = this.invoice.client.surname.toUpperCase();

    this.restService
      .updateFcheckInvoice(this.invoice)
      .toPromise()
      .then((data) => {
        if (data["status"]) {
          console.log(data);

          this.toaster.success("Fatura Başarıyla Güncellendi");
        }
      });
  }
  deleteInvoice() {
    this.restService
      .deleteInvoice(this.invoice._id)
      .toPromise()
      .then((data) => {
        if (data["status"]) {
          console.log(data);
          this.toaster.success("Fatura Başarıyla Güncellendi");

          this.router.navigate(["/invoice-list"]);
        }
        console.log(data);
      });
  }

  convertIsoString(date: any) {
    if (date) {
      return new Date(`${date.year}-${date.month}-${date.day}`).toISOString();
    }
  }
  deConvertIsoString(date: string) {
    let newDate = new Date(date);

    if (date) {
      return {
        year: newDate.getFullYear(),
        month: newDate.getMonth() + 1,
        day: newDate.getDate(),
      };
    } else {
      return undefined;
    }
  }
  numberBeautify(number) {
    return number.toLocaleString("tr-TR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  numberBeautify4(number) {
    return number.toLocaleString("tr-TR", {
      minimumFractionDigits: 4,
      maximumFractionDigits: 4,
    });
  }

  //MODAL
  open(content?, type?: any, modalDimension?, id?) {
    this.selectedInvoiceID = id;
    if (modalDimension === "sm" && type === "modal_mini") {
      this.modalService
        .open(content, {
          windowClass: "modal-mini",
          size: "sm",
          centered: true,
        })
        .result.then(
          (result) => {
            this.closeResult = `Closed with: ${result}`;
          },
          (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          }
        );
    } else if (modalDimension === "" && type === "Notification") {
      this.modalService
        .open(content, { windowClass: "modal-danger", centered: true })
        .result.then(
          (result) => {
            this.closeResult = `Closed with: ${result}`;
          },
          (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          }
        );
    } else if (modalDimension === "a5") {
      this.modalService
        .open(content, {
          windowClass: "a5",
          size: "xl",
          centered: true,
          modalDialogClass: "a5",
        })
        .result.then(
          (result) => {
            this.closeResult = `Closed with: ${result}`;
          },
          (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          }
        );
    } else {
      this.modalService.open(content, { centered: true }).result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
}
