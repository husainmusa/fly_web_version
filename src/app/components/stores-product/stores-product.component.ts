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
  selector: 'app-stores-product',
  templateUrl: './stores-product.component.html',
  styleUrls: ['./stores-product.component.scss']
})
export class StoresProductComponent implements OnInit {
  products: any[] = [];
  dummyTopProducts: any[] = [];
  categories: any[] = [];
  relatedProduct: any[] = [];
  filter: any = '1';
  limit: any;
  maxLimit: any;
  loaded: boolean;
  id: any;
  name: any;
  mode: any = 'grid';
  PageType: any;
  constructor(
    public api: ApiService,
    public util: UtilService,
    public cart: CartService,
    private router: Router,
    private route: ActivatedRoute,
    private navCtrl: Location
  ) {
   
    this.route.queryParams.subscribe((data: any) => {
      console.log("categorytype",data);
      console.log("categorytype", data.type);
      if (data && data.id) {
        this.id = data.id;
        this.limit = 1;
        this.loaded = false;
        this.name = data.name;

        this.dummyTopProducts = Array(30);
        this.getCategorys();
        if(data.type == "category"){
          this.PageType = 'category'
          console.log("inside category");
          this.getProducts();
        }else{
          this.PageType = 'others'
          console.log("inside store");
          this.getOffers();
        }
      } else {
        this.navCtrl.back();
      }
    });
  }

  getOffers() {
    const param = {
      id: this.id,
      limit: this.limit * 1000
    };
    this.api.post('products/getProductByStores', param).subscribe((data: any) => {
      console.log('getProductByStores', data);
      const products = data.data;


      this.maxLimit = (this.limit * 1000) - 1;
      this.dummyTopProducts = [];
      if (data && data.status === 200 && data.data && data.data.length) {

        this.categories.forEach(element => {
          if(element && element.id){
            // console.log('element',element)
            element.prod = []
             products.forEach(pro =>{
              if(pro.cate_id ===  element.id){
                element.prod.push(pro)
              }
            })
          }
        });


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

          if (element.second_variation  && element.second_variation !== '') {
            if (((x) => { try { JSON.parse(x); return true; } catch (e) { return false } })(element.second_variation)) {
              element.second_variation = JSON.parse(element.second_variation);
              console.log('element.second_variation=>',element.second_variation)
              if(element.second_variation){
                element.second_variation.forEach(elementInner => {
                  console.log('elementInner=======>',elementInner)
                  elementInner.sub_category = JSON.parse(elementInner.sub_category);
                  if(elementInner.sub_category.length){
                    elementInner.sub_category.forEach(subcatelim => {
                      subcatelim['quantity'] = 0;
                      subcatelim['id'] = element.id + '_' + subcatelim.en_title;
                      subcatelim['type'] = elementInner.type;
                    })
                  }
                })
              }

            } else {
              element.second_variation = [];
             // element['variant'] = 1;
            }
            
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
          // this.products = [];
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

  getProducts() {
    const param = {
      id: this.id,
      limit: this.limit * 1000,
      cid: localStorage.getItem('city')
    };
    this.api.post('products/getByCid', param).subscribe((data: any) => {
      console.log('getByCid', data);
      const products = data.data;
      this.maxLimit = (this.limit * 1000) - 1;
      this.dummyTopProducts = [];
      if (data && data.status === 200 && data.data && data.data.length) {
        this.categories.forEach(element => {
          if(element && element.id){
            // console.log('element',element)
            element.prod = []
             products.forEach(pro =>{
              if(pro.cate_id ===  element.id){
                element.prod.push(pro)
              }
            })
          }
        });


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

          if (element.second_variation  && element.second_variation !== '') {
            if (((x) => { try { JSON.parse(x); return true; } catch (e) { return false } })(element.second_variation)) {
              element.second_variation = JSON.parse(element.second_variation);
              console.log('element.second_variation=>',element.second_variation)
              if(element.second_variation){
                element.second_variation.forEach(elementInner => {
                  console.log('elementInner=======>',elementInner)
                  elementInner.sub_category = JSON.parse(elementInner.sub_category);
                  if(elementInner.sub_category.length){
                    elementInner.sub_category.forEach((subcatelim,index) => {
                      subcatelim['quantity'] = 0;
                      subcatelim['id'] = element.id + '_' + subcatelim.en_title+index;
                      subcatelim['type'] = elementInner.type;
                    })
                  }
                })
              }

            } else {
              element.second_variation = [];
             // element['variant'] = 1;
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
       //   this.products = [];
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
    setTimeout(() => {
      console.log('this.products==>?',this.products)
    }, 1000);
  
  }

  ngOnInit(): void {
  }

  changeMode() {
    this.mode = this.mode === 'grid' ? 'list' : 'grid';
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

    /***  get categories here and map in product  **/

    // getCategorys(){
    //   this.api.get('categories').subscribe((res: any) => {
    //     if(res && res.data && res.data.length){
    //        this.categories =  res.data;
    //        console.log('categories=========>',  this.categories)
  
    //     }
  
    //   })
    // }
    getCategorys(){

      const param = {
        id: this.id
      }
      this.api.post('categories/getByStoreId',param).subscribe((data: any) => {
          if (data && data.status === 200 &&  data.data.catIndex  && data.data.catIndex != '' ) {
            if (((x) => { try { JSON.parse(x); return true; } catch (e) { return false } })(data.data.catIndex )) {
                  this.categories =  JSON.parse(data.data['catIndex']);
                  console.log('this.categoriessdsd',this.categories )
                  this.categories.sort(function (a, b) {
                    return a.index - b.index;
                  });
                }
            }else if(data && data.status === 300) {
              this.categories = data.data;
      
            }
        })
      }
}
