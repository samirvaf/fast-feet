import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import FileController from './app/controllers/FileController';
import DeliverymanController from './app/controllers/DeliverymanController';

import authMiddleware from './app/middlewares/authMiddleware';

const routes = new Router();
const upload = multer(multerConfig);

// Session login
routes.post('/sessions', SessionController.store);

// Auth verification
routes.use(authMiddleware);

// Recipients
routes.get('/recipients', RecipientController.index);
routes.post('/recipients', RecipientController.store);
routes.put('/recipient/:id', RecipientController.update);

// Files upload
routes.post('/files', upload.single('file'), FileController.store);

// Deliveryman
routes.get('/deliverymans', DeliverymanController.index);
routes.post('/deliverymans', DeliverymanController.store);
routes.put('/deliveryman/:id', DeliverymanController.update);
routes.delete('/deliveryman/:id', DeliverymanController.destroy);

export default routes;
