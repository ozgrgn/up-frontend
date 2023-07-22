import { Component, OnInit } from "@angular/core";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { RestService } from "src/app/services/rest.service";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit {
  closeResult: any;
  focus;
  focus1;
  categories: any;
  selectedCategory: any;
  cat: any;
  newCategory: any;
  newProduct: any = {};
  loading: Boolean = true;
  type:any="null";
  types:any=["14A","18A","14P","18P","TAŞ","İŞÇİLİK"];
  constructor(
    private modalService: NgbModal,
    private restService: RestService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.loading = false;
  }
  getCategories() {
    this.restService
      .getCategories()
      .toPromise()
      .then((data) => {
        if (data["status"]) {
          this.categories = data["category"];
        }
      });
  }
  addCategory() {
    this.restService
      .addCategory(this.newCategory)
      .toPromise()
      .then((data) => {
        if (data["status"]) {
          this.toaster.success("Yeni Kategori Oluşturuldu");
          this.newCategory = undefined;
        }
        this.getCategories();
      });
  }
  updateCategory(category: any) {
    console.log(category);
    this.restService
      .updateCategory(category)
      .toPromise()
      .then((data) => {
        if (data["status"]) {
          this.toaster.success("Kategori Güncellendi");
        }
      });
  }
  deleteCategory(id) {
    this.restService
      .deleteCategory(id)
      .toPromise()
      .then((data) => {
        if (data["status"]) {
          this.toaster.success("Kategori Silindi");

          this.getCategories();
        }
      });
  }
  addProduct() {
    this.cat.product.push(this.newProduct);

    console.log(this.cat.product, "newproductssss");
    this.restService
      .addProduct(this.selectedCategory, this.cat.product)
      .toPromise()
      .then((data) => {
        if (data["status"]) {
          this.toaster.success("Yeni Ürün Oluşturuldu");
          this.newProduct = {};
        }
      });
  }

  deleteProduct(index) {
    this.cat.product.splice(index, 1);
    this.restService
      .addProduct(this.selectedCategory, this.cat.product)
      .toPromise()
      .then((data) => {
        if (data["status"]) {
          this.toaster.success("Ürün Silindi");
        }
      });
  }
  selectCat(a) {
    console.log(a);
    console.log(this.selectedCategory, "selectedCategory");
    this.cat = this.categories.filter(function (b) {
      console.log(a._id, "test");
      return b._id == a;
    });
    this.cat = this.cat[0];
    console.log(this.cat);
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
