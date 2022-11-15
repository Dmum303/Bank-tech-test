class Bank {
  constructor() {
    this.bankAccountArray = [];
    this.total = 0;
  }

  // Adds transaction object to this class
  addTransaction(transaction) {
    if (typeof transaction === 'object') {
      this.bankAccountArray.push(transaction);
    } else {
      return 'Please only input transaction objects';
    }
  }

  // Creates string of transaction object
  stringTransaction(transactionObject, total) {
    let date = transactionObject.formattedDate;
    let amount = transactionObject.amount.toFixed(2);
    let type = transactionObject.type;
    if (type === 'credit') {
      return date + ' || ' + amount + ' || || ' + total.toFixed(2);
    } else if (type === 'debit') {
      return date + ' || || ' + amount + ' || ' + total.toFixed(2);
    }
  }

  // Keeps a running total of account balance, is injected into
  // stringTransaction method
  runningTotal(transactionObject) {
    let type = transactionObject.type;
    let amount = transactionObject.amount;
    if (type === 'credit') {
      this.total += amount;
    } else if (type === 'debit') {
      this.total -= amount;
    }
    return this.total;
  }

  // Sorts the bankAccount array in correct date order before processing
  sortArrayByDate() {
    this.bankAccountArray = this.bankAccountArray.sort(
      (a, b) => b.date - a.date
    );
    return this.bankAccountArray;
  }

  // Inserts transaction string into new array
  produceStatement() {
    let statementArray = [];
    this.bankAccountArray.forEach((transaction) => {
      let totalFunds = this.runningTotal(transaction);
      let transactionString = this.stringTransaction(transaction, totalFunds);
      statementArray.push(transactionString);
    });
    return statementArray;
  }

  // Calls the sort method and produce statement method
  // Inserts statement header into array and converts array to string,
  // returns that string with new line escapes
  returnStatement() {
    this.sortArrayByDate();
    let finalStatementArray = this.produceStatement();
    finalStatementArray.unshift('date || credit || debit || balance');
    let joinedStatementWithLineEscape = finalStatementArray.join('\n');
    return joinedStatementWithLineEscape;
  }
}

module.exports = Bank;
