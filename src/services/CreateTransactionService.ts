import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    // TODO
    // check if it is outcome and it has balance
    if (type === 'outcome') {
      const balance = this.transactionsRepository.getBalance();
      if (value > balance.total) {
        throw Error(
          'Wallet do not have enough balance to accept this outcome.',
        );
      }
    }

    // cria entity com repository
    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    // retorna
    return transaction;
  }
}

export default CreateTransactionService;
