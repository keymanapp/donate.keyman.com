export class Currencies {

  static currencies = {
    'usd': { symbol: '$', onceAmounts: ['20', '50', '100', '200'],              monthlyAmounts: ['10', '20', '50', '5'] },
    'aud': { symbol: '$', onceAmounts: ['30', '60', '100', '200'],              monthlyAmounts: ['10', '20', '50', '5'] },
    'eur': { symbol: '€', onceAmounts: ['15', '40', '80', '150'],               monthlyAmounts: ['10', '50', '100', '5'] },
    'gbp': { symbol: '£', onceAmounts: ['15', '30', '60', '100'],               monthlyAmounts: ['5', '20', '40', '3'] },
    'krw': { symbol: '₩', onceAmounts: ['20000', '50000', '100000', '200000'],  monthlyAmounts: ['10000', '20000', '50000', '5000'], zeroDecimal: true },
    'nzd': { symbol: '$', onceAmounts: ['50', '100', '200', '500'],             monthlyAmounts: ['10', '20', '50', '5'] },
    'thb': { symbol: '฿', onceAmounts: ['500', '1000', '2000', '5000'],         monthlyAmounts: ['200', '400', '500', '100'] },
    'jpy': { symbol: '¥', onceAmounts: ['2000', '5000', '10000', '20000'],      monthlyAmounts: ['1000', '2000', '5000', '500'], zeroDecimal: true },
    'brl': { symbol: '$', onceAmounts: ['80', '200', '400', '800'],             monthlyAmounts: ['40', '100', '200', '60'] },
    'cad': { symbol: '$', onceAmounts: ['20', '70', '100', '200'],              monthlyAmounts: ['10', '30', '50', '100'] }
  };

  static currencyCodes = [ 'usd', 'aud', 'eur', 'gbp', 'krw', 'nzd', 'thb', 'jpy', 'brl', 'cad'];

  static isZeroDecimalCurrency(currency: string): boolean {
    // See https://stripe.com/docs/currencies
    return !!this.currencies[currency].zeroDecimal;
  }
}