/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : ionic 5 groceryee app
  Created : 10-Sep-2020
  This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2020-present initappz.
*/
import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { ApiService } from 'src/app/services/api.service';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
@Component({
  selector: 'app-top-store',
  templateUrl: './top-store.component.html',
  styleUrls: ['./top-store.component.scss']
})
export class TopStoreComponent implements OnInit {
  stores: any[] = [];
  dummystores: any[] = [];
  newStores:boolean = false;
  constructor(
    public util: UtilService,
    public api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.dummystores = Array(30);
    this.route.queryParams.subscribe((data: any) => {
      if(data.type == "new"){
        this.newStores = true;
      }
    });
    this.getStore();
  }

  ngOnInit(): void {
  }

  getStore() {
    const param = {
      id: localStorage.getItem('city')
    };
    this.api.post('stores/getByCity', param).subscribe((stores: any) => {
      console.log('stores by city', stores);
      this.stores = [];
      this.dummystores = [];
      if (stores && stores.status === 200 && stores.data && stores.data.length) {
        this.stores = stores.data;
        if(this.newStores){
          this.stores = this.stores.sort((b, a) => a.id - b.id);
        }
        this.stores.forEach(async (element) => {
          element['isOpen'] = await this.isOpen(element.open_time, element.close_time);
        });
        console.log('store====>>>', this.stores);
      }
    }, error => {
      this.dummystores = [];
      console.log(error);
      this.util.toast('error', this.util.getString('Error'), this.util.getString('Something went wrong'));
    });
  }

  isOpen(start, end) {
    const format = 'H:mm:ss';
    const ctime = moment().format('HH:mm:ss');
    const time = moment(ctime, format);
    const beforeTime = moment(start, format);
    const afterTime = moment(end, format);

    if (time.isBetween(beforeTime, afterTime)) {
      return true;
    }
    return false;
  }

  openStore(item, type) {
    console.log('open store', item);

    const param: NavigationExtras = {
      queryParams: {
        id: item.uid,
        name: item.name,
        type: type
      }
    };
    this.router.navigate(['/stores-products'], param);
  }

  getTime(time) {
    return moment(time, ['h:mm A']).format('hh:mm A');
  }
}
