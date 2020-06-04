//knex como lib para sql
import knex from 'knex';
import paht from 'path';


const connection = knex({
    client: 'sqlite3',
    connection:{
        filename: paht.resolve(__dirname, 'database1.sqlite')
    },    
    useNullAsDefault:true,

});

export default connection;