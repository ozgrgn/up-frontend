import { Component, OnInit } from "@angular/core";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { RestService } from "src/app/services/rest.service";

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {
  closeResult: any;
  focus;
  focus1;
  newRatio: any = {};
  currency:any=[];
  loading: Boolean = true;
  ratios:any=[10,20];
  constructor(
    private modalService: NgbModal,
    private restService: RestService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCurrency();
    this.loading = false;
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
  updateCurrency() {

    console.log(this.currency, "göndermeden önceki user");
    this.restService
      .updateTodayCurrency(this.currency)
      .toPromise()
      .then((res) => {
        this.toaster.success("Döviz Düzenleme Başarılı");

      });
  }

  //MODAL
  open(content?, type?, modalDimension?) {
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
}
