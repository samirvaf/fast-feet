import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import FileController from './app/controllers/FileController';

import authMiddleware from './app/middlewares/authMiddleware';

const routes = new Router();

// Session login
routes.post('/sessions', SessionController.store);

// Auth verification
routes.use(authMiddleware);

// Recipients
routes.get('/recipients', RecipientController.index);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);

// Files upload
routes.post('/files', FileController.store);

export default routes;
