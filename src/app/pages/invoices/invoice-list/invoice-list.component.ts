import { Component, OnInit } from "@angular/core";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { RestService } from "src/app/services/rest.service";
import { DaterangeModel } from "src/app/components/date-range-picker/date-range-picker.component";
import { AuthService } from "src/app/services/auth.service";

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
  company: any = {};
  branch: any;
  invoiceNo: any;
  invoices: any;
  selectedInvoiceID: any;
  reasons: any;
  reason: any = {};
  declineDate: any;
  status: any = "PENDING";
  newStatus: any;
  newReason: any;
  approveDate: any;
  invoiceNos: any = [];

  approveNo: any;
  invoiceDate: DaterangeModel = {} as DaterangeModel;
  dateRange2: DaterangeModel = {} as DaterangeModel;
  perm: any;
  datePickerConfig = { format: "YYYY-MM-DD", firstDayOfWeek: "mo" };

  constructor(
    private modalService: NgbModal,
    private restService: RestService,
    private toaster: ToastrService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getPermission();
    this.getReasons();
  }
  getData() {
    this.getInvoices();
  }
  getPermission() {
    this.authService
      .getPermission()
      .toPromise()
      .then((perm) => {
        this.perm = perm["userType"];

        if (this.perm == "SUPERADMIN") {
          this.company._id = undefined;
          this.syncInvoices();
        } else {
          this.restService
            .getUser(localStorage.getItem("userId"))
            .toPromise()
            .then((data) => {
              if (data["status"]) {
                this.company = data["user"].company;
                this.syncInvoices();
              } else return;
            });
        }
      });
  }

  getInvoices() {
    this.invoiceNos = [];

    this.restService
      .getInvoices(
        this.limit,
        this.skip,
        this.company._id,
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
          : undefined
      )
      .toPromise()
      .then((data) => {
        this.totalDataCount = data["count"];
        this.invoices = data["invoices"];
        this.invoices.map((invoice, i) => {
          this.invoiceNos = [...this.invoiceNos, invoice.invoiceMerged];
        });
        this.getSyncInvoices();
        this.loading = false;
      });
  }

  getReasons() {
    this.restService
      .getReasons()
      .toPromise()
      .then((data) => {
        if (data["status"]) {
          this.reasons = data["reasons"];
        }
      });
  }
  syncInvoices() {
    this.restService
      .syncInvoices()
      .toPromise()
      .then((data) => {
        if (data["status"]) {
          this.getInvoices();
        }
      });
  }
  getSyncInvoices() {
    this.restService
      .getOutsideInvoicesWithFaturaNos(this.invoiceNos)
      .toPromise()
      .then((data) => {
        if (data["status"]) {
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
    this.declineDate = null;
    this.newReason = null;
    if (!this.approveDate || !this.approveNo) {
      this.toaster.error("Onaylandığı Tarihi ve Onay Nosunu Girmelisiniz");
      return;
    }
    this.restService
      .approveInvoice(
        this.selectedInvoiceID,
        "CONFIRMED",
        undefined,
        undefined,
        this.convertIsoString(this.approveDate),
        this.approveNo
      )
      .toPromise()
      .then((data) => {
        if (data["status"]) {
          this.toaster.success("Fatura Onaylandı!");
          this.approveDate = null;
          this.approveNo = null;
          this.getData();
        }
      });
  }
  disapproveInvoice() {
    if (!this.newReason || !this.declineDate) {
      this.toaster.error("Onaylanmama Sebebini ve Tarihini Girmelisiniz");
      return;
    }
    this.approveDate = null;
    this.approveNo = null;

    this.restService
      .approveInvoice(
        this.selectedInvoiceID,
        "DECLINED",
        this.newReason,
        this.convertIsoString(this.declineDate),
        undefined
      )
      .toPromise()
      .then((data) => {
        if (data["status"]) {
          this.toaster.success("Fatura İptal Edildi!");
          this.declineDate = null;
          this.newReason = null;
          this.getData();
        }
      });
  }
  changeInvStatus() {
    if (this.newStatus == "CONFIRMED") {
      if (!this.approveDate || !this.approveNo) {
        this.toaster.error("Onay No ve Onay Tarihi Girmelisiniz");
        return;
      } else {
        this.approveDate = this.convertIsoString(this.approveDate);
      }
      this.declineDate = null;
      this.newReason = null;
    } else if (this.newStatus == "DECLINED") {
      if (!this.newReason || !this.declineDate) {
        this.toaster.error("Onaylanmama Sebebini ve Tarihini Girmelisiniz");
        return;
      }
      this.declineDate = this.convertIsoString(this.declineDate);
      this.approveDate = null;
      this.approveNo = null;
    } else {
      this.approveDate = null;
      this.approveNo = null;
      this.declineDate = null;
      this.newReason = null;
    }
    this.restService
      .approveInvoice(
        this.selectedInvoiceID,
        this.newStatus,
        this.newReason,
        this.declineDate,
        this.approveDate,
        this.approveNo
      )
      .toPromise()
      .then((data) => {
        if (data["status"]) {
          this.toaster.success("Fatura Durumu Değiştirildi!");

          this.modalService.dismissAll();
          this.getData();
          this.approveDate = undefined;
          this.declineDate = undefined;
          this.approveNo = undefined;
          this.newReason = undefined;
        }
      });
  }
  resetDate(valueName: string) {
    this[valueName] = undefined;
  }
  convertIsoString(date: any) {
    if (date) {
      return new Date(`${date.year}-${date.month}-${date.day}`).toISOString();
    }
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


