import { AppDataSource } from "../data-source"
import { BankTransfer } from "../entity/BankTransfer"
import { User } from "../entity/User";
import { Controller } from "./base.controller"

export class TransactionController extends Controller {
    repository = AppDataSource.getRepository(BankTransfer);
    userRepository = AppDataSource.getRepository(User);

    create = async (req, res) => {
        /*
        Expected data:
        {
            "amount": 150000,
            "sender": { "id": 5 },
            "receiver": { "id": 6 }
        }
        */

        try {
            const transactionToSave = this.repository.create(req.body as BankTransfer);

            if (!transactionToSave.sender?.id || !transactionToSave.receiver?.id) {
                this.handleError(res, null, 400, 'Küldő és fogadó megadása kötelező.');
                return;
            }

            const sender = await this.userRepository.findOneBy({
                id: transactionToSave.sender.id
            });

            const receiver = await this.userRepository.findOneBy({
                id: transactionToSave.receiver.id
            });

            if (!sender || !receiver) {
                this.handleError(res, null, 404, 'Nem létező küldő vagy fogadó.');
                return;
            }

            if (sender.id == receiver.id) {
                this.handleError(res, null, 409, 'A küldő és a fogadó nem lehet ugyanaz.');
                return;
            }

            if (transactionToSave.amount < 1) {
                this.handleError(res, null, 400, 'Az összegnek pozitív egész számnak kell lennie.');
                return;
            }

            if (sender.balance < transactionToSave.amount) {
                this.handleError(res, null, 400, 'A küldő egyenlege túl alacsony.');
                return;
            }

            sender.balance -= transactionToSave.amount;
            receiver.balance += transactionToSave.amount;
            await this.userRepository.save([ sender, receiver ]);

            const transactionSaved = await this.repository.save(transactionToSave);
            res.json(transactionSaved);
        } catch (err) {
            this.handleError(res, err);
        }
    };
}