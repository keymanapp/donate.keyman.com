import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getTitle() {
    return element(by.css('h3.donate-now-header')).getText();
  }

  getItem(value) {
    return browser.wait(function() {
      return element(by.id('element-id')).getAttribute('type');
    });
  }
}
