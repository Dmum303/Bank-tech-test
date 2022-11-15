const Transaction = require('./transaction');
const Bank = require('./bank');

describe('Bank Transaction integration', () => {
  it('Produces a bank statment with transaction', () => {
    const transaction = new Transaction();
    transaction.addAmount(500);
    transaction.addDate();
    transaction.formatDate();
    transaction.addType('credit');
    const bank = new Bank();
    bank.addTransaction(transaction);
    expect(bank.returnStatement()).toEqual(
      'date || credit || debit || balance\n15/11/2022 || 500.00 || || 500.00'
    );
  });

  it('Produces a bank statment with transaction', () => {
    const transaction = new Transaction();
    transaction.addAmount(13.5);
    transaction.addDate();
    transaction.formatDate();
    transaction.addType('credit');
    const bank = new Bank();
    bank.addTransaction(transaction);
    expect(bank.returnStatement()).toEqual(
      'date || credit || debit || balance\n15/11/2022 || 13.50 || || 13.50'
    );
  });

  it('Produces a bank statment with several transactions', () => {
    const transaction1 = new Transaction();
    transaction1.addDate();
    transaction1.formatDate();
    transaction1.addType('credit');
    transaction1.addAmount(13.5);
    const transaction2 = new Transaction();
    transaction2.addDate();
    transaction2.formatDate();
    transaction2.addType('debit');
    transaction2.addAmount(4.95);
    const bank = new Bank();
    bank.addTransaction(transaction1);
    bank.addTransaction(transaction2);
    expect(bank.returnStatement()).toEqual(
      'date || credit || debit || balance\n15/11/2022 || 13.50 || || 13.50\n15/11/2022 || || 4.95 || 8.55'
    );
  });
});
