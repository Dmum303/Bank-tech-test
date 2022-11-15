class Transaction {
  constructor(amount) {
    this.amount = 0;
    this.type = null;
    this.date = null;
    this.formattedDate = null;
  }

  // Regex to test that number has a max of 2 decimal places
  check2Decimal(number) {
    const regex = /^[0-9]*(\.[0-9]{0,2})?$/;
    return regex.test(number);
  }

  addAmount(amount) {
    if (typeof amount === 'number' && this.check2Decimal(amount)) {
      this.amount += amount;
    } else {
      return 'Amount must be a number, with no more than 2 decimal places';
    }
  }

  addDate() {
    const dateNew = new Date();
    this.date = dateNew;
    return dateNew;
  }

  // To format date objet to string
  formatDate() {
    const dateObject = this.addDate();
    const day = dateObject.getDate();
    const month = dateObject.getMonth();
    const year = dateObject.getFullYear();
    let newDateString = day + '/' + (month + 1) + '/' + year;
    this.formattedDate = newDateString;
    return newDateString;
  }

  addType(type) {
    if (type === 'credit' || type === 'debit') {
      this.type = type;
    } else {
      return 'Please only enter credit or debit';
    }
  }
}

module.exports = Transaction;
