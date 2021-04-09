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
import { Router } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { environment } from '../../../environments/environment';
import firebase from 'firebase/app';
import 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: any = '';
  password: any = '';
  loggedIn: boolean;
  otpSent: boolean = false;
  otpVerified: boolean = false;
  recaptchaVerifier;
  otpconfirmationResult: firebase.auth.ConfirmationResult;
  phoneNumber:string = "";
  confirmationResult:any;
  newPhoneNumber:string = "";
  newOtpNumber:any;
  selectedCountry:string = "";
  phoneNumberExist:boolean = false;
  userid:any;

  constructor(
    private router: Router,
    public util: UtilService,
    private api: ApiService,
    private navCtrl: Location
  ) {
    if (!firebase.apps.length) {
      firebase.initializeApp(environment.firebase);
    }else {
        firebase.app();
    }
  }

  ngOnInit(): void {
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  goToHome() {

    if (!this.email || !this.password) {
      this.util.toast('error', this.util.getString('Error'), this.util.getString('All Fields are required'));
      return false;
    }
    const emailfilter = /^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailfilter.test(this.email)) {
      this.util.toast('error', this.util.getString('Error'), this.util.getString('Please enter valid email'));
      return false;
    }

    const param = {
      email: this.email,
      password: this.password
    };
    this.util.start();
    this.api.post('users/login', param).subscribe((data: any) => {
      this.util.stop();
      console.log(data);
      if (data && data.status === 200) {
        if (data && data.data && data.data.type === 'user') {
          console.log("datastatus", data.data.status);
          if (data.data.status === '1') {
            localStorage.setItem('uid', data.data.id);
            this.util.userInfo = data.data;
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
              title: this.util.getString('Signed in successfully')
            });
            // this.router.navigate(['/home']);
            this.navCtrl.back();
          } else {
            console.log('not valid');
            Swal.fire({
              title: this.util.getString('Error'),
              text: this.util.getString('Your are blocked please contact administrator'),
              icon: 'error',
              showConfirmButton: true,
              showCancelButton: true,
              confirmButtonText: this.util.getString('Need Help?'),
              backdrop: false,
              background: 'white'
            }).then(status => {
              if (status && status.value) {
                localStorage.setItem('helpId', data.data.id);
                this.router.navigate(['inbox']);
              }
            });
          }
        } else {

          this.util.toast('error', this.util.getString('Error'), this.util.getString('Not valid user'));
          this.email = '';
          this.password = '';
        }
      } else if (data && data.status === 500) {
        this.util.toast('error', this.util.getString('Error'), data.data.message);

      } else {
        this.util.toast('error', this.util.getString('Error'), this.util.getString('Something went wrong'));

      }
    }, error => {
      console.log(error);
      this.util.stop();
      this.util.toast('error', this.util.getString('Error'), this.util.getString('Something went wrong'));
    });
  }

  reset() {
    console.log('reset password');
    this.router.navigate(['reset']);
  }

  async sendOTP() {
    this.util.start();
    if(this.newPhoneNumber != ''){
      if(this.newPhoneNumber.startsWith("0")){
        this.newPhoneNumber = this.newPhoneNumber.replace(/^0+/, '');
      }
      //  let concatphone = "91" + this.newPhoneNumber;
      let concatphone = "972" + this.newPhoneNumber;
      this.phoneNumber = concatphone;
      const orderParam = {
        phonenumber : concatphone
      };
      this.api.post("users/checkphone",orderParam).subscribe((data: any) => {
        this.util.stop();
        console.log("checkphone response", data);
        console.log(data);
        if (data && data.status === 200) {
          if (data && data.data[0] && data.data[0].type === 'user') {
            if (data.data[0].status === '1') {
              this.userid = data.data[0].id;
              if((localStorage.getItem("fuid") == "") ||(typeof localStorage.getItem("fuid") === undefined)){
                this.getOTP();
              }else{
                const fuid = localStorage.getItem("fuid");
                if(fuid == this.userid){
                  localStorage.setItem('uid', this.userid);
                  this.router.navigate(['']);
                }else{
                  this.getOTP();
                }
              }
              this.util.userInfo = data.data[0];
            } else {
              console.log('not valid');
              Swal.fire({
                title: this.util.getString('Error'),
                text: this.util.getString('please wait for admin to activate your account'),
                icon: 'error',
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: this.util.getString('Need Help?'),
                backdrop: false,
                background: 'white'
              }).then(status => {
                if (status && status.value) {
                  localStorage.setItem('helpId', data.data.id);
                  this.router.navigate(['inbox']);
                }else{
                  this.otpSent = false;
                  this.router.navigate(['/login']);
                }
              });
            }
          } else {
            this.util.toast('error',this.util.getString('Error'),this.util.getString('Not valid user'));
            this.email = '';
            this.password = '';
          }
        } else if (data && data.status === 500) {
          this.util.toast('error', this.util.getString('Error'), data.data);
        } else {
          this.util.toast('error', this.util.getString('Error'), this.util.getString('Something went wrong'));
        }
      }, error => {
        console.log(error);
        this.util.stop();
        this.util.toast('error', this.util.getString('Error'), this.util.getString('Something went wrong'));
      });
    }
    else{
      this.util.toast('error', this.util.getString('Error'), this.util.getString('Enter Your Number'));
    }
  }

  async getOTP(){
    // let concatphone = "+91" + this.newPhoneNumber;
    let concatphone = "+972" + this.newPhoneNumber;

    this.util.start();
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', { 'size': 'invisible' });
    firebase.auth().signInWithPhoneNumber(concatphone, this.recaptchaVerifier).then(data => {
      this.otpSent = true;
      this.otpconfirmationResult = data;
      this.util.stop();
      }).catch(err => {
      console.log(err);
      this.util.stop();
    });
  }

  otpNumber(event){
    this.newOtpNumber = event.target.value;
  }

  phoneNumberChange(event){
    this.newPhoneNumber = event.target.value;
    console.log(this.newPhoneNumber);
  }

  async verifyOTP() {
    let otpphone =  this.newOtpNumber;
    this.util.start();
    if(otpphone != ''){
      this.otpconfirmationResult.confirm(otpphone).then((data:object) => {
        console.log(data);
      if(data){
        console.log("phone number before send", this.phoneNumber);
        localStorage.setItem('uid', this.userid);
        localStorage.setItem('fuid', this.userid);
        const fcm = localStorage.getItem('fcm');
        if (fcm && fcm !== null && fcm !== 'null') {
          const updateParam = {
            id: this.userid,
            fcm_token: fcm
          };
          this.api.post('users/edit_profile', updateParam).subscribe((data: any) => {
            console.log('user info=>', data);
          }, error => {
            console.log(error);
          });
        }

        const favParam = {
          id: this.userid
        }
        this.api.post('favourite/getByUid', favParam).subscribe((data: any) => {
          console.log('fav data', data);
          if (data && data.status === 200 && data.data.length > 0) {
            this.util.haveFav = true;
            try {
              this.util.favIds = data.data[0].ids.split(',');
            } catch (error) {
              console.log('eroor', error);
            }
          } else {
            this.util.haveFav = false;
          }
        }, error => {
          this.util.haveFav = false;
          console.log('fav error', error);
        });
        this.router.navigate(['']);
        this.util.stop();
      }
      // You can redirect to other protected route.
      }).catch(err => {
        console.log(err);
        this.util.stop();
        this.util.toast('error', this.util.getString('Error'), this.util.getString('Enter a valid OTP'));
      })
    }
    else{
      this.util.toast('error', this.util.getString('Error'), this.util.getString('Enter the otp received in your given phone number'));
    }
  }

  // async presentAlert() {
  //   const alert = await this.alertController.create({
  //     header: 'Alert',
  //     message: 'Enter Your Number',
  //     mode:'ios',
  //     buttons: [
  //       {
  //         text: 'OK',
  //         role: 'ok',
  //         cssClass: 'primary',
  //         handler: (blah) => {
  //           console.log('Confirm Cancel: blah');
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }
  // async otpAlert() {
  //   const alert = await this.alertController.create({
  //     header: 'Alert',
  //     message: 'Enter the otp received in your given phone number',
  //     mode:'ios',
  //     buttons: [
  //       {
  //         text: 'OK',
  //         role: 'ok',
  //         cssClass: 'primary',
  //         handler: (blah) => {
  //           console.log('Confirm Cancel: blah');
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }

  // async otpErrorAlert() {
  //   const alert = await this.alertController.create({
  //     header: 'Alert',
  //     message: 'Enter a valid OTP',
  //     mode:'ios',
  //     buttons: [
  //       {
  //         text: 'OK',
  //         role: 'ok',
  //         cssClass: 'primary',
  //         handler: (blah) => {
  //           console.log('Confirm Cancel: blah');
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }

  // async doLogin(){
  //   const loading = await this.loadingController.create({
  //     message: 'Please wait...',
  //   });
  //   await loading.present();
  //   let name = (<HTMLInputElement>document.getElementById("username")).value;
  //   let email = (<HTMLInputElement>document.getElementById("useremail")).value;
  //   const requestdata = {'phone' : this.phoneNumber, 'name': name, 'email' : email}
  //   this.api.otplogin(requestdata).subscribe((response: any) => {
  //     if(response.msg == 'done'){
  //       localStorage.setItem('user_id', response.user_id);
    
  //           // this.events.publish('user_login', response.user_id);
  //           loading.dismiss();
  //           if (localStorage.getItem('cart_no')) {
  //             this.navCtrl.navigateBack('cart');
  //           }
  //           else {
  //             this.navCtrl.navigateRoot('home');
  //           }
  //     }
  //   })
  // }

}
