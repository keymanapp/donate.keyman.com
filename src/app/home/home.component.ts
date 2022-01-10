import { ChangeDetectorRef, Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppModel } from '../app.model';
import { Currencies } from '../currencies';

@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  successMessage: string = '';
  errorMessage: string = '';
  receiptLink: string = '';

  model: AppModel = new AppModel('usd', 'single', 0);

  amounts: Array<string>;

  Currencies: Currencies;

  private stripe;

  constructor(private http: HttpClient, private changeDetectorRef: ChangeDetectorRef) {
    const self = this;
    this.Currencies = Currencies;
    let stripe_key = 'pk_test_qHey9utza7fQ4SoPdWhJdXcm';
    // let stripe_key = 'pk_live_xrVON4jadpeT4rDWMrLSl9fp';
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
        const apiURL = '/api/charge';

        self.successMessage = '';
        self.errorMessage = '';

        self.http.post(apiURL, postData, {
          headers: new HttpHeaders().set('Content-Type', 'application/json'),
          observe: 'response',
        }).subscribe(
          success => {
            // Handle result
            console.log('POST call successful value returned in body', success);
            self.successMessage = 'The transaction has been completed. Thank you for your donation!';
            self.receiptLink = success.body['receipt_url'];
            changeDetectorRef.detectChanges();
          },
          error => {
            console.log('POST call in error!');
            self.errorMessage = 'We are sorry, but your donation was not accepted: ' + error.statusText;
            changeDetectorRef.detectChanges();
          },
          () => {
            console.log('Post call finished');
          }
        );
      }
    });
  }
  updateAmounts() {
    if (this.model.frequency === 'monthly') {
      this.amounts = Currencies.currencies[this.model.currency].monthlyAmounts;
    } else {
      this.amounts = Currencies.currencies[this.model.currency].onceAmounts;
    }
  }

  amountForCard() {
    // console.log(this.model.paySelection);
    const multiplier = Currencies.isZeroDecimalCurrency(this.model.currency) ? 1 : 100;
    if (this.model.paySelection >= 0 && this.model.paySelection < 4) {
      return Number(this.amounts[this.model.paySelection]) * multiplier;
    }
    if (Number(this.model.payAmount) > 0) {
      return Number(this.model.payAmount) * multiplier;
    }
    return 2000;
  }

  clickRetry() {
    this.model.reset();
  }

  clickCard() {
    if(this.model.paySelection == 4 && this.amountForCard() < 500) {
      if(Currencies.isZeroDecimalCurrency(this.model.currency))
        this.errorMessage = 'The minimum donation is '+this.model.currency+' 500';
      else
        this.errorMessage = 'The minimum donation is '+this.model.currency+' 5.00';
      return false;
    }

    this.errorMessage = '';
    this.successMessage = '';

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
