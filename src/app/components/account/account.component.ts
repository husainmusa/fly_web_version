/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : ionic 5 groceryee app
  Created : 10-Sep-2020
  This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2020-present initappz.
*/
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';
import { ApiService } from 'src/app/services/api.service';
import { ModalDirective } from 'angular-bootstrap-md';
import Swal from 'sweetalert2';
declare var google;
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  // addressModal
  @ViewChild('addressModal') public addressModal: ModalDirective;
  @ViewChild('map', { static: true }) mapEle: ElementRef;
  currentDiv: any;
  fname: any;
  lname: any;
  mobile: any;
  email: any;
  map: any;
  profile: any;
  myaddress: any[] = [];

  newAddress: boolean;
  latitude: any;
  longitude: any;
  lat: any;
  lng: any;
  address: any = '';
  house: any = '';
  landmark: any = '';
  watchIdAccount:any;
  title: any = 'home';
  pincode: any = '';
  id: any;
  marker: any;
  dragged:any = false;
  constructor(
    private router: Router,
    public util: UtilService,
    public api: ApiService) {
    this.currentDiv = 1;
    console.log(this.util.userInfo);
    if (this.util && this.util.userInfo) {
      const info = this.util.userInfo;
      this.fname = info.first_name;
      this.lname = info.last_name;
      this.mobile = info.mobile;
      this.email = info.email;
      this.profile = info.cover;
    } else {
      this.getProfile();
    }
  }

  ngOnInit(): void {
  }

  showPosition(position) {
    this.latitude =  position.coords.latitude;
    this.longitude =  position.coords.longitude;
  }

  ngAfterViewInit(){
    var mapOptions = {
      center:{lat:31.92923,lng:34.86563},
      zoom:15
    }
    this.map = new google.maps.Map(document.getElementById("map"),mapOptions);
    // navigator.permissions &&
    // navigator.permissions.query({name: 'geolocation'}).then(function(PermissionStatus) {
    //   if('granted' === PermissionStatus.state) {
    //       // navigator.geolocation.getCurrentPosition(function(geoposition) {
    //       //     console.log(geoposition) 
    //       // })
    //   }else{
    //     window.alert("Please enable location ");
    //   }
    // })
    if (navigator.geolocation) {
      this.watchIdAccount = navigator.geolocation.watchPosition((res) =>{
        console.log("latlng", res.coords.latitude);
        this.latitude = res.coords.latitude;
        this.longitude = res.coords.longitude;
        const geocoder = new google.maps.Geocoder();
        this.geocodeLatLng(geocoder, this.map);
        if(!this.dragged){
          var gps = new google.maps.LatLng(this.latitude, this.longitude);
          if(this.marker == null){
            this.marker = new google.maps.Marker({
              position:gps,
              map:this.map,
              draggable: true,
              animation: google.maps.Animation.DROP,
              title:'my position'
            });
          }else{
            this.marker.setPosition(gps);
          }
          this.map.panTo(gps);
        }
        google.maps.event.addListener(this.marker, "dragend",  () => {
          console.log("latitudelongitude before", this.latitude, this.longitude);
          this.map.panTo(this.marker.getPosition());
          this.dragged = true;
          console.log("dragged");
          this.latitude = this.map.center.lat();
          this.longitude = this.map.center.lng();
          console.log("latitudelongitude after", this.latitude, this.longitude);
          const geocoder = new google.maps.Geocoder();
          this.geocodeLatLng(geocoder, this.map);
        });
      });
    }else {
      window.alert("Please enable location ");
    }
  }

  ngOnDestroy() {
    navigator.geolocation.clearWatch(this.watchIdAccount);
  }

  geocodeLatLng(
    geocoder: google.maps.Geocoder,
    map: google.maps.Map
  ) {
    // const input = (document.getElementById("latlng") as HTMLInputElement).value;
    // const latlngStr = input.split(",", 2);
    const latlng = {
      lat: parseFloat(this.latitude),
      lng: parseFloat(this.longitude),
    };
    geocoder.geocode(
      { location: latlng },
      (
        results: google.maps.GeocoderResult[],
        status: google.maps.GeocoderStatus
      ) => {
        if (status === "OK") {
          if (results[0]) {
            map.setZoom(15);
            // const marker = new google.maps.Marker({
            //   position: latlng,
            //   map: map,
            // });
            console.log("physical address",results[0].formatted_address);
            this.address = results[0].formatted_address;
            // infowindow.open(map, marker);
          } else {
            window.alert("No results found");
          }
        } else {
          window.alert("Geocoder failed due to: " + status);
        }
      }
    );
  }

  goToOrder() {
    this.router.navigate(['/orders']);
  }

  goToAddress() {
    this.currentDiv = 2;
    this.getAddress();
  }

  getAddress() {
    const param = {
      id: localStorage.getItem('uid')
    };
    this.myaddress = [];
    this.util.start();
    this.api.post('address/getByUid', param).subscribe((data: any) => {
      console.log(data);
      this.util.stop();
      if (data && data.status === 200 && data.data.length) {
        this.myaddress = data.data;
      }
    }, error => {
      console.log(error);
      this.util.stop();
      this.util.toast('error', this.util.getString('Error'), this.util.getString('Something went wrong'));
    });
  }

  goToEditProfile() {
    this.router.navigate(['/edit-profile']);
  }

  goToPayment() {
    this.router.navigate(['/payment-method']);
  }

  openProfile() {
    this.currentDiv = 1;
  }

  logout() {
    const city = localStorage.getItem('city');
    localStorage.clear();
    this.util.userInfo = null;
    localStorage.setItem('city', city);
    this.router.navigate(['']);
  }

  reset() {
    this.router.navigate(['reset']);
  }

  update() {
    if (!this.fname || this.fname === '' || !this.lname || this.lname === '') {
      this.util.toast('error', this.util.getString('Error'), 'All Fields are required');
      return false;
    }
    const param = {
      first_name: this.fname,
      last_name: this.lname,
      email: this.email,
      mobile: this.mobile,
      id: localStorage.getItem('uid'),
      cover: this.profile
    };
    this.util.start();
    this.api.post('users/edit_profile', param).subscribe((data: any) => {
      this.util.stop();
      console.log(data);
      this.getProfile();
    }, error => {
      this.util.stop();
      console.log(error);
    });
  }


  getProfile() {
    const param = {
      id: localStorage.getItem('uid')
    };
    this.util.start();
    this.api.post('users/getById', param).subscribe((data: any) => {
      this.util.stop();
      console.log('user info=>', data);
      if (data && data.status === 200 && data.data && data.data.length) {
        const info = data.data[0];
        this.util.userInfo = info;
        this.fname = info.first_name;
        this.lname = info.last_name;
        this.mobile = info.mobile;
        this.email = info.email;
      }
    }, error => {
      console.log(error);
      this.util.stop();
    });
  }

  updateAddress(info) {
    console.log(info);
    this.newAddress = false;
    this.id = info.id;
    this.address = info.address;
    this.pincode = info.pincode;
    this.house = info.house;
    this.landmark = info.landmark;
    this.lat = info.lat;
    this.lng = info.lng;
    this.title = info.title;
    this.addressModal.show();
  }

  actionAddress() {

    if (this.newAddress) {
      console.log('new address');
      if (this.address === '' || this.landmark === '' || this.house === '' || this.pincode === '' || this.title === '') {
        this.util.toast('error', this.util.getString('Error'), 'All Fields are required');
        return false;
      }
      if (!this.lat || this.lat === '' || !this.lng || this.lng === '') {
        this.addressModal.hide();
        const geocoder = new google.maps.Geocoder;
        geocoder.geocode({ address: this.house + ' ' + this.landmark + ' ' + this.address + ' ' + this.pincode }, (results, status) => {
          console.log(results, status);
          if (status === 'OK' && results && results.length) {
            this.lat = results[0].geometry.location.lat();
            this.lng = results[0].geometry.location.lng();
            console.log('----->', this.lat, this.lng);
            console.log('call api');
            this.util.start();
            const param = {
              uid: localStorage.getItem('uid'),
              address: this.address,
              lat: this.lat,
              lng: this.lng,
              title: this.title,
              house: this.house,
              landmark: this.landmark,
              pincode: this.pincode
            };
            this.api.post('address/save', param).subscribe((data: any) => {
              this.util.stop();
              this.landmark = '';
              this.lat = '';
              this.lng = '';
              this.title = '';
              this.house = '';
              this.pincode = '';
              this.address = '';
              if (data && data.status === 200) {
                // this.navCtrl.back();
                this.getAddress();
                // this.util.showToast('Address added', 'success', 'bottom');
                const Toast = Swal.mixin({
                  toast: true,
                  position: 'bottom-end',
                  showConfirmButton: false,
                  timer: 3000,
                  timerProgressBar: true,
                  onOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer);
                    toast.addEventListener('mouseleave', Swal.resumeTimer);
                  }
                });

                Toast.fire({
                  icon: 'success',
                  title: 'Address added'
                });
              } else {
                this.util.toast('error', this.util.getString('Error'), this.util.getString('Something went wrong'));
              }
            }, error => {
              console.log(error);
              this.util.stop();
              this.util.toast('error', this.util.getString('Error'), this.util.getString('Something went wrong'));
            });
          } else {
            this.util.toast('error', this.util.getString('Error'), this.util.getString('Something went wrong'));
            return false;
          }
        });
      }
    } else {
      console.log('update address');
      if (this.address === '' || this.landmark === '' || this.house === '' || this.pincode === '' || this.title === '') {
        this.util.toast('error', this.util.getString('Error'), 'All Fields are required');
        return false;
      }
      this.addressModal.hide();
      const geocoder = new google.maps.Geocoder;
      geocoder.geocode({ address: this.house + ' ' + this.landmark + ' ' + this.address + ' ' + this.pincode }, (results, status) => {
        console.log(results, status);
        if (status === 'OK' && results && results.length) {
          this.lat = results[0].geometry.location.lat();
          this.lng = results[0].geometry.location.lng();
          console.log('----->', this.lat, this.lng);
          console.log('call api');
          this.util.start();
          const param = {
            uid: localStorage.getItem('uid'),
            address: this.address,
            lat: this.lat,
            lng: this.lng,
            title: this.title,
            house: this.house,
            landmark: this.landmark,
            pincode: this.pincode,
            id: this.id
          };
          this.api.post('address/editList', param).subscribe((data: any) => {
            this.util.stop();
            this.landmark = '';
            this.lat = '';
            this.lng = '';
            this.title = '';
            this.house = '';
            this.pincode = '';
            this.address = '';
            if (data && data.status === 200) {
              // this.navCtrl.back();
              this.getAddress();
              // this.util.showToast('Address added', 'success', 'bottom');
              const Toast = Swal.mixin({
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                onOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer);
                  toast.addEventListener('mouseleave', Swal.resumeTimer);
                }
              });

              Toast.fire({
                icon: 'success',
                title: 'Address added'
              });
            } else {
              this.util.toast('error', this.util.getString('Error'), this.util.getString('Something went wrong'));
            }
          }, error => {
            console.log(error);
            this.util.stop();
            this.util.toast('error', this.util.getString('Error'), this.util.getString('Something went wrong'));
          });
        } else {
          this.util.toast('error', this.util.getString('Error'), this.util.getString('Something went wrong'));
          return false;
        }
      });
    }
  }

  deleteAddress(item) {
    console.log(item);
    Swal.fire({
      title: 'Are you sure',
      text: 'to delete this address',
      icon: 'error',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      backdrop: false,
      background: 'white'
    }).then(status => {
      if (status && status.value) {
        console.log('delete');
        const param = {
          id: item.id
        };
        this.util.start();
        this.api.post('address/deleteList', param).subscribe(info => {
          console.log(info);
          this.util.stop();
          this.getAddress();
        }, error => {
          console.log(error);
          this.util.stop();
          this.util.toast('error', 'Erro', 'Something went wrong');
        });
      }
    });
  }

  addNewAddress() {
    this.newAddress = true;
    this.landmark = '';
    this.lat = '';
    this.lng = '';
    this.title = '';
    this.house = '';
    this.pincode = '';
    // this.address = '';
    this.id = '';
    this.addressModal.show();
  }

  goChat() {
    this.router.navigate(['chats']);
  }

  preview_banner(files) {

    // console.log('fle', files);
    // this.banner_to_upload = [];
    // if (files.length === 0)
    //   return;

    // var mimeType = files[0].type;
    // if (mimeType.match(/image\/*/) == null) {
    //   return;
    // }
    // this.banner_to_upload = files;
    // this.uploadImage();
    console.log('fle', files);
    if (files.length === 0) {
      return;
    }
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    if (files) {
      console.log('ok');
      this.util.start();
      this.api.uploadFile(files).subscribe((data: any) => {
        console.log('==>>', data);
        if (data && data.status === 200 && data.data) {
          this.profile = data.data;
          const param = {
            id: localStorage.getItem('uid'),
            cover: this.profile
          };
          this.api.post('users/edit_profile', param).subscribe((data: any) => {
            this.util.stop();
            console.log(data);
            this.getProfile();
          }, error => {
            this.util.stop();
            console.log(error);
          });
        } else {
          this.util.stop();
        }
      }, err => {
        console.log(err);
        this.util.stop();
      });
    } else {
      console.log('no');
    }
  }
}
