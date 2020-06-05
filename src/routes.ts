import { Router, request, response } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import ItemsController from './controllers/itemsController';
import PoinstController from './controllers/poinstController';


const routes = Router();
const uploads = multer(multerConfig);
const itemsController = new ItemsController();
const poinstController = new PoinstController();

routes.get('/items', itemsController.index);

routes.post('/points',uploads.single('image'),poinstController.create);
routes.get('/points',poinstController.index);
routes.get('/points/:id',poinstController.show);


export default routes;