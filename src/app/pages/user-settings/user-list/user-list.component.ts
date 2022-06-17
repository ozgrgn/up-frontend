import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  loading: Boolean = true;
  users: any;
  fullName: any;
  totalDataCount: number;
  limit: number = 10;
  rowSize: number = 10;
  skip: number = 0;
  showPassive: Boolean = false;
  status: Boolean;
  userType:any;
  company:any;
  constructor(
    private restService: RestService,) { }

  ngOnInit(): void {
    this.getData();
  }
  getData(skip?:any){
    if(skip!='true')
    this.skip=0;
  this.restService
  .getUsers(this.limit, this.skip, this.fullName, this.company, this.status,this.userType)
  .toPromise()
  .then((data) => {
    console.log(data)
    this.loading = false;
    this.users = data["users"];
    this.totalDataCount = data["count"];
  });
}

pages(): any[] {
if (this.totalDataCount >= this.limit) {
  return new Array(Math.ceil(this.totalDataCount / this.limit));
} else {
  return [1];
}
}

filterByGroup() {}
ceilAndCalculate() {
if (
  Math.ceil(this.skip / this.limit) !=
  Math.ceil(this.totalDataCount / this.limit) - 1
) {
  this.skip = this.skip + this.limit;
  this.getData('true');
}
}
changeRowSize() {
this.limit = this.rowSize;
this.getData();
}
}
