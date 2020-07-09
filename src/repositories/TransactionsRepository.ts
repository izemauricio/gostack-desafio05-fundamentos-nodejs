import Transaction from '../models/Transaction';
import {} from '../services/CreateTransactionService';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    // TODO
    return this.transactions;
  }

  public getBalance(): Balance {
    // TODO
    // reduce array to accumulate the income or outcome
    const { income, outcome } = this.transactions.reduce(
      // reducer function
      function (balanceAccumulator: Balance, currentTransaction: Transaction) {
        if (currentTransaction.type === 'income') {
          balanceAccumulator.income += currentTransaction.value;
        } else if (currentTransaction.type === 'outcome') {
          balanceAccumulator.outcome += currentTransaction.value;
        }
        return balanceAccumulator;
      },
      // inicial reducer value
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    const total = income - outcome;

    const balance = {
      income: income,
      outcome: outcome,
      total: total,
    };
    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    // TODO
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
