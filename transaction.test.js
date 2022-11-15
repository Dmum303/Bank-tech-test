const Transaction = require('./transaction');

describe('transaction', () => {
  it('Creates a transaction and returns amount', () => {
    const transaction = new Transaction();
    transaction.addAmount(500);
    expect(transaction.amount).toEqual(500);
  });

  it('Returns amount must be number if input not number', () => {
    const transaction = new Transaction();
    expect(transaction.addAmount('Chips')).toEqual(
      'Amount must be a number, with no more than 2 decimal places'
    );
    expect(transaction.addAmount('500')).toEqual(
      'Amount must be a number, with no more than 2 decimal places'
    );
    expect(transaction.addAmount('!@£$%^&')).toEqual(
      'Amount must be a number, with no more than 2 decimal places'
    );
  });

  it('Checks that number is no more than 2 decimal places', () => {
    const transaction = new Transaction();
    expect(transaction.check2Decimal(10.45)).toEqual(true);
    expect(transaction.check2Decimal(10.475)).toEqual(false);
    expect(transaction.check2Decimal(10.4)).toEqual(true);
    expect(transaction.check2Decimal(10)).toEqual(true);
    expect(transaction.check2Decimal(0.4)).toEqual(true);
    expect(transaction.check2Decimal(0.4435678654324567)).toEqual(false);
  });

  it('Can add amount with 2 decimal places', () => {
    const transaction = new Transaction();
    expect(transaction.addAmount(10.55737)).toEqual(
      'Amount must be a number, with no more than 2 decimal places'
    );
    transaction.addAmount(500.45);
    expect(transaction.amount).toEqual(500.45);
  });

  it('adds todays date as date object to model', () => {
    const transaction = new Transaction();
    transaction.addDate();
    expect(transaction.date).toEqual(new Date());
  });

  it('formats date to string eg 12/11/2022', () => {
    const transaction = new Transaction();
    transaction.addDate();
    const day = new Date().getDate();
    let month = new Date().getMonth();
    const year = new Date().getFullYear();
    transaction.formatDate();
    expect(transaction.formattedDate).toEqual(
      day + '/' + (month + 1) + '/' + year
    );
  });

  it('Records type of transaction, returns msg if invalid input', () => {
    const transaction = new Transaction();
    transaction.addType('credit');
    expect(transaction.type).toEqual('credit');
    transaction.addType('debit');
    expect(transaction.type).toEqual('debit');
    expect(transaction.addType('dfhjhartsrjytk')).toEqual(
      'Please only enter credit or debit'
    );
    expect(transaction.addType(123456)).toEqual(
      'Please only enter credit or debit'
    );
    expect(transaction.addType()).toEqual('Please only enter credit or debit');
  });
});
