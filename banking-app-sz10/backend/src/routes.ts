import express from 'express';
import { UserController } from './controller/user.controller';

export const appRouter = express.Router();

const userController = new UserController();

appRouter.get('/user', userController.getAll);
appRouter.get('/user/:id', userController.getOne);
appRouter.post('/user', userController.create);
appRouter.put('/user', userController.update);
appRouter.delete('/user/:id', userController.delete);
