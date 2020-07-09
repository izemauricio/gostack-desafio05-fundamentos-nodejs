import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    // TODO: return all transactions + balance

    // call service to get all transactions
    const transactions = transactionsRepository.all();

    // get balanca
    const balance = transactionsRepository.getBalance();

    // monta resposta
    return response.json({ transactions: transactions, balance: balance });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    // TODO
    const { title, value, type } = request.body;
    // create service and pass repository
    const createTransaction = new CreateTransactionService(
      transactionsRepository,
    );
    // call service
    const transaction = createTransaction.execute({ title, value, type });
    // return created transaction
    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
