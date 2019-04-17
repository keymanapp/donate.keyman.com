import { AppPage } from './app.po';
import { browser, by, element } from 'protractor';

describe('Donate Keyman', () => {
  const page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('Verify page is up with text', () => {
    page.navigateTo();
    expect(page.getTitle()).toEqual('Donate now');
  });

  it('Make a $20 donation', () => {
    page.navigateTo();
    const donateTwenty = element(by.className('btn-lg btn-secondary amount-button amount-control'));
    const donate = element(by.className('col cc-button'));
    // Select twenty to donate
    donateTwenty.click();
    // Click donate
    donate.click();
    // Expecting form. No way to reference it
    expect(donateTwenty.isPresent());
  });
  it('Make a $50 donation', () => {
    page.navigateTo();
    const donateFifty = element(by.css('label[for="pay-1"]'));
    const donate = element(by.className('col cc-button'));
    // Select twenty to donate
    donateFifty.click();
    // Click donate
    donate.click();
    // Expecting form. No way to reference it
    expect(donateFifty.isPresent());
  });
  it('Make a $100 donation', () => {
    page.navigateTo();
    const donateHundred = element(by.css('label[for="pay-2"]'));
    const donate = element(by.className('col cc-button'));
    // Select twenty to donate
    donateHundred.click();
    // Click donate
    donate.click();
    // Expecting form. No way to reference it
    expect(donateHundred.isPresent());
  });
  it('Make a $200 donation', () => {
    page.navigateTo();
    const donateTwoHundred = element(by.css('label[for="pay-3"]'));
    const donate = element(by.className('col cc-button'));
    // Select twenty to donate
    donateTwoHundred.click();
    // Click donate
    donate.click();
    // Expecting form. No way to reference it
    expect(donateTwoHundred.isPresent());
  });
  it('Make a custom donation', () => {
    page.navigateTo();
    const donateCustom = element(by.css('input[name="pay_amount"]'));
    const donate = element(by.className('col cc-button'));
    // Select twenty to donate
    donateCustom.click();
    donateCustom.sendKeys('1234');
    // Click donate
    donate.click();
    // Expecting form. No way to reference it
    expect(donateCustom.isPresent());
  });
  it('Select usd currency' , () => {
    page.navigateTo();
    const currencyDropdown = element(by.cssContainingText('option', 'usd'));
    const donate = element(by.className('col cc-button'));
    // Select twenty to donate
    currencyDropdown.click();
    // Click donate
    donate.click();
    // Expecting form. No way to reference it
    expect(currencyDropdown.isPresent());
  });
  it('Select aud currency' , () => {
    page.navigateTo();
    const currencyDropdown = element(by.cssContainingText('option', 'aud'));
    const donate = element(by.className('col cc-button'));
    // Select twenty to donate
    currencyDropdown.click();
    // Click donate
    donate.click();
    // Expecting form. No way to reference it
    expect(currencyDropdown.isPresent());
  });
  it('Select eur currency' , () => {
    page.navigateTo();
    const currencyDropdown = element(by.cssContainingText('option', 'eur'));
    const donate = element(by.className('col cc-button'));
    // Select twenty to donate
    currencyDropdown.click();
    // Click donate
    donate.click();
    // Expecting form. No way to reference it
    expect(currencyDropdown.isPresent());
  });
  it('Select gbp currency' , () => {
    page.navigateTo();
    const currencyDropdown = element(by.cssContainingText('option', 'gbp'));
    const donate = element(by.className('col cc-button'));
    // Select twenty to donate
    currencyDropdown.click();
    // Click donate
    donate.click();
    // Expecting form. No way to reference it
    expect(currencyDropdown.isPresent());
  });
  it('Select krw currency' , () => {
    page.navigateTo();
    const currencyDropdown = element(by.cssContainingText('option', 'krw'));
    const donate = element(by.className('col cc-button'));
    // Select twenty to donate
    currencyDropdown.click();
    // Click donate
    donate.click();
    // Expecting form. No way to reference it
    expect(currencyDropdown.isPresent());
  });
  it('Select nzd currency' , () => {
    page.navigateTo();
    const currencyDropdown = element(by.cssContainingText('option', 'nzd'));
    const donate = element(by.className('col cc-button'));
    // Select twenty to donate
    currencyDropdown.click();
    // Click donate
    donate.click();
    // Expecting form. No way to reference it
    expect(currencyDropdown.isPresent());
  });
  it('Select thb currency' , () => {
    page.navigateTo();
    const currencyDropdown = element(by.cssContainingText('option', 'thb'));
    const donate = element(by.className('col cc-button'));
    // Select twenty to donate
    currencyDropdown.click();
    // Click donate
    donate.click();
    // Expecting form. No way to reference it
    expect(currencyDropdown.isPresent());
  });
});
