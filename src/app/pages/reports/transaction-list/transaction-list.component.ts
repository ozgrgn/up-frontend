import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { RestService } from "src/app/services/rest.service";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";

import * as XLSX from "xlsx";

@Component({
  selector: "app-transaction-list",
  templateUrl: "./transaction-list.component.html",
  styleUrls: ["./transaction-list.component.scss"],
})
export class TransactionListComponent implements OnInit {
  fileName = "kasa-raporu.xlsx";
  closeResult: any;
  loading: Boolean = true;
  totalDataCount: number;
  limit: number = 10;
  rowSize: number = 10;
  skip: number = 0;
  perm: any;
  selectedBoxoffice: any;
  boxOffices: any;
  boxOffice: any = {};
  transaction: any;
  transactions: any;
  balance: any;
  newTransaction: any = {};

  constructor(
    private restService: RestService,
    private authService: AuthService,
    private modalService: NgbModal,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.getPermission();
  }
  getPermission() {
    this.authService
      .getPermission()
      .toPromise()
      .then((perm) => {
        this.perm = perm["userType"];

        console.log(perm, "perm");
        if (this.perm == "SUPERADMIN") {
          this.boxOffice._id = undefined;
          this.getBoxOffices();
        }
      });
  }
  getBoxOffices() {
    this.restService
      .getBoxOffices()
      .toPromise()
      .then((data) => {
        if (data["status"]) {
          console.log(data);
          this.boxOffices = data["boxOffices"];
        }
      });
  }
  getData() {
    console.log(this.selectedBoxoffice);
    this.restService
      .getTransactions(this.limit, this.skip, this.selectedBoxoffice)
      .toPromise()
      .then((data) => {
        console.log(data);
        this.totalDataCount = data["count"];
        this.balance = data["balance"];
        this.transactions = data["transactions"];
        console.log(this.transactions, "transactions");
        if (this.selectedBoxoffice && this.perm == "SUPERADMIN")
          this.boxOffice = this.boxOffices.find(
            (x) => x._id === this.selectedBoxoffice
          );
        console.log(this.boxOffice, "boxOffice");
        this.loading = false;
      });
  }

  addNewTransaction() {
    this.newTransaction.boxOffice = this.boxOffice._id;
    console.log("lkkkk");
    if (this.newTransaction.deposit == 1) {
      this.newTransaction.deposit = true;
    } else if (this.newTransaction.deposit == 0) {
      this.newTransaction.deposit = false;
    } else {
      this.toaster.error("Kasa Hareketi Türünü Girmelisiniz");
      return;
    }
    if (!this.newTransaction.amount) {
      this.toaster.error("Miktar Girmelisiniz");
      return;
    }
    if (!this.newTransaction.date) {
      this.toaster.error("Tarih Girmelisiniz");
      return;
    } else {
      this.newTransaction.date=this.convertIsoString(this.newTransaction.date);
    }
    if (!this.newTransaction.description) {
      this.toaster.error("Açıklama Girmelisiniz");
      return;
    }
    this.restService
      .addTransaction(this.newTransaction)
      .toPromise()
      .then((data) => {
        if (data["status"]) {
          this.toaster.success("Kasa Hareketi Oluşturuldu");
          this.newTransaction={}
          this.getData()
        }
      });

    console.log(this.newTransaction, "new transaction");
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
  convertIsoString(date: any) {
    if (date) {
      return new Date(`${date.year}-${date.month}-${date.day}`).toISOString();
    }
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

  exportexcel(): void {
    /* table id is passed over here */
    let element = document.getElementById("excel-table");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element, {
      raw: true,
    });

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
