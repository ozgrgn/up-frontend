import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { RestService } from "src/app/services/rest.service";
import { NgSelectConfig } from "@ng-select/ng-select";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-invoice-edit",
  templateUrl: "./invoice-edit.component.html",
  styleUrls: ["./invoice-edit.component.scss"],
})
export class InvoiceEditComponent implements OnInit {
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
  ways: any = ["Havayolu", "Karayolu", "DenizYolu", "Koşarak"];
  countries: any;
  campaigns: any;
  product: any;
  reasons: any;
  units: any = ["Adet", "Kilo", "Litre"];
  selectedInvoiceID: any;
  oldAgencyId: any;
  oldCampaignId: any;
  oldAirlineId: any;
  perm:any;
  companies:any;
  focus;
  focus1;
  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private restService: RestService,
    private modalService: NgbModal,
    private toaster: ToastrService,
    private config: NgSelectConfig,

   private authService: AuthService,
  ) {
    this.config.notFoundText = "Böyle bir ürün yok";
  }

  ngOnInit(): void {
    this.authService
    .getPermission()
    .toPromise()
    .then((perm) => {
      this.perm=perm['userType']
      });
    this.getAgencies();
    this.getAirlines();
    this.getCategories();
    this.getCompanies();
    this.getCampaigns();
    this.getCountries();
    this.getData();
    this.getAirports();
  }
  getCategories() {
    this.restService
      .getCategories()
      .toPromise()
      .then((data) => {
        if (data["status"]) {
          this.categories = data["category"];

          console.log(this.categories, "categories");
        }
      });
  }
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
  getData() {
    this.restService
      .getInvoice(this.activeRoute.snapshot.params["id"])
      .toPromise()
      .then((data) => {
        this.invoice = data["invoice"];
        console.log(this.invoice, "invoice");
        this.loading = false;
        if (this.invoice && this.invoice.deparDate) {
          this.invoice.deparDate = this.deConvertIsoString(
            this.invoice.deparDate
          );
        }
        if (this.invoice && this.invoice.invoiceDate) {
          this.invoice.invoiceDate = this.deConvertIsoString(
            this.invoice.invoiceDate
          );
        }
        this.oldAgencyId = this.invoice.agencyId;
        this.oldCampaignId = this.invoice.campaignId;
        this.oldAirlineId = this.invoice.airlineId;
        console.log(data);
      });
  }
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
  getAirlines() {
    this.restService
      .getAirlines()
      .toPromise()
      .then((data) => {
        if (data["status"]) {
          console.log(data);
          this.airlines = data["airlines"];
          this.getData();
        }
      });
  }
  getAirports() {
    this.restService
      .getAirports()
      .toPromise()
      .then((data) => {
        if (data["status"]) {
          console.log(data);
          this.airports = data["airports"];
        }
      });
  }
  getAgencies() {
    this.restService
      .getAgencies()
      .toPromise()
      .then((data) => {
        if (data["status"]) {
          console.log(data);
          this.agencies = data["agencies"];
        }
      });
  }
  send() {
    if (this.invoice.airlineId && this.invoice.airlineId != this.oldAirlineId) {
      this.invoice.airline = this.airlines.find(
        (x) => x._id === this.invoice.airlineId
      ).name;
    }
    if (
      this.invoice.campaignId &&
      this.invoice.campaignId != this.oldCampaignId
    ) {
      this.invoice.campaign = this.campaigns.find(
        (x) => x._id === this.invoice.campaignId
      ).name;
    }
    if (this.invoice.agencyId && this.invoice.agencyId != this.oldAgencyId) {
      this.invoice.agency = this.agencies.find(
        (x) => x._id === this.invoice.agencyId
      ).name;
    }

    if (this.invoice.invoiceDate)
      this.invoice.invoiceDate = this.convertIsoString(
        this.invoice.invoiceDate
      );
    if (this.invoice.deparDate)
      this.invoice.deparDate = this.convertIsoString(this.invoice.deparDate);
    if (this.invoice.client.passportNo)
      this.invoice.client.passportNo =
        this.invoice.client.passportNo.toUpperCase();
    if (this.invoice.client.name)
      this.invoice.client.name = this.invoice.client.name.toUpperCase();
    if (this.invoice.client.surname)
      this.invoice.client.surname = this.invoice.client.surname.toUpperCase();
    if (this.invoice.destCity)
      this.invoice.destCity = this.invoice.destCity.toUpperCase();
    if (this.invoice.invoiceSerial)
      this.invoice.invoiceSerial = this.invoice.invoiceSerial.toUpperCase();
    if (this.invoice.terminal)
      this.invoice.terminal = this.invoice.terminal.toUpperCase();
    if (this.invoice.flight)
      this.invoice.flight = this.invoice.flight.toUpperCase();
    if (this.invoice.guide)
      this.invoice.guide = this.invoice.guide.toUpperCase();
    this.restService
      .updateInvoice(this.invoice)
      .toPromise()
      .then((data) => {
        if (data["status"]) {
          console.log(data);
          this.toaster.success("Fatura Başarıyla Güncellendi");

          this.router.navigate(["/invoice-list"]);
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
  addDetail() {
    if (!this.cats) {
      this.toaster.error("Lütfen Kategori Seçiniz");
      return;
    }
    if (!this.product) {
      this.toaster.error("Lütfen Ürün Seçiniz");
      return;
    }
    if (!this.newProduct.unit) {
      this.toaster.error("Lütfen Birim Seçiniz");
      return;
    }
    if (!this.newProduct.quantity) {
      this.toaster.error("Lütfen Miktar Giriniz");
      return;
    }
    if (!this.newProduct.price) {
      this.toaster.error("Lütfen Fiyat Giriniz");
      return;
    }
    if (!this.product.kdv) {
      this.toaster.error("Kdv ile ilgili bir hata var.");
      return;
    }

    this.invoice.details.push({
      productCategory: this.cats.category,
      productName: this.product.name,
      productId: this.product._id,
      kdv: this.product.kdv,
      productCode: this.newProduct.code,
      unit: this.newProduct.unit,
      quantity: this.newProduct.quantity,
      price: this.newProduct.price,
      productBrut: this.newProduct.quantity * this.newProduct.price,
      productTotal:
        this.newProduct.quantity * this.newProduct.price +
        (this.newProduct.quantity * this.newProduct.price * this.product.kdv) /
          100,
    });
    console.log(this.invoice.details);
    this.product = {};
    this.selectedCategory = undefined;
    this.selectedProduct = undefined;
    this.newProduct = {};
    this.getCategories();
  }
  selectCat(a) {
    this.cats = this.categories.filter(function (b) {
      console.log(a._id, "test");
      return b._id == a;
    });
    this.cats = this.cats[0];
    console.log(this.cats, "CAT");
  }
  selectProduct(a) {
    console.log(a);
    this.product = this.cats.product.filter(function (b) {
      console.log(a._id, "test");
      return b._id == a;
    });
    this.product = this.product[0];
    console.log(this.product, "product");
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
  removeDetail(index) {
    this.invoice.details.splice(index, 1);
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

  getCountries() {
    this.countries = [
      {
        name: "ABD Virgin Adaları",
      },
      {
        name: "Aland Adaları",
      },
      {
        name: "Almanya",
      },
      {
        name: "Amerika Birleşik Devletleri",
      },
      {
        name: "Andora",
      },
      {
        name: "Angola",
      },
      {
        name: "Anguilla",
      },
      {
        name: "Antarktika",
      },
      {
        name: "Antigua ve Barbuda",
      },
      {
        name: "Arjantin",
      },
      {
        name: "Arnavutluk",
      },
      {
        name: "Aruba",
      },
      {
        name: "Avustralya",
      },
      {
        name: "Avusturya",
      },
      {
        name: "Azerbaycan",
      },
      {
        name: "Bahamalar",
      },
      {
        name: "Bahreyn",
      },
      {
        name: "Bangladeş",
      },
      {
        name: "Barbados",
      },
      {
        name: "Belize",
      },
      {
        name: "Belçika",
      },
      {
        name: "Benin",
      },
      {
        name: "Bermuda",
      },
      {
        name: "Beyaz Rusya",
      },
      {
        name: "Bhutan",
      },
      {
        name: "Birleşik Arap Emirlikleri",
      },
      {
        name: "Birleşik Krallık",
      },
      {
        name: "Bolivya",
      },
      {
        name: "Bosna Hersek",
      },
      {
        name: "Botsvana",
      },
      {
        name: "Brezilya",
      },
      {
        name: "Brunei",
      },
      {
        name: "Bulgaristan",
      },
      {
        name: "Burkina Faso",
      },
      {
        name: "Burundi",
      },
      {
        name: "Cape Verde",
      },
      {
        name: "Cebelitarık",
      },
      {
        name: "Cezayir",
      },
      {
        name: "Christmas Adası",
      },
      {
        name: "Cibuti",
      },
      {
        name: "Cocos Adaları",
      },
      {
        name: "Cook Adaları",
      },
      {
        name: "Çad",
      },
      {
        name: "Çek Cumhuriyeti",
      },
      {
        name: "Çin",
      },
      {
        name: "Danimarka",
      },
      {
        name: "Dominik",
      },
      {
        name: "Dominik Cumhuriyeti",
      },
      {
        name: "Doğu Timor",
      },
      {
        name: "Ekvator",
      },
      {
        name: "Ekvator Ginesi",
      },
      {
        name: "El Salvador",
      },
      {
        name: "Endonezya",
      },
      {
        name: "Eritre",
      },
      {
        name: "Ermenistan",
      },
      {
        name: "Estonya",
      },
      {
        name: "Etiyopya",
      },
      {
        name: "Falkland Adaları (Malvinalar)",
      },
      {
        name: "Faroe Adaları",
      },
      {
        name: "Fas",
      },
      {
        name: "Fiji",
      },
      {
        name: "Fildişi Sahilleri",
      },
      {
        name: "Filipinler",
      },
      {
        name: "Filistin Bölgesi",
      },
      {
        name: "Finlandiya",
      },
      {
        name: "Fransa",
      },
      {
        name: "Fransız Guyanası",
      },
      {
        name: "Fransız Polinezyası",
      },
      {
        name: "Gabon",
      },
      {
        name: "Gambia",
      },
      {
        name: "Gana",
      },
      {
        name: "Gine",
      },
      {
        name: "Gine-Bissau",
      },
      {
        name: "Granada",
      },
      {
        name: "Grönland",
      },
      {
        name: "Guadeloupe",
      },
      {
        name: "Guam",
      },
      {
        name: "Guatemala",
      },
      {
        name: "Guernsey",
      },
      {
        name: "Guyana",
      },
      {
        name: "Güney Afrika",
      },
      {
        name: "Güney Georgia ve Güney Sandwich Adaları",
      },
      {
        name: "Güney Kore",
      },
      {
        name: "Güney Kıbrıs Rum Kesimi",
      },
      {
        name: "Gürcistan",
      },
      {
        name: "Haiti",
      },
      {
        name: "Hindistan",
      },
      {
        name: "Hint Okyanusu İngiliz Bölgesi",
      },
      {
        name: "Hollanda",
      },
      {
        name: "Hollanda Antilleri",
      },
      {
        name: "Honduras",
      },
      {
        name: "Hong Kong SAR - Çin",
      },
      {
        name: "Hırvatistan",
      },
      {
        name: "Irak",
      },
      {
        name: "İngiliz Virgin Adaları",
      },
      {
        name: "İran",
      },
      {
        name: "İrlanda",
      },
      {
        name: "İspanya",
      },
      {
        name: "İsrail",
      },
      {
        name: "İsveç",
      },
      {
        name: "İsviçre",
      },
      {
        name: "İtalya",
      },
      {
        name: "İzlanda",
      },
      {
        name: "Jamaika",
      },
      {
        name: "Japonya",
      },
      {
        name: "Jersey",
      },
      {
        name: "Kamboçya",
      },
      {
        name: "Kamerun",
      },
      {
        name: "Kanada",
      },
      {
        name: "Karadağ",
      },
      {
        name: "Katar",
      },
      {
        name: "Kayman Adaları",
      },
      {
        name: "Kazakistan",
      },
      {
        name: "Kenya",
      },
      {
        name: "Kiribati",
      },
      {
        name: "Kolombiya",
      },
      {
        name: "Komorlar",
      },
      {
        name: "Kongo",
      },
      {
        name: "Kongo Demokratik Cumhuriyeti",
      },
      {
        name: "Kosta Rika",
      },
      {
        name: "Kuveyt",
      },
      {
        name: "Kuzey Kore",
      },
      {
        name: "Kuzey Mariana Adaları",
      },
      {
        name: "Küba",
      },
      {
        name: "Kırgızistan",
      },
      {
        name: "Laos",
      },
      {
        name: "Lesotho",
      },
      {
        name: "Letonya",
      },
      {
        name: "Liberya",
      },
      {
        name: "Libya",
      },
      {
        name: "Liechtenstein",
      },
      {
        name: "Litvanya",
      },
      {
        name: "Lübnan",
      },
      {
        name: "Lüksemburg",
      },
      {
        name: "Macaristan",
      },
      {
        name: "Madagaskar",
      },
      {
        name: "Makao S.A.R. Çin",
      },
      {
        name: "Makedonya",
      },
      {
        name: "Malavi",
      },
      {
        name: "Maldivler",
      },
      {
        name: "Malezya",
      },
      {
        name: "Mali",
      },
      {
        name: "Malta",
      },
      {
        name: "Man Adası",
      },
      {
        name: "Marshall Adaları",
      },
      {
        name: "Martinik",
      },
      {
        name: "Mauritius",
      },
      {
        name: "Mayotte",
      },
      {
        name: "Meksika",
      },
      {
        name: "Mikronezya Federal Eyaletleri",
      },
      {
        name: "Moldovya Cumhuriyeti",
      },
      {
        name: "Monako",
      },
      {
        name: "Montserrat",
      },
      {
        name: "Moritanya",
      },
      {
        name: "Mozambik",
      },
      {
        name: "Moğolistan",
      },
      {
        name: "Myanmar",
      },
      {
        name: "Mısır",
      },
      {
        name: "Namibya",
      },
      {
        name: "Nauru",
      },
      {
        name: "Nepal",
      },
      {
        name: "Nijer",
      },
      {
        name: "Nijerya",
      },
      {
        name: "Nikaragua",
      },
      {
        name: "Niue",
      },
      {
        name: "Norfolk Adası",
      },
      {
        name: "Norveç",
      },
      {
        name: "Orta Afrika Cumhuriyeti",
      },
      {
        name: "Özbekistan",
      },
      {
        name: "Pakistan",
      },
      {
        name: "Palau",
      },
      {
        name: "Panama",
      },
      {
        name: "Papua Yeni Gine",
      },
      {
        name: "Paraguay",
      },
      {
        name: "Peru",
      },
      {
        name: "Pitcairn",
      },
      {
        name: "Polonya",
      },
      {
        name: "Portekiz",
      },
      {
        name: "Porto Riko",
      },
      {
        name: "Reunion",
      },
      {
        name: "Romanya",
      },
      {
        name: "Ruanda",
      },
      {
        name: "Rusya",
      },
      {
        name: "Samoa",
      },
      {
        name: "San Marino",
      },
      {
        name: "Sao Tome ve Principe",
      },
      {
        name: "Senegal",
      },
      {
        name: "Seyşeller",
      },
      {
        name: "Sierra Leone",
      },
      {
        name: "Singapur",
      },
      {
        name: "Slovakya",
      },
      {
        name: "Slovenya",
      },
      {
        name: "Solomon Adaları",
      },
      {
        name: "Somali",
      },
      {
        name: "Sri Lanka",
      },
      {
        name: "Sudan",
      },
      {
        name: "Surinam",
      },
      {
        name: "Suriye",
      },
      {
        name: "Suudi Arabistan",
      },
      {
        name: "Svalbard ve Jan Mayen",
      },
      {
        name: "Svaziland",
      },
      {
        name: "Sırbistan",
      },
      {
        name: "Şili",
      },
      {
        name: "Tacikistan",
      },
      {
        name: "Tanzanya",
      },
      {
        name: "Tayland",
      },
      {
        name: "Tayvan",
      },
      {
        name: "Togo",
      },
      {
        name: "Tokelau",
      },
      {
        name: "Tonga",
      },
      {
        name: "Trinidad ve Tobago",
      },
      {
        name: "Tunus",
      },
      {
        name: "Turks ve Caicos Adaları",
      },
      {
        name: "Tuvalu",
      },
      {
        name: "Türkiye",
      },
      {
        name: "Türkmenistan",
      },
      {
        name: "Uganda",
      },
      {
        name: "Ukrayna",
      },
      {
        name: "Umman",
      },
      {
        name: "Uruguay",
      },
      {
        name: "Ürdün",
      },
      {
        name: "Vanuatu",
      },
      {
        name: "Vatikan",
      },
      {
        name: "Venezuela",
      },
      {
        name: "Vietnam",
      },
      {
        name: "Wallis ve Futuna",
      },
      {
        name: "Yemen",
      },
      {
        name: "Yeni Kaledonya",
      },
      {
        name: "Yeni Zelanda",
      },
      {
        name: "Yunanistan",
      },
      {
        name: "Zambiya",
      },
      {
        name: "Zimbabve",
      },
    ];
  }
}
