import { Router, request, response } from 'express';
import ItemsController from './controllers/itemsController';
import PoinstController from './controllers/poinstController';


const routes = Router();
const itemsController = new ItemsController();
const poinstController = new PoinstController();

routes.get('/items', itemsController.index);

routes.post('/points',poinstController.create);
routes.get('/points',poinstController.index);
routes.get('/points/:id',poinstController.show);


export default routes;