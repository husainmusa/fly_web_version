/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : ionic 5 groceryee app
  Created : 10-Sep-2020
  This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2020-present initappz.
*/
import { Component, OnInit, ElementRef, ViewChild ,OnDestroy  } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { UtilService } from 'src/app/services/util.service';
import { CartService } from 'src/app/services/cart.service';
import { exit } from 'process';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements  OnDestroy {
  @ViewChild('topContent', { read: ElementRef }) public topContent: ElementRef<any>;
  name: any = '';

  realPrice: any;
  sellPrice: any;
  discount: any;
  description: any;
  is_single: any;
  subId: any;
  status: any;
  coverImage: any = '';
  veg: any;

  have_gram: any;
  gram: any;
  have_kg: any;
  kg: any;
  have_pcs: any;
  pcs: any;
  have_liter: any;
  liter: any;
  have_ml: any;
  ml: any;
  exp_date: any;
  childrenId:any = [];
  in_stoke: any;
  in_offer: any;
  key_features: any = '';
  disclaimer: any = '';

  id: any;

  gallery: any[] = [];
  relatedProduct: any[] = [];
  elementQuanity:any;
  related: any[] = [];
  dummyTopProducts = Array(5);
  quantiy: any = 0;
  productt: any;
  loaded: boolean;
  storeId: any;
  storeName: any;
  products: any[] = [];
  filter: any = '1';
  limit: any;
  maxLimit: any;
  mode: any = 'grid';
  size: any;
  variations: any;
  variant: any;
  subProductId: any[] = [];
  parent: any[] = [];
  selectedProduct:any;
  subProduct:any;
  subQuantity:any; 
  second_variation: any[] = [];
  second_variant: number;
  onCloseModelSubcription: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private navCtrl: Location,
    public api: ApiService,
    public util: UtilService,
    public cart: CartService) {
    this.route.queryParams.subscribe(data => {
      if (data && data.id) {
        this.id = data.id;
        console.log('this.id=========>',this.id)
        this.getProduct();
      } else {
        this.navCtrl.back();
      }
    });

    this.onCloseModelSubcription  =  this.util.onCloseModel().subscribe(data => {
            if (data) {
                  this.checkCartItems()
            } else {
              // clear messages when empty message received
              
            }
          });
    }


    ngOnDestroy() {
      // unsubscribe to ensure no memory leaks
      this.onCloseModelSubcription.unsubscribe();
  }


  getProduct() {
    this.selectedProduct = this.id;
    const param = {
      id: this.id
    };
    this.loaded = false;
    this.api.post('products/getById', param).subscribe((data: any) => {
      this.loaded = true;
      console.log(data);
      this.gallery = [];
      if (data && data.status === 200 && data.data && data.data.length) {
        const info = data.data[0];
        console.log('there is information',info)
        this.productt = info;
        this.productt['quantiy'] = 0;
        this.name = info.name;
        this.description = info.descriptions;
        this.subId = info.sub_cate_id;
        this.coverImage = info.cover;
        this.key_features = info.key_features;
        this.disclaimer = info.disclaimer;
        this.discount = info.discount;
        this.exp_date = info.exp_date;
        this.gram = info.gram;
        this.have_gram = info.have_gram;
        this.kg = info.kg;
        this.have_kg = info.have_kg;
        this.liter = info.liter;
        this.have_liter = info.have_liter;
        this.ml = info.ml;
        this.have_ml = info.have_ml;
        this.pcs = info.pcs;
        this.have_pcs = info.have_pcs;
        this.in_offer = info.in_offer;
        this.in_stoke = info.in_stoke;
        this.is_single = info.is_single;
        this.veg = info.kind;
        this.realPrice = parseFloat(info.original_price);
        this.sellPrice = parseFloat(info.sell_price);
        this.status = info.status;
        this.storeId = info.store_id;
        this.storeName = info.s_name;
        this.gallery.push(this.coverImage);
        this.size = info.size;
        console.log(info.variations,"variations");
        if (info.variations && info.size === '1' && info.variations !== '') {
          if (((x) => { try { JSON.parse(x); return true; } catch (e) { return false } })(info.status)) {
            this.variations = JSON.parse(info.variations);
            this.variant = 0;
            this.productt['variations'] = JSON.parse(info.variations);
            this.productt['variant'] = 0;
          } else {
            info.variations = [];
            this.productt['variations'] = [];
            this.variant = 1;
            this.productt['variant'] = 1;
          }
        } else {
          this.variations = [];
          this.variant = 1;
          this.productt['variations'] = [];
          this.productt['variant'] = 1;
        }

        if (info.second_variation && info.second_variation !== '') {
          if (((x) => { try { JSON.parse(x); return true; } catch (e) { return false } })(info.second_variation)) {
            this.second_variation = JSON.parse(info.second_variation);
            this.variant = 0;
            this.productt['second_variation'] = JSON.parse(info.second_variation);
            this.productt['second_variant'] = 0;
              for(let a=0; a < this.productt.second_variation.length; a++){
                // console.log('sadssdasdasdasdasdasda',JSON.parse(this.productt.second_variation[a].sub_category))
                this.productt.second_variation[a]['sub_category']= JSON.parse(this.productt.second_variation[a].sub_category);
                  if(this.productt.second_variation[a]['sub_category']){
                    console.log(' this.productt.second_variation[a]==>', this.productt.second_variation[a])
                    this.productt.second_variation[a]['sub_category'].forEach(element => {
                      element['quantity'] = 0;
                      element['id'] = this.id + '_' + element.en_title;
                      element['type'] = this.productt.second_variation[a].type;

                    });
                }
              }

              // console.log('sadssdasdasdasdasdasda', this.productt)
          } else {
            info.variations = [];
            this.productt['second_variation'] = [];
            this.variant = 1;
            this.productt['second_variant'] = 1;
          }
        } else {
          this.second_variation =[]
          this.second_variant = 1;
          this.productt['second_variation'] = [];
          this.productt['second_variant'] = 1;
        }

        if(this.productt.variations[0]){
          if(this.productt.variations[0]){
            this.productt.variations[0].items.forEach(element => {
              element['quantity'] = 0;
              element.id = this.id + '_' + element.title;
            });
          }
        }
        this.checkCartItems();
        if (info.images) {
          const images = JSON.parse(info.images);
          console.log('images======>>>', images);
          if (images[0]) {
            this.gallery.push(images[0]);
          }
          if (images[1]) {
            this.gallery.push(images[1]);
          }
          if (images[2]) {
            this.gallery.push(images[2]);
          }
          if (images[3]) {
            this.gallery.push(images[3]);
          }
          if (images[4]) {
            this.gallery.push(images[4]);
          }
          if (images[5]) {
            this.gallery.push(images[5]);
          }
        }
        this.getRelated();
      } else {
        this.util.toast('error', this.util.getString('Error'), this.util.getString('Something went wrong'));
      }

    }, error => {
      console.log(error);
      this.loaded = true;
      this.util.toast('error', this.util.getString('Error'), this.util.getString('Something went wrong'));
    });
  }

  onFav() {
    if (this.util.favIds.includes(this.id)) {
      console.log('remove this')
      this.util.removeFav(this.id);
      console.log('after removed', this.util.favIds);
      console.log('edit');
      const param = {
        id: localStorage.getItem('uid'),
        ids: this.util.favIds.join()
      };
      this.util.haveFav = true;
      console.log('parama', param);
      this.api.post('favourite/editList', param).subscribe((data: any) => {
        console.log('save response', data);
        if (data && data.status !== 200) {
          this.util.toast('error', this.util.getString('Error'), this.util.getString('Something went wrong'));
        }
      }, error => {
        console.log('error on save', error);
        this.util.toast('error', this.util.getString('Error'), this.util.getString('Something went wrong'));
      });
    } else {
      console.log('add new');
      this.util.setFav(this.id);
      console.log('after added', this.util.favIds);
      if (this.util.haveFav) {
        console.log('edit');
        const param = {
          id: localStorage.getItem('uid'),
          ids: this.util.favIds.join()
        };
        this.util.haveFav = true;
        console.log('parama', param)
        this.api.post('favourite/editList', param).subscribe((data: any) => {
          console.log('save response', data);
          if (data && data.status !== 200) {
            this.util.toast('error', this.util.getString('Error'), this.util.getString('Something went wrong'));
          }
        }, error => {
          console.log('error on save', error);
          this.util.toast('error', this.util.getString('Error'), this.util.getString('Something went wrong'));
        });
      } else {
        console.log('save');
        const param = {
          uid: localStorage.getItem('uid'),
          ids: this.util.favIds.join()
        };
        this.util.haveFav = true;
        console.log('parama', param);
        this.api.post('favourite/save', param).subscribe((data: any) => {
          console.log('save response', data);
          if (data && data.status !== 200) {
            this.util.toast('error', this.util.getString('Error'), this.util.getString('Something went wrong'));
          }
        }, error => {
          console.log('error on save', error);
          this.util.toast('error', this.util.getString('Error'), this.util.getString('Something went wrong'));
        });
      }
    }
  }

  openStore() {
    console.log('open store');

    const param: NavigationExtras = {
      queryParams: {
        id: this.storeId,
        name: this.storeName,
        type: "store"
      }
    };
    this.router.navigate(['stores-products'], param);
  }

  changes(index) {
    this.variant = index;
    this.cart.calcuate();
    this.productt['variant'] = this.variant;
  }

  // getRelated() {
  //   const param = {
  //     id: this.subId,
  //     limit: 1000,
  //     cid: localStorage.getItem('city')
  //   };
  //   this.related = [];
  //   this.dummyTopProducts = Array(5);
  //   this.subProductId = [];
  //   this.api.post('products/getRelated', param).subscribe((data: any) => {
  //     for(let i = 0; i < data.data.length; i++){
  //       this.parent = data.data[i]['parent_id'].split(',');
  //       for(let j = 0; j < this.parent.length; j++){
  //         if(this.parent[j] == this.selectedProduct  && this.parent[j] != 0){
  //           this.subProductId.push(data.data[i]);
  //           console.log("sub products",this.subProductId )
  //           // this.getSubQuanity(data.data[i].id);
  //           if (data.data[i].variations && data.data[i].size === '1' && data.data[i].variations !== '') {
  //             if (((x) => { try { JSON.parse(x); return true; } catch (e) { return false } })(data.data[i].status)) {
  //               this.variations = JSON.parse(data.data[i].variations);
  //               this.variant = 0;
  //               data.data[i]['variations'] = JSON.parse(data.data[i].variations);
  //               data.data[i]['variant'] = 0;
  //             } else {
  //               data.data[i].variations = [];
  //               data.data[i]['variations'] = [];
  //               this.variant = 1;
  //               data.data[i]['variant'] = 1;
  //             }
  //           } else {
  //             this.variations = [];
  //             this.variant = 1;
  //             this.productt['variations'] = [];
  //             this.productt['variant'] = 1;
  //           }
  //           this.checkCartItems();
  //         }   
  //       }
  //     }
  //     console.log("subproduct", this.subProductId);
  //     console.log('=>related=>', data);
  //     this.dummyTopProducts = [];
  //     if (data && data.status === 200 && data.data && data.data.length) {
  //       const products = data.data;
  //       this.relatedProduct = [];
  //       for(let i = 0; i< products.length; i++){
  //         if(products[i].parent_id == '0' || products[i].parent_id == ''){
  //           this.relatedProduct.push(products[i]);
  //         }
  //       }
  //       this.related = this.relatedProduct.filter(x => x.id !== this.id);
  //     }
  //   }, error => {
  //     console.log(error);
  //     this.dummyTopProducts = [];
  //   });
  // }
  getRelated() {
    const param = {
      id: this.productt.cate_id,
      limit: 1000,
      cid: localStorage.getItem('city')
    };
    this.related = [];
    this.dummyTopProducts = Array(5);
    this.api.post('products/getRelated', param).subscribe((data: any) => {
      console.log('=>related=>', data);
      this.dummyTopProducts = [];
      if (data && data.status === 200 && data.data && data.data.length) {
        const products = data.data;
        this.related = products.filter(x => x.id !== this.id && x.store_id == this.productt.store_id );
      }
    }, error => {
      console.log(error);
      this.dummyTopProducts = [];
    });
  }

  checkCartItems() {
    const item = this.cart.cart.filter(x => x.id === this.id);
    if (item && item.length) {
      this.quantiy = item[0].quantiy;
      if(this.productt.variations[0]){
        this.productt.variations[0].items.forEach(pageElement => {
          item[0].variations[0].items.forEach(cartElement => {
            if(pageElement.id == cartElement.id){
              pageElement.quantity = cartElement.quantity;
            }
          });
        });
      }

      if(this.productt.second_variation){
        this.productt.second_variation.forEach(pageElement => {
          pageElement.sub_category.forEach(elementinnerPage => {
           item[0].second_variation.forEach(cartElementout => {
            cartElementout.sub_category.forEach(element => {
             if(element.id == elementinnerPage.id){
              elementinnerPage.quantity = element.quantity;
             }
            });
   
          });
          });

        });
      }
    }
    console.log("this product after", this.productt, this.quantiy);
  }

  addToCart() {
    this.quantiy = 1;
    this.productt.quantiy = 1;
    this.cart.addItem(this.productt);
  }

  // addSubToCart(id) {
  //   this.subId = id;
  //   const param = {
  //     id: this.subId
  //   };
  //   this.api.post('products/getById', param).subscribe((data: any) => {
  //     console.log(data), "data";
  //     if (data && data.status === 200 && data.data && data.data.length) {
  //       const info = data.data[0];
  //       this.subProduct = info;
  //       this.subQuantity = 1;
  //       this.subProduct.quantiy = 1;
  //       console.log("sub quantity", this.subProduct.quantiy);
  //       this.cart.subAddItem(this.subProduct,id);
  //     }
  //   });
  // }

  // subAdd(id){
  //   this.subQuantity = this.getSubQuanity(id);
  //   this.subQuantity = this.subQuantity + 1;
  //   this.cart.subAddQuantity(this.subQuantity, id);
  // }

  // subRemove(id) {
  //   this.subQuantity = this.getSubQuanity(id);
  //   if (this.subQuantity === 1) {
  //     this.subQuantity = 0;
  //     this.cart.removeItem(id);
  //   } else {
  //     this.subQuantity = this.subQuantity - 1;
  //     this.cart.subAddQuantity(this.subQuantity, id);
  //   }
  // }

  add() {
    this.quantiy = this.quantiy + 1;
    this.cart.addQuantity(this.quantiy, this.id);
  }

  // removeChild(parentId){
  //   console.log(this.cart.cart.length, "cartlength");
  //   const cart = this.cart.cart;
  //   const cartlength = cart.length;
  //   for(let i = 0; i < cartlength; i++){  
  //     console.log(this.cart.cart.length, "cartlength inside" , i);
  //     console.log("this cart", this.cart.cart[i]);
  //     let parent_id = cart[i].parent_id.split(',');
  //     console.log("parentid",parent_id, "id", this.cart.cart[i].id );
  //     for(let j = 0; j < parent_id.length; j++ ){
  //       if(parent_id[j] == parentId){
  //         this.childrenId.push(cart[i].id);
  //       }
  //     }
  //   }
  //   this.cart.removeChild(this.childrenId);
  // }

  remove() {
    if (this.quantiy === 1) {
      if(this.productt.variations[0]){
        this.productt.variations[0].items.forEach(element => {
          element.quantity = 0;
        });
      }
      this.quantiy = 0;
      this.cart.removeItem(this.id);
      // this.removeChild(this.id);
    } else {
      this.quantiy = this.quantiy - 1;
      this.cart.addQuantity(this.quantiy, this.id);
    }
  }

  addAddOn(item, parent) {
    // this.parentId = id;
    // const param = {
    //   id: this.parentId
    // };
    console.log("item", item, parent);
    let id = item.id;
    this.productt.variations[0].items.forEach(element => {
      if(element.id == id){
        console.log("element id", element.id, id);
        element.quantity = element.quantity + 1;
        console.log(this.variations[0].items);
        this.cart.addAddOn(id, parent, element.quantity);
      }
    });
  }

  minusAddOn(item, parent) {
    // this.parentId = id;
    // const param = {
    //   id: this.parentId
    // };
    console.log("item", item, parent);
    let id = item.id;
    this.productt.variations[0].items.forEach(element => {
      if(element.id == id){
        console.log("element id", element.id, id);
        element.quantity = element.quantity - 1;
        console.log(this.variations[0].items);
        this.cart.addAddOn(id, parent, element.quantity);
      }
    });
  }
  
  getQuanity() {
    const data = this.cart.cart.filter(x => x.id === this.id);
    this.quantiy = data[0].quantiy;
    return data[0].quantiy;
  }

  getAddOnQuantity(id) {
    const data = this.cart.cart.filter(x => x.id === this.id);
    if(data.length > 0){
      if(this.productt.variations[0]){
        data[0].variations[0].items.forEach(cartElement => {
          if(id == cartElement.id){
            this.productt.variations[0].items.forEach(pageElement => {
              if(pageElement.id == id){
                pageElement.quantity = cartElement.quantity;
                this.elementQuanity =  pageElement.quantity;
              }
            });
          }
        });
      }
    }else{
      this.elementQuanity = 0;
    }
    return this.elementQuanity;
  }

  getSubQuanity(id) {
    const data = this.cart.cart.filter(x => x.id === id);
    console.log("getSubQuanity", data);
    let quantity = data[0].quantiy;
    return quantity;
  }

  ngOnInit(): void {
  }

  goToProductDetail(item) {
    this.id = item.id;
    this.name = '';
    this.loaded = false;
    this.getProduct();
  }


  scrollRighttopContent() {
    this.topContent.nativeElement.scrollLeft += 450;
  }

  scrollLefttopContent() {
    this.topContent.nativeElement.scrollLeft -= 450;
  }

  toggle(data, value){
    data['isOpen']=value
  }

addSubAddOn(item, parent ,type,event,index) {
  let id = item.id;
  if(type == 'radio'){
    let id = item.id;
    this.cart.addSubAddOn(id, parent,1, index ,type);
    
  }
  if(type == 'checkbox'){
    if(event.target.checked ){
      let id = item.id;
      this.cart.addSubAddOn(id, parent,1, index,type);
    }else{
      let id = item.id;
      this.cart.addSubAddOn(id, parent,0, index,type);
    }
  }
  this.checkCartItems();
}


/** default product**/


removeAllAdones(parent){
  parent.variations[0].items.forEach(element => {
      element.quantity = 0;
      this.cart.addAddOn('none', parent.id, element.quantity);
    
  });
  this.checkCartItems();
}
addRemoveSubAddonQty(item, parent ,type,event,index,opration) {
  console.log('item======addRemoveSubAddonQty=>',item)  
  let id = item.id;
  if(opration === 'add'){
    
    let quentity = item.quantity + 1;
    this.cart.addSubAddOn(id, parent,quentity, index,type);
    this.checkCartItems();
  }else{
    let quentity = item.quantity - 1;
    this.cart.addSubAddOn(id, parent,quentity, index,type);
    this.checkCartItems();
  }

  console.log('item======addRemoveSubAddonQty=fff>',item)
}

}
