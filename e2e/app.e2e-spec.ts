import { AppPage } from './app.po';
import { browser, by, element } from 'protractor';

describe('Donate Keyman', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('Verify page is up with text', () => {
    page.navigateTo();
    expect(page.getTitle()).toEqual('Donate now');
  });

  it('Make a donation', () => {
    page.navigateTo();
    var donateTwenty = element(by.className('btn-lg btn-secondary amount-button amount-control'));
    var donate = element(by.className('col cc-button'));
    // Select twenty to donate
    donateTwenty.click();
    // Click donate
    donate.click();
    //Todo: Find input for email, send test email
    var email = element(by.model('email'));
    email.sendKeys('test@test.com');
    // paymentInfo.click();

    expect(email.isPresent());
  });
});
