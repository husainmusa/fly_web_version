/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : ionic 5 groceryee app
  Created : 10-Sep-2020
  This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2020-present initappz.
*/
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { UtilService } from 'src/app/services/util.service';
import { CartService } from 'src/app/services/cart.service';
import { sortBy } from 'lodash';
import { Location } from '@angular/common';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  dummyTopProducts: any[] = [];
  relatedProduct: any[] = [];
  filter: any = '1';
  limit: any;
  maxLimit: any;
  loaded: boolean;
  id: any;
  name: any;
  mode: any = 'grid';
  dummyProduct: any[] = [];
  dummy = Array(20);
  qty = 0;

  haveSearch: boolean;
  selectedFilter: any = '';
  selectedFilterID: any;

  min: any;
  max: any;
  minValue: any;
  maxValue: any;
  isClosedFilter: boolean = true;
  discount: any;
  haveSortFilter: boolean;
  constructor(
    public api: ApiService,
    public util: UtilService,
    public cart: CartService,
    private router: Router,
    private route: ActivatedRoute,
    private navCtrl: Location
  ) {
    this.route.queryParams.subscribe((data: any) => {
      console.log("inside products");
      console.log(data);
      if (data && data.id) {
        this.id = data.id;
        this.limit = 1;
        this.loaded = false;
        this.haveSortFilter = false;
        this.name = data.name;
        this.dummyTopProducts = Array(30);
        // this.getOffers();
        this.getProducts(false, 'none');
      } else {
        this.navCtrl.back();
      }
    });
    console.log("inside products");
  }

  getOffers() {
    const param = {
      id: this.id,
      limit: this.limit * 12
    };
    this.api.post('products/getProductByStores', param).subscribe((data: any) => {
      console.log('top products', data);
      const products = data.data;
      this.maxLimit = (this.limit * 12) - 1;
      this.dummyTopProducts = [];
      if (data && data.status === 200 && data.data && data.data.length) {
        data.data.forEach(element => {
          if (element.variations && element.size === '1' && element.variations !== '') {
            if (((x) => { try { JSON.parse(x); return true; } catch (e) { return false } })(element.status)) {
              element.variations = JSON.parse(element.variations);
              element['variant'] = 0;
            } else {
              element.variations = [];
              element['variant'] = 1;
            }
          } else {
            element.variations = [];
            element['variant'] = 1;
          }
          if(element.variations[0]){
            if(element.variations[0]){
              element.variations[0].items.forEach(addOnElement => {
                addOnElement['quantity'] = 0;
                addOnElement.id = element.id + '_' + addOnElement.title;
              });
            }
          }
          if (this.cart.itemId.includes(element.id)) {
            const index = this.cart.cart.filter(x => x.id === element.id);
            element['quantiy'] = index[0].quantiy;
            if(element.variations[0]){
              element.variations[0].items.forEach(pageElement => {
                index[0].variations[0].items.forEach(cartElement => {
                  if(pageElement.id == cartElement.id){
                    pageElement.quantity = cartElement.quantity;
                  }
                });
              });
            }
          } else {
            element['quantiy'] = 0;
          }
          this.products = [];
          // for(let i = 0; i< products.length; i++){
          //   if(products[i].parent_id == '0' || products[i].parent_id == ''){
          //     this.products.push(products[i]);
          //   }
          // }
          this.products.push(element);
        });
        if (this.loaded) {
          this.loaded = false;
        }
      } else {
        this.navCtrl.back();
      }

    }, error => {
      console.log(error);
      this.dummyTopProducts = [];
    });
  }
  ngOnInit(): void {
  }

  changeMode() {
    this.mode = this.mode === 'grid' ? 'list' : 'grid';
  }

  getProducts(limit, event) {
    const param = {
      id: this.id,
      limit: this.limit * 10,
      cid: localStorage.getItem('city')
    };

    this.api.post('products/getByCid', param).subscribe((data: any) => {
      console.log('ids', data);
      this.dummy = [];
      if (data && data.status === 200 && data.data && data.data.length) {
        const products = data.data;
        this.products = products.filter(x => x.status === '1');
        this.dummyProduct = this.products;
        // const cart = this.cart.cart;
        console.log('cart===============>>>>>>', this.cart.cart);
        this.products.forEach(info => {
          if (info.variations && info.size === '1' && info.variations !== '') {
            if (((x) => { try { JSON.parse(x); return true; } catch (e) { return false } })(info.variations)) {
              info.variations = JSON.parse(info.variations);
              info['variant'] = 0;
            } else {
              info.variations = [];
              info['variant'] = 1;
            }
          } else {
            info.variations = [];
            info['variant'] = 1;
          }

          if(info.variations[0]){
            info.variations[0].items.forEach(element => {
              element['quantity'] = 0;
              element.id = this.id + '_' + element.title;
            });
          }
         
          if (this.cart.itemId.includes(info.id)) {
            const index = this.cart.cart.filter(x => x.id === info.id);
            info['quantiy'] = index[0].quantiy;
            if(info.variations[0]){
              info.variations[0].items.forEach(pageElement => {
                index[0].variations[0].items.forEach(cartElement => {
                  if(pageElement.id == cartElement.id){
                    pageElement.quantity = cartElement.quantity;
                  }
                });
              });
            }
          } else {
            info['quantiy'] = 0;
            if(info.variations[0]){
              info.variations[0].items.forEach(addOnElement => {
                addOnElement.quantity = 0;
              });
            }
          }
        });

        this.max = Math.max(...this.products.map(o => o.original_price), 0);
        console.log('maxValueOfPrice', this.max);

        this.min = Math.min.apply(null, this.products.map(item => item.original_price))
        console.log('minValueOfPrice', this.min);
        if (this.selectedFilterID && this.selectedFilterID !== null) {
          this.updateFilter();
        }
        if (this.haveSortFilter && this.isClosedFilter === false) {
          this.sortFilter();
        }

      }
      if (limit) {
        event.complete();
      }

    }, error => {
      console.log(error);
      this.util.toast('error', this.util.getString('Error'), this.util.getString('Something went wrong'));
      if (limit) {
        event.complete();
      }
    });
  }

  sortFilter() {
    if (this.discount && this.discount !== null) {
      console.log('filter with discount');
      const products = [];
      this.dummyProduct.forEach(element => {
        if (parseFloat(element.original_price) >= this.minValue && parseFloat(element.original_price) <= this.maxValue &&
          parseFloat(this.discount) <= parseFloat(element.discount)) {
          products.push(element);
        }
        this.products = products;
      });
    } else {
      console.log('filter without discount');
      const products = [];
      this.dummyProduct.forEach(element => {
        if (parseFloat(element.original_price) >= this.minValue && parseFloat(element.original_price) <= this.maxValue) {
          products.push(element);
        }
      });
      this.products = products;
    }
  }

  updateFilter() {
    switch (this.selectedFilterID) {
      case '1':
        console.log('its rating');
        this.selectedFilter = this.util.getString('Popularity');
        this.products = this.products.sort((a, b) =>
          parseFloat(b.total_rating) < parseFloat(a.total_rating) ? -1
            : (parseFloat(b.total_rating) > parseFloat(a.total_rating) ? 1 : 0));
        break;

      case '2':
        console.log('its low to high');
        this.selectedFilter = this.util.getString('Price L-H');
        this.products = this.products.sort((a, b) =>
          parseFloat(a.original_price) < parseFloat(b.original_price) ? -1
            : (parseFloat(a.original_price) > parseFloat(b.original_price) ? 1 : 0));
        break;

      case '3':
        console.log('its highht to low');
        this.selectedFilter = this.util.getString('Price H-L');
        this.products = this.products.sort((a, b) =>
          parseFloat(b.original_price) < parseFloat(a.original_price) ? -1
            : (parseFloat(b.original_price) > parseFloat(a.original_price) ? 1 : 0));
        break;

      case '4':
        console.log('its a - z');
        this.selectedFilter = this.util.getString('A-Z');
        this.products = this.products.sort((a, b) => {
          if (a.name < b.name) { return -1; }
          if (a.name > b.name) { return 1; }
          return 0;
        });
        break;

      case '5':
        console.log('its z - a');
        this.selectedFilter = this.util.getString('Z-A');
        this.products = this.products.sort((a, b) => {
          if (a.name > b.name) { return -1; }
          if (a.name < b.name) { return 1; }
          return 0;
        });
        break;

      case '6':
        console.log('its % off');
        this.selectedFilter = this.util.getString('% Off');
        this.products = this.products.sort((a, b) =>
          parseFloat(b.discount) < parseFloat(a.discount) ? -1
            : (parseFloat(b.discount) > parseFloat(a.discount) ? 1 : 0));
        break;

      default:
        break;
    }
  }

  onChange(value) {
    console.log(value, this.filter);
    switch (this.filter) {
      case '1':
        console.log('its rating');
        // this.products = this.products.sort((a, b) => parseInt(b.total_rating) - parseInt(a.total_rating));
        this.products = this.products.sort((a, b) =>
          parseFloat(b.total_rating) < parseFloat(a.total_rating) ? -1
            : (parseFloat(b.total_rating) > parseFloat(a.total_rating) ? 1 : 0));
        break;

      case '2':
        console.log('its low to high');
        this.products = this.products.sort((a, b) =>
          parseFloat(a.original_price) < parseFloat(b.original_price) ? -1
            : (parseFloat(a.original_price) > parseFloat(b.original_price) ? 1 : 0));
        break;

      case '3':
        console.log('its highht to low');
        this.products = this.products.sort((a, b) =>
          parseFloat(b.original_price) < parseFloat(a.original_price) ? -1
            : (parseFloat(b.original_price) > parseFloat(a.original_price) ? 1 : 0));
        break;

      case '4':
        console.log('its a - z');
        this.products = this.products.sort((a, b) => {
          if (a.name < b.name) { return -1; }
          if (a.name > b.name) { return 1; }
          return 0;
        });
        break;

      case '5':
        console.log('its z - a');
        this.products = this.products.sort((a, b) => {
          if (a.name > b.name) { return -1; }
          if (a.name < b.name) { return 1; }
          return 0;
        });
        break;

      case '6':
        console.log('its % off');
        this.products = this.products.sort((a, b) =>
          parseFloat(b.discount) < parseFloat(a.discount) ? -1
            : (parseFloat(b.discount) > parseFloat(a.discount) ? 1 : 0));
        break;

      default:
        break;
    }
  }

  singleProduct(item) {
    console.log('-->', item);
    const param: NavigationExtras = {
      queryParams: {
        id: item.id
      }
    };
    this.router.navigate(['product-detail'], param);
  }

  addToCart(item, index) {
    console.log(item);
    this.products[index].quantiy = 1;
    this.cart.addItem(item);
  }

  add(product, index) {
    console.log(product);
    if (this.products[index].quantiy > 0) {
      this.products[index].quantiy = this.products[index].quantiy + 1;
      this.cart.addQuantity(this.products[index].quantiy, product.id);
    }
  }

  remove(product, index) {
    console.log(product, index);
    if (this.products[index].quantiy === 1) {
      if(this.products[index].variations[0]){
        this.products[index].variations[0].items.forEach(element => {
          element.quantity = 0;
        });
      }
      this.products[index].quantiy = 0;
      this.cart.removeItem(product.id);
    } else {
      this.products[index].quantiy = this.products[index].quantiy - 1;
      this.cart.addQuantity(this.products[index].quantiy, product.id);
    }
  }
  
  loadData() {
    this.limit = this.limit + 1;
    this.loaded = true;
    this.getOffers();
  }
}
