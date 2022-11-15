const Bank = require('./bank');

describe('bank', () => {
  const date1 = new Date('2022-11-14T12:37:00.713Z');
  const date2 = new Date('2022-11-12T12:37:00.713Z');
  const mockDeposit = {
    amount: 500,
    type: 'credit',
    formattedDate: '14/11/2022',
    date: date1,
  };

  const mockWithdrawl = {
    amount: 200,
    type: 'debit',
    formattedDate: '12/11/2022',
    date: date2,
  };

  it('returns an empty bankAccountArray', () => {
    const bank = new Bank();
    expect(bank.bankAccountArray).toEqual([]);
  });

  it('A desposit shows in bankAccountArray after addTransaction', () => {
    const bank = new Bank();
    bank.addTransaction(mockDeposit);
    expect(bank.bankAccountArray.length).toEqual(1);
    expect(bank.bankAccountArray[0].amount).toEqual(500);
    expect(bank.bankAccountArray[0].type).toEqual('credit');
    expect(bank.bankAccountArray[0].formattedDate).toEqual('14/11/2022');
  });

  it('Several transactions added to bankAccountArray', () => {
    const bank = new Bank();
    bank.addTransaction(mockDeposit);
    bank.addTransaction(mockDeposit);
    expect(bank.bankAccountArray.length).toEqual(2);
  });

  // I don't know how to check that the object I'm feeding the bank class is
  // an instance of the transaction class, I also don't know how to create a
  // mock of that class, if anyone could enlighten me I would appreciate it.

  it('addTransaction Only accepts objects as input', () => {
    const bank = new Bank();
    expect(bank.addTransaction('string')).toEqual(
      'Please only input transaction objects'
    );
    expect(bank.addTransaction(123456)).toEqual(
      'Please only input transaction objects'
    );
    expect(bank.addTransaction()).toEqual(
      'Please only input transaction objects'
    );
  });

  it('Turns transaction into string with stringTransaction method', () => {
    const bank = new Bank();
    expect(bank.stringTransaction(mockDeposit, 500)).toEqual(
      '14/11/2022 || 500.00 || || 500.00'
    );
    expect(bank.stringTransaction(mockWithdrawl, -200)).toEqual(
      '12/11/2022 || || 200.00 || -200.00'
    );
  });

  it('Keeps a running total of credit/debits with runningTotal method', () => {
    const bank = new Bank();
    expect(bank.total).toEqual(0);
    expect(bank.runningTotal(mockDeposit)).toEqual(500);
    expect(bank.runningTotal(mockDeposit)).toEqual(1000);
    expect(bank.runningTotal(mockWithdrawl)).toEqual(800);
    expect(bank.runningTotal(mockWithdrawl)).toEqual(600);
  });

  it('inserts transaction into statement array with produceStatement method', () => {
    const bank = new Bank();
    bank.addTransaction(mockDeposit);
    expect(bank.produceStatement()[0]).toEqual(
      '14/11/2022 || 500.00 || || 500.00'
    );
  });

  it('inserts multiple transactions into statement array with produceStatement', () => {
    const bank = new Bank();
    bank.addTransaction(mockDeposit);
    bank.addTransaction(mockWithdrawl);
    bank.addTransaction(mockWithdrawl);
    expect(bank.produceStatement()[2]).toEqual(
      '12/11/2022 || || 200.00 || 100.00'
    );
  });

  it('Sorts bankAccountArray with newest transaction first using sortArrayByDate', () => {
    const bank = new Bank();
    bank.addTransaction(mockDeposit);
    bank.addTransaction(mockWithdrawl);
    expect(bank.sortArrayByDate()[0].formattedDate).toEqual('14/11/2022');
  });

  it('Sorts bankAccountArray with newest transaction first using sortArrayByDate', () => {
    const bank = new Bank();
    bank.addTransaction(mockWithdrawl);
    bank.addTransaction(mockDeposit);
    expect(bank.sortArrayByDate()[0].formattedDate).toEqual('14/11/2022');
  });

  it('Returns  statement', () => {
    const bank = new Bank();
    bank.addTransaction(mockDeposit);
    expect(bank.returnStatement()).toEqual(
      'date || credit || debit || balance\n14/11/2022 || 500.00 || || 500.00'
    );
  });

  it('Returns statement', () => {
    const bank = new Bank();
    bank.addTransaction(mockWithdrawl);
    bank.addTransaction(mockDeposit);
    expect(bank.returnStatement()).toEqual(
      'date || credit || debit || balance\n14/11/2022 || 500.00 || || 500.00\n12/11/2022 || || 200.00 || 300.00'
    );
  });
});
