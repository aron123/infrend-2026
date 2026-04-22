import { Controller } from "./base.controller";
import { AppDataSource } from "../data-source";
import { BankTransfer } from "../entity/BankTransfer";
import { User } from "../entity/User";

export class TransactionController extends Controller {
    repository = AppDataSource.getRepository(BankTransfer);
    userRepository = AppDataSource.getRepository(User);

    create = async (req, res) => {
        try {
            /*{
                amount: 150000,
                sender: { id: 1 },
                receiver: { id: 2 }
            } */

            if (!req.body.sender?.id || !req.body.receiver?.id) {
                return this.handleError(res, null, 400, 'A küldő és fogadó megadása kötelező.');
            }

            const sender = await this.userRepository.findOneBy({
                id: req.body.sender?.id
            });

            const receiver = await this.userRepository.findOneBy({
                id: req.body.receiver?.id
            });

            if (!sender || !receiver) {
                return this.handleError(res, null, 404, 'Nem létező küldő vagy fogadó.');
            }

            if (sender.id === receiver.id) {
                return this.handleError(res, null, 409, 'A küldő és fogadó nem lehet ugyanaz.');
            }

            if (req.body.amount < 0) {
                return this.handleError(res, null, 400, 'Az összeg nem lehet negatív.');
            }

            if (sender.balance < req.body.amount) {
                return this.handleError(res, null, 400, 'A küldő fél nem rendelkezik elegendő egyenleggel.');
            }

            sender.balance -= req.body.amount;
            receiver.balance += req.body.amount;
            await this.userRepository.save([ sender, receiver ]);

            const transaction = this.repository.create({
                amount: req.body.amount,
                sender,
                receiver
            });
            const savedTransaction = await this.repository.save(transaction);
            res.json(savedTransaction);
        } catch (err) {
            this.handleError(res, err);
        }
    }
}