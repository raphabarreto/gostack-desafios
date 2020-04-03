import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import FileController from './app/controllers/FileController';
import DeliverymanController from './app/controllers/DeliverymanController';
import DeliveryController from './app/controllers/DeliveryController';
import DeliveryWithdrawal from './app/controllers/DeliveryWithdrawal';
import DeliveryCompletionController from './app/controllers/DeliveryCompletionController';
import FinishedDeliveriesController from './app/controllers/FinishedDeliveriesController';
import CurrentDeliveriesController from './app/controllers/CurrentDeliveriesController';
import DeliveryProblemsController from './app/controllers/DeliveryProblemsController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

// Rotas não autenticadas

routes.post('/sessions', SessionController.store);

routes.post('/users', UserController.store);
routes.put('/users', UserController.update);

routes.get('/deliverymen/:deliverymanId', DeliverymanController.show);

routes.get(
  '/deliveryman/:deliverymanId/deliveries',
  FinishedDeliveriesController.index
);

routes.get(
  '/deliveryman/:deliverymanId/progress',
  CurrentDeliveriesController.index
);

routes.put(
  '/deliverymen/:deliverymanId/withdrawals/:deliveryId',
  DeliveryWithdrawal.update
);

routes.put(
  '/deliverymen/:deliverymanId/delivered/:deliveryId',
  upload.single('file'),
  DeliveryCompletionController.update
);

routes.post(
  '/deliveries/:deliveryId/problems',
  DeliveryProblemsController.store
);
routes.get('/problems', DeliveryProblemsController.index);
routes.get('/problems/:deliveryId', DeliveryProblemsController.show);
routes.get('/problems-list/:deliveryId', DeliveryProblemsController.showAll);
routes.delete('/problems/:problemId', DeliveryProblemsController.delete);

routes.post('/files', upload.single('file'), FileController.store);

// Autenticação
routes.use(authMiddleware);

// Rotas autenticadas

routes.get('/recipients', RecipientController.index);
routes.get('/recipients/:recipientId', RecipientController.show);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:recipientId', RecipientController.update);
routes.delete('/recipients/:recipientId', RecipientController.delete);

routes.get('/deliverymen', DeliverymanController.index);
routes.post('/deliverymen/', DeliverymanController.store);
routes.put('/deliverymen/:deliverymanId', DeliverymanController.update);
routes.delete('/deliverymen/:deliverymanId', DeliverymanController.delete);

routes.get('/deliveries', DeliveryController.index);
routes.get('/deliveries/:deliveryId', DeliveryController.show);
routes.post('/deliveries', DeliveryController.store);
routes.put('/deliveries/:deliveryId', DeliveryController.update);
routes.delete('/deliveries/:deliveryId', DeliveryController.delete);

export default routes;
