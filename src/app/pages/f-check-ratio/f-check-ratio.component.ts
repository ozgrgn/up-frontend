import { Component, OnInit } from "@angular/core";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { RestService } from "src/app/services/rest.service";

@Component({
  selector: 'app-f-check-ratio',
  templateUrl: './f-check-ratio.component.html',
  styleUrls: ['./f-check-ratio.component.scss']
})
export class FCheckRatioComponent implements OnInit {

  closeResult: any;
  focus;
  focus1;
  newRatio: any = {};
  fcheckRatios:any=[];
  loading: Boolean = true;
  ratios:any=[10,20];
  constructor(
    private modalService: NgbModal,
    private restService: RestService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.getFcheckRatios();
    this.loading = false;
  }
  getFcheckRatios() {
    this.restService
      .getFcheckRatios()
      .toPromise()
      .then((data) => {
        if (data["status"]) {
          console.log(data, "fcheckRatios");
          this.fcheckRatios = data["fcheckRatios"];
        }
      });
  }
  addFcheckRatio() {
    this.restService
      .addFcheckRatio(this.newRatio)
      .toPromise()
      .then((data) => {
        if (data["status"]) {
          this.toaster.success("Yeni Oran Oluşturuldu");
          this.newRatio = {};
          this.getFcheckRatios()
        }
      });
  }

  deleteFcheckRatio(id) {
    this.restService
      .deleteFcheckRatio(id)
      .toPromise()
      .then((data) => {
        if (data["status"]) {
          this.toaster.success("Oran Silindi");
          this.getFcheckRatios()
        }
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
