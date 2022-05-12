import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { RestService } from "src/app/services/rest.service";

@Component({
  selector: "app-invoice-form",
  templateUrl: "./invoice-form.component.html",
  styleUrls: ["./invoice-form.component.scss"],
})
export class InvoiceFormComponent implements OnInit {
  focus;
  focus1;
  name: any;
  surname:any;
  invoiceDate: any;
  invoiceSerial: any;
  invoiceNo: any;
  shopman: any;
  nation: any;
  address: any;
  phone: any;
  hotel: any;
  gate: any;
  terminal: any;
  destCountry: any;
  destCity: any;
  deparDate: any;
  deparTime: any;
  flight: any;
  guide: any;
  notes: any;
  passportNo: any;
  selectedCategory: any;
  selectedProduct: any;
  cats: any;
  category: any = {};
  categories: any = [];
  product: any = null;
  newProduct: any = {};
  units: any = ["Adet", "Kilo", "Litre"];
  countries: any;
  airlines: any;
  airline:any=null;
  airports: any;
  airport:any=null;
  agencies: any;
  agency:any=null;
  reasons: any;
  reason:any=null;
  campaigns: any;
  campaign:any=null;
  ways:any=["Havayolu","Karayolu","DenizYolu","Koşarak"]
  way:any=null;

  constructor(
    private restService: RestService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.category._id = null;
    this.getCategories();
    this.getCampaigns();
    this.getCountries();
    this.getAgencies();
    this.getAirports();
    this.getAirlines();
    console.log(this.ways,"ways")
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

  selectCat(a) {
    this.cats = this.categories.filter(function (b) {
      console.log(a._id, "test");
      return b._id == a;
    });
    this.cats = this.cats[0];
    console.log(this.cats);
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
  dene(cat) {
    console.log(cat);
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
