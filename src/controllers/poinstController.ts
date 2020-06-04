import {Request, Response} from 'express';
import knex from '../database/connection';

export default class poinstController{
    async show(request:Request, response:Response){
        const {id} = request.params;
        const point = await knex('points').where('id',id).first();

        if(!point){
            return response.status(400).json({erro:'Point not found'});
        };

        const items = await knex('items').join('point_items','items.id','=','point_items.items_id')
        .where('point_items.point_id',id);

        return response.json({point,items});
    }

    async create(request:Request,response:Response){
        const {
            name,
            email,
            whatsap,
            latitude,
            longitude,
            city,
            uf,
            items
         } = request.body;
    
         //inserindo no banco 
    
         const trx = await knex.transaction();
         const point = {
            image: 'image-fake',
            name,
            email,
            whatsap,
            latitude,
            longitude,
            city,
            uf,
         };

         const ids = await trx('points').insert(point);
         const  point_id = ids[0]
         
         const pointItems = items.map((item_id:number)=>{
            return{
                item_id,
                point_id,
            };
         });
    
        await trx('point_items').insert(pointItems);
        
    
         return response.json({id: point_id, ...point,});
    }

    async index(request:Request, response:Response){
        const {city, uf, items} = request.query;

        const parsedItem = String(items).split(',').map(item => Number(item.trim()));
        const points = await knex('points').join('point_items','points.id', '=','points_items.points_id').
        whereIn('points_items.items_id', parsedItem).where('city',String(city)).where('uf',String(uf))
        .distinct().select('points.*');    

        return response.json(points);
    }
}