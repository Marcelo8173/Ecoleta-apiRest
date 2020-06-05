import {Request, Response} from 'express';
import knex from '../database/connection';

export default class poinstController{
    async show(request:Request, response:Response){
        const {id} = request.params;
        const point = await knex('points').where('id',id).first();

        if(!point){
            return response.status(400).json({erro:'Point not found'});
        };

        const serializedPoints = {
            ...point,
            image_url: `http://192.168.15.141:3333/uploads/${point.image}`
        }

        const items = await knex('items').join('point_items','items.id','=','point_items.items_id')
        .where('point_items.point_id',id);

        return response.json({point:serializedPoints,items});
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
            image: request.file.filename,
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
         
         const pointItems = items.split(',')
         .map((item:string) =>Number(item.trim()))
         .map((item_id:number)=>{
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
        
        const serializedPoints = points.map(point =>{
            return{
                ...point,
                image_url: `http://192.168.15.141:3333/uploads/${point.image}`,
            }
        })

        return response.json(serializedPoints);
    }
}