const db = require(`./data-config`);
// логику взаимодействия с базой данных выносим в отдельный файл 

//создаем таблицу истории операций
db.pool.query(`CREATE TABLE IF NOT EXISTS history_operations(
    id SERIAL PRIMARY KEY,
    shop_id INTEGER NOT NULL,
    plu INTEGER NOT NULL,
    action_id INTEGER NOT NULL,
    date DATE NOT NULL default NOW())`);

    //создаем таблицу событий
db.pool.query(`CREATE TABLE IF NOT EXISTS actions_product(
    id SERIAL PRIMARY KEY ,
    name VARCHAR(30) UNIQUE NOT NULL)`);

function getQuery(key, i) {
    return `${(i != 1)? " AND ":""}${key} = $${i}`;
}
    
module.exports = {

    //добавляем тип события в БД
    async addAction(name) {

        const id = await new Promise((resolve, reject) => {
            db.pool.query(`INSERT INTO actions_product (name) VALUES($1) RETURNING id`, 
                [name], (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result.rows[0].id);
                    }
                } )
        });

        return {id: id};
    },

    //получить id события по названию в БД
    async getAction(name) {

        const result = await new Promise((resolve, reject) => {
            db.pool.query(`SELECT * FROM actions_product WHERE name = $1`, 
                [name], (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result.rows[0]);
                    }
                } )
        });

        if(!result) {
            return this.addAction(name);
        }

        return {id: result.id};
    },

    //добавляем операцию над продуктом в БД
    async addProductsOperation(dto) {

        dto.action_id = (await this.getAction(dto.name_action)).id;

        const id = await new Promise((resolve, reject) => {
            db.pool.query(`INSERT INTO history_operations (shop_id, plu, action_id) VALUES($1, $2, $3) RETURNING id`, 
                [dto.shop_id, dto.plu, dto.action_id], (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result.rows[0].id);
                    }
                } )
        });

        return this.getProductsOperation(id);
    },

    //получить операцию над продуктом по id
    async getProductsOperation(id) {

        const operation = await new Promise((resolve, reject) => {
            db.pool.query(`SELECT * FROM history_operations WHERE id = $1`, 
                [id], (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result.rows[0]);
                    }
                } )
        });

        return operation;
    },

    //получить историю операций по фильтрам
    async getHistoryProducts(dto, page) {

        let query = '';
        let i = 1;
        let arr = [];
        const offset = (page - 1) * 10;
        
        if (dto.plu)
        {
            query = query + getQuery('h.plu', i);
            arr.push(dto.plu);
            i++;
        }

        if (dto.shop_id)
        {
            query = query + getQuery('h.shop_id', i);
            arr.push(dto.shop_id);
            i++;
        }

        if (dto.action_id)
        {
            query = query + getQuery('h.action_id', i);
            arr.push(dto.action_id);
            i++;
        }


        if (dto.date_from || dto.date_to) {
            let today = new Date().toISOString().slice(0, 10)
            dto.date_from ||= today;
            dto.date_to ||= today;
            query = query + `${(i != 1)? " AND":""} h.date >= '${dto.date_from}' AND h.date <= '${dto.date_to}'`
        }

        console.log(query);

        const remainds = await new Promise((resolve, reject) => {
            db.pool.query(`SELECT h.id, h.shop_id, h.plu, h.date, a.name AS action_name 
                FROM history_operations AS h
                LEFT OUTER JOIN actions_product AS a
                ON h.action_id = a.id
                WHERE ${query} 
                ORDER BY h.date OFFSET ${offset} LIMIT 10`, arr,
                (err, result) => {
                    if(err){
                        reject(err);
                    } else {
                        resolve(result.rows);
                    }
                }
            )
        });

        return remainds;
    }
}