/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : ionic 5 groceryee app
  Created : 10-Sep-2020
  This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2020-present initappz.
*/
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UtilService } from 'src/app/services/util.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { ModalDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @ViewChild('frame') public frame: ModalDirective;
  fname: any = '';
  lname: any = '';
  mobile: any = '';
  gender: any = '1';
  email: any = '';
  password: any = '';
  loggedIn: boolean;
  check: boolean;
  resendCode: boolean;
  textCode: any = '';
  umobile: any;
  id: any;
  userCode: any = '';
  uid: any;

  cc: any = '';
  ccCode: any = '';
  countries: any[] = [];
  dummy: any[] = [];
  constructor(
    private router: Router,
    private api: ApiService,
    public util: UtilService) {
    this.dummy = this.util.countrys;
  }

  phoneNumberChange(event){
    this.mobile = event.target.value;
    console.log(this.mobile, "mobile");
  }

  ngOnInit(): void {
  }

  selectedCC(item) {
    this.countries = [];
    console.log(item);
    this.cc = '+' + item.dialling_code + ' ' + item.country_name;
    this.ccCode = item.dialling_code;
  }

  onCountryInput(events) {
    console.log(events);
    if (events !== '') {
      this.countries = this.dummy.filter((item) => {
        return item.country_name.toLowerCase().indexOf(events.toLowerCase()) > -1;
      });
    } else {
      this.countries = [];
    }
  }

  // sendOTP() {
  //   console.log('uid-->>', this.uid);
  //   this.umobile = '+' + this.ccCode + this.mobile;
  //   console.log(this.umobile);
  //   const message = this.util.getString('Your Grocery app verification code : ');
  //   const param = {
  //     msg: message,
  //     to: this.umobile
  //   };
  //   console.log(param);
  //   this.util.start();
  //   this.api.post('users/twilloMessage', param).subscribe((data: any) => {
  //     console.log(data);
  //     this.id = data.data.id;
  //     this.util.stop();
  //   }, error => {
  //     console.log(error);
  //     this.util.stop();
  //     this.util.toast('error', this.util.getString('Error'), this.util.getString('Something went wrong'));
  //   });
  // }

  // continue() {
  //   console.log(this.userCode);
  //   console.log('uid-->>', this.uid);
  //   if (this.userCode === '' || !this.userCode) {
  //     this.util.toast('error', this.util.getString('Error'), this.util.getString('Not valid code'));
  //     return false;
  //   }
  //   if (this.userCode) {
  //     const param = {
  //       id: this.id,
  //       otp: this.userCode
  //     };
  //     this.util.start();
  //     this.api.post('users/verifyOTP', param).subscribe((data: any) => {
  //       console.log(data);
  //       if (data && data.status === 200) {
  //         const params = {
  //           status: 1,
  //           id: this.uid
  //         };
  //         this.api.post('users/edit_profile', params).subscribe((data: any) => {
  //           this.util.stop();
  //           console.log(data);
  //           localStorage.setItem('uid', this.uid);
  //           const Toast = Swal.mixin({
  //             toast: true,
  //             position: 'bottom-end',
  //             showConfirmButton: false,
  //             timer: 3000,
  //             timerProgressBar: true,
  //             onOpen: (toast) => {
  //               toast.addEventListener('mouseenter', Swal.stopTimer);
  //               toast.addEventListener('mouseleave', Swal.resumeTimer);
  //             }
  //           });

  //           Toast.fire({
  //             icon: 'success',
  //             title: this.util.getString('Signed up successfully')
  //           });
  //           this.router.navigate(['/home']);
  //         }, error => {
  //           this.util.stop();
  //           console.log(error);
  //           this.util.toast('error', this.util.getString('Error'), this.util.getString('Something went wrong'));
  //         });
  //       } else {
  //         this.util.stop();
  //         if (data && data.status === 500 && data.data && data.data.message) {
  //           // this.util.errorToast(data.data.message);
  //           this.util.toast('error', this.util.getString('Error'), data.data.message);
  //           return false;
  //         }
  //         this.util.toast('error', this.util.getString('Error'), this.util.getString('Something went wrong'));
  //         return false;
  //       }
  //     }, error => {
  //       this.util.stop();
  //       console.log(error);
  //       this.util.toast('error', this.util.getString('Error'), this.util.getString('Something went wrong'));
  //     });
  //   } else {
  //     this.util.toast('error', this.util.getString('Error'), this.util.getString('Not valid code'));
  //     return false;
  //   }
  // }

  // goToHome() {
  //   if (!this.fname || !this.lname || !this.mobile || !this.email || !this.password || this.ccCode === '' || !this.ccCode) {
  //     this.util.toast('error', this.util.getString('Error'), this.util.getString('All Fields are required'));
  //     return false;
  //   }
  //   const emailfilter = /^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/;
  //   if (!emailfilter.test(this.email)) {
  //     this.util.toast('error', this.util.getString('Error'), this.util.getString('Please enter valid email'));
  //     return false;
  //   }

  //   const param = {
  //     first_name: this.fname,
  //     last_name: this.lname,
  //     email: this.email,
  //     password: this.password,
  //     gender: this.gender,
  //     fcm_token: localStorage.getItem('fcm') ? localStorage.getItem('fcm') : 'NA',
  //     type: 'user',
  //     lat: '',
  //     lng: '',
  //     cover: 'NA',
  //     mobile: this.ccCode + this.mobile,
  //     status: this.util.twillo === '1' ? 0 : 1,
  //     verified: 0,
  //     others: 1,
  //     date: moment().format('YYYY-MM-DD'),
  //     stripe_key: ''
  //   };
  //   this.util.start();
  //   this.api.post('users/registerUser', param).subscribe((data: any) => {
  //     this.util.stop();
  //     console.log(data);
  //     if (data && data.status === 200) {
  //       if (this.util.twillo === '1') {
  //         this.uid = data.data.id;
  //         this.sendOTP();
  //         this.frame.show();
  //         setTimeout(() => {
  //           this.resendCode = true;
  //         }, 30000);
  //       } else {
  //         localStorage.setItem('uid', data.data.id);
  //         const Toast = Swal.mixin({
  //           toast: true,
  //           position: 'bottom-end',
  //           showConfirmButton: false,
  //           timer: 3000,
  //           timerProgressBar: true,
  //           onOpen: (toast) => {
  //             toast.addEventListener('mouseenter', Swal.stopTimer);
  //             toast.addEventListener('mouseleave', Swal.resumeTimer);
  //           }
  //         });

  //         Toast.fire({
  //           icon: 'success',
  //           title: this.util.getString('Signed up successfully')
  //         });
  //         this.sendVerification(this.email, this.api.baseUrl + 'users/verify?uid=' + data.data.id);
  //         this.router.navigate(['/home']);
  //       }
  //     } else if (data && data.status === 500) {
  //       this.util.toast('error', this.util.getString('Error'), data.data.message);
  //     } else {
  //       this.util.toast('error', this.util.getString('Error'), this.util.getString('Something went wrong'));
  //     }
  //   }, error => {
  //     console.log(error);
  //     this.util.stop();
  //     this.util.toast('error', this.util.getString('Error'), this.util.getString('Something went wrong'));
  //   });
  // }

  sendVerification(mail, link) {
    const param = {
      email: mail,
      url: link
    };

    this.api.post('users/sendVerificationMail', param).subscribe((data) => {
      console.log('mail', data);
    }, error => {
      console.log(error);
    });
  }

  login() {
    // console.log('login');
    // if (!this.check) {
    //   this.util.toast(this.util.getString('Please accept terms and conditions'), 'dark', 'bottom');
    //   return false;
    // }

    if (!this.fname || !this.lname || !this.mobile ) {
      this.util.toast('error', this.util.getString('Error'), this.util.getString('All Fields are required'));
      return false;
    }

    // const emailfilter = /^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/;
    // if (!emailfilter.test(this.email)) {
    //   this.util.showToast(this.util.getString('Please enter valid email'), 'dark', 'bottom');
    //   return false;
    // }
    // console.log(typeof(this.mobile, "mobile"));
    // console.log("mobile number", this.mobile);
    // this.mobile = parseInt(this.mobile);
    // this.mobile = String(this.mobile);
    // console.log("mobile number after", this.mobile);
    // if(this.mobile != ''){
    //   if(this.mobile.startsWith("0") == true){
    //     this.mobile = this.mobile.replace(/^0+/, '');
    //   }
    // }
    const param = {
      first_name: this.fname,
      last_name: this.lname,
      email: "",
      password: "",
      gender: "",
      fcm_token: localStorage.getItem('fcm') ? localStorage.getItem('fcm') : 'NA',
      type: 'user',
      lat: '',
      lng: '',
      cover: 'NA',
      mobile: '972' + this.mobile,
      status: this.util.twillo === '1' ? 0 : 1,
      verified: 0,
      others: 1,
      date: moment().format('YYYY-MM-DD'),
      stripe_key: ''
    }

    console.log('param', param);
    this.loggedIn = true;
    this.api.post('users/registerMobileUser', param).subscribe((data: any) => {
      this.loggedIn = false;
      console.log(data);
      if (data && data.status === 200) {
        this.util.userInfo = data.data;
        this.router.navigate(['/login']);
      } else if (data && data.status === 500) {
        this.util.toast('error', this.util.getString('Error'), data.data.message);
      } else {
        this.util.toast('error', this.util.getString('Error'), this.util.getString('Something went wrong'));
      }
    }, error => {
      console.log(error);
      this.loggedIn = false;
      this.util.toast('error', this.util.getString('Error'), this.util.getString('Something went wrong'));
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  // onOtpChange(event) {
  //   console.log(event);
  //   this.userCode = event;
  // }

  // resend() {
  //   this.sendOTP();
  // }
}
