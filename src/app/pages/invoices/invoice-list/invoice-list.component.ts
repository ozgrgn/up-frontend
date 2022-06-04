import { Component, OnInit } from "@angular/core";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { RestService } from "src/app/services/rest.service";
import { DaterangeModel } from "src/app/components/date-range-picker/date-range-picker.component";


@Component({
  selector: "app-invoice-list",
  templateUrl: "./invoice-list.component.html",
  styleUrls: ["./invoice-list.component.scss"],
})
export class InvoiceListComponent implements OnInit {
  page: any = "onay";
  closeResult: any;
  loading: Boolean = true;
  totalDataCount: number;
  limit: number = 10;
  rowSize: number = 10;
  skip: number = 0;
  fullName: any;
  company: any;
  branch: any;
  invoiceNo: any;
  invoices: any;
  selectedInvoiceID: any;
  reasons: any;
  reason: any = {};
  status: any = "PENDING";
  newStatus:any ;
  invoiceDate: DaterangeModel = {} as DaterangeModel;
  dateRange2: DaterangeModel = {} as DaterangeModel;

  constructor(
    private modalService: NgbModal,
    private restService: RestService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.getData();
    this.getReasons();
  }
  getData() {
    this.restService
      .getInvoices(
        this.limit,
        this.skip,
        this.company,
        this.branch,
        this.invoiceNo,
        this.fullName,
        this.status,
        undefined,
        undefined,
        this.invoiceDate?.startDate
        ? this.invoiceDate.startDate.toISOString()
        : undefined,
        this.invoiceDate?.endDate
        ? this.invoiceDate.endDate.toISOString()
        : undefined,
      )
      .toPromise()
      .then((data) => {
        console.log(data);
        this.totalDataCount = data["count"];
        this.invoices = data["invoices"];
        this.loading = false;
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

  pages(): any[] {
    if (this.totalDataCount >= this.limit) {
      return new Array(Math.ceil(this.totalDataCount / this.limit));
    } else {
      return [1];
    }
  }

  ceilAndCalculate() {
    if (
      Math.ceil(this.skip / this.limit) !=
      Math.ceil(this.totalDataCount / this.limit) - 1
    ) {
      this.skip = this.skip + this.limit;
      this.getData();
    }
  }
  changeRowSize() {
    this.limit = this.rowSize;
    this.getData();
  }
  approveInvoice() {
    this.restService
      .approveInvoice(this.selectedInvoiceID, "CONFIRMED", undefined)
      .toPromise()
      .then((data) => {
        if (data["status"]) {
          this.toaster.success("Fatura Onaylandı!");
        }
      });
  }
  disapproveInvoice() {
    console.log(this.reason.name);
    this.restService
      .approveInvoice(this.selectedInvoiceID, "DECLINE", this.reason.name)
      .toPromise()
      .then((data) => {
        this.toaster.success("Fatura İptal Edildi!");
        this.reason={}
      });
  }
  changeInvStatus(){
    console.log(this.newStatus,"newstatus")
    
    this.restService
      .approveInvoice(this.selectedInvoiceID, this.newStatus, undefined)
      .toPromise()
      .then((data) => {
        if(data['status'])
        this.toaster.success("Fatura Durumu Değiştirildi!");
this.getData();
      });
    }
  resetDate(valueName: string) {
    this[valueName] = undefined;
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
}
