import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppModel } from './app.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  currencies = [ 'usd', 'aud', 'eur', 'gbp', 'krw', 'nzd', 'thb' ];

  currencySymbols = {
    'usd': '$',
    'aud': '$',
    'eur': '€',
    'gbp': '£',
    'krw': '₩',
    'nzd': '$',
    'thb': '฿',
  };

  model: AppModel = new AppModel('usd', 'single', 0);

  amounts: Array<string>;

  private stripe;

  constructor(private http: HttpClient) {
    const self = this;
    let stripe_key = 'pk_test_eM74cMSAfGXWvrLZnz7gCXuA';
    if ((<any>window).app_data) {
      this.model.currency = (<any>window).app_data.currency;
      stripe_key = (<any>window).app_data.stripe_key;
    }
    this.updateAmounts();
    this.stripe = (<any>window).StripeCheckout.configure({
      key: stripe_key,
      image: 'https://keyman.com/cdn/dev/img/icon1.png',
      locale: 'auto',
      billingAddress: true,
      token: function(token, tokenData) {
        console.log('got token', token, 'data ', tokenData);
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        const postData = {
          'token': token,
          'amount': self.amountForCard(),
          'currency': self.model.currency,
          'data': tokenData,
        };
        const apiURL = 'https://donate.keyman.com/api/charge';

        self.http.post(apiURL, postData, {
          headers: new HttpHeaders().set('Content-Type', 'application/json'),
          observe: 'response', // TODO How do we catch 4xx errors?
        }).subscribe(
          success => {
            // Handle result
            console.log('POST call successful value returned in body', success);
          },
          error => {
            this.errors = error;
            console.log('POST call in error!', error);
            alert(error);
          },
          () => {
            console.log('Post call finished');
          }
        );
      }
    });
  }
  updateAmounts() {
    const onceAmounts = {
      'usd': ['20', '50', '100', '200'],
      'aud': ['30', '60', '100', '200'],
      'eur': ['15', '40', '80', '150'],
      'gbp': ['15', '30', '60', '100'],
      'nzd': ['50', '100', '200', '500'],
      'thb': ['500', '1000', '2000', '5000'],
      'krw': ['20000', '50000', '100000', '200000'],
    };
    const monthlyAmounts = {
      'usd': ['10', '20', '50', '5'],
      'aud': ['10', '20', '50', '5'],
      'eur': ['10', '50', '100', '5'],
      'gbp': ['5', '20', '40', '3'],
      'nzd': ['10', '20', '50', '5'],
      'thb': ['200', '400', '500', '100'],
      'krw': ['10000', '20000', '50000', '5000'],
    };
    if (this.model.frequency === 'monthly') {
      this.amounts = monthlyAmounts[this.model.currency];
    } else {
      this.amounts = onceAmounts[this.model.currency];
    }
  }

  isZeroDecimalCurrency(currency: string) {
    // TODO Make this check for value in array if we ever support more than KRW.
    // See https://stripe.com/docs/currencies
    return currency === 'krw' ? true : false;
  }

  amountForCard() {
    // console.log(this.model.paySelection);
    const multiplier = this.isZeroDecimalCurrency(this.model.currency) ? 1 : 100;
    if (this.model.paySelection >= 0 && this.model.paySelection < 4) {
      return Number(this.amounts[this.model.paySelection]) * multiplier;
    }
    if (Number(this.model.payAmount) > 0) {
      return Number(this.model.payAmount) * multiplier;
    }
    return 2000;
  }

  // clickTest() {
  //   // this.phase = this.phase == 'donate' ? 'final' : 'donate';
  //   // this.result = 'fail';
  //   const self = this;
  //   const token = {
  //     'card': {
  //         'address_city': null,
  //         'address_country': null,
  //         'address_line1': null,
  //         'address_line1_check': null,
  //         'address_line2': null,
  //         'address_state': null,
  //         'address_zip': null,
  //         'address_zip_check': null,
  //         'brand': 'Visa',
  //         'country': 'US',
  //         'cvc_check': 'pass',
  //         'dynamic_last4': null,
  //         'exp_month': 12,
  //         'exp_year': 2018,
  //         'funding': 'credit',
  //         'id': 'card_1BG3HgEPhVx1rk67aBaUHrbN',
  //         'last4': '4242',
  //         'metadata': {},
  //         'name': 'test_20_one@example.com',
  //         'object': 'card',
  //         'tokenization_method': null
  //     },
  //     'client_ip': '171.4.234.41',
  //     'created': 1508754952,
  //     'email': 'test_20_one@example.com',
  //     'id': 'tok_1BG3HgEPhVx1rk67roclsirn',
  //     'livemode': false,
  //     'object': 'token',
  //     'type': 'card',
  //     'used': false
  //   };
  //   const postData = {
  //     'token': token,
  //     'amount': self.amountForCard(),
  //     'currency': self.model.currency,
  //     'data': {},
  //   };
  //   self.http.post('http://localhost:4567/charge/angular', postData, {
  //     headers: new HttpHeaders().set('Content-Type', 'application/json'),
  //     observe: 'response', // TODO How do we catch 4xx errors?
  //   }).subscribe(
  //     data => {
  //       console.log('Posting data from angular');
  //       // TODO On fail also display 'what we know' about the error.
  //       console.log(data.status, data.body);
  //       self.model.phase = 'final';
  //       if (data.status === 201) {
  //         self.model.result = 'success';
  //       } else {
  //         self.model.result = 'fail';
  //       }
  //     },
  //     error => {
  //       self.model.phase = 'final';
  //       self.model.result = 'fail';
  //       self.model.resultCode = error.status;
  //
  //       const errorInfo = JSON.parse(error.error);
  //       self.model.resultMessage = errorInfo.message;
  //
  //       console.log(errorInfo);
  //     }
  //   );
  //   return false;
  // }

  clickRetry() {
    this.model.reset();
  }

  clickCard() {
    this.stripe.open({
      name: 'Keyman',
      description: 'Donation to Keyman',
      amount: this.amountForCard(),
      currency: this.model.currency,
      allowRememberMe: false
    });
    return false;
  }

  clickPaypal() {

  }

}
