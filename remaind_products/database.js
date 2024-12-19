const db = require(`./data-config`);
// логику взаимодействия с базой данных выносим в отдельный файл 

//создаем таблицу продуктов
db.pool.query(`CREATE TABLE IF NOT EXISTS products(
    id SERIAL PRIMARY KEY,
    plu INTEGER UNIQUE NOT NULL,
    name VARCHAR(30) NOT NULL)`);

//создаем таблицу остатков
db.pool.query(`CREATE TABLE IF NOT EXISTS remainds(
    id SERIAL PRIMARY KEY ,
    plu INTEGER NOT NULL, 
    shop_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    type_remaind VARCHAR(10) NOT NULL)`);

//специальная функция для формирования запроса
function getQuery(key, i) {
    return `${(i != 1)? " AND ":""}${key} = $${i}`;
}
    
module.exports = {

    //добавляем продукт в БД
    async addProduct(product) {

        const id = await new Promise((resolve, reject) => {
            db.pool.query(`INSERT INTO products (plu, name) VALUES($1, $2) RETURNING id`, 
                [product.plu, product.name], (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result.rows[0].id);
                    }
                } )
        });

        return {id: id, ...product};
    },

    //получить продукт по артикулу
    async getProductByPLU(plu) {

        const product = await new Promise((resolve, reject) => {
            db.pool.query(`SELECT * FROM products WHERE plu = $1`, [plu],
                (err, result) => {
                    if(err){
                        reject(err);
                    } else {
                        resolve(result.rows[0]);
                    }
                }
            )
        });

        return product;
    },

    //получить продукт по названию
    async getProductByName(name) {

        const product = await new Promise((resolve, reject) => {
            db.pool.query(`SELECT * FROM products WHERE name = $1`, [name],
                (err, result) => {
                    if(err){
                        reject(err);
                    } else {
                        resolve(result.rows[0]);
                    }
                }
            )
        });

        return product;
    },

    //добавить остаток
    async addRemaind(remaind) {

        const id = await new Promise((resolve, reject) => {
            db.pool.query(`INSERT INTO remainds (plu, shop_id, quantity, type_remaind) VALUES($1, $2, $3, $4) RETURNING id`, 
                [remaind.plu, remaind.shop_id, remaind.quantity, remaind.type_remaind], (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result.rows[0].id);
                    }
                } )
        });

        return {id: id, ...remaind};
    },

    //увеличить количество товара в остатке
    async remaindQuantityAdd(dto) {

        const remaind = await new Promise((resolve, reject) => {
            db.pool.query(`UPDATE remainds SET quantity = quantity + $2 WHERE id = $1`, 
                [dto.id, dto.quantity], (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result.rows);
                    }
                } )
        });

        return this.getRemaindById(dto.id);
    },

    //уменьшить количество товара в остатке
    async remaindQuantityReduce(dto) {

        const remaind = await new Promise((resolve, reject) => {
            db.pool.query(`UPDATE remainds SET quantity = quantity - $2 WHERE id = $1`, 
                [dto.id, dto.quantity], (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result.rows);
                    }
                } )
        });

        return this.getRemaindById(dto.id);
    },

    //получить остаток по id
    async getRemaindById(id) {

        const remaind = await new Promise((resolve, reject) => {
            db.pool.query(`SELECT * FROM remainds WHERE id = $1`, [id],
                (err, result) => {
                    if(err){
                        reject(err);
                    } else {
                        resolve(result.rows[0]);
                    }
                }
            )
        });

        return remaind;
    },

    //запрос остатков в БД по фильтрам
    async getRemainds(dto) {

        let query = '';
        let i = 1;
        let arr = [];

        if (dto.plu)
        {
            query = query + getQuery('plu', i);
            arr.push(dto.plu);
            i++;
        }
    
        if (dto.shop_id)
        {
            query = query + getQuery('shop_id', i);
            arr.push(dto.shop_id);
            i++;
        }
    
        if (dto.type_remaind)
        {
            query = query + getQuery('type_remaind', i);
            arr.push(dto.type_remaind);
            i++;
        }
        
        if (dto.quantity_up) {
            query = query + `${(i != 1)? " AND":""} quantity < ${dto.quantity_up}`
        }

        if (dto.quantity_down) {
            query = query + `${(i != 1 || dto.quantity_up)? " AND":""} quantity > ${dto.quantity_down} `
        }
    
        console.log(query);

        const remainds = await new Promise((resolve, reject) => {
            db.pool.query(`SELECT * FROM remainds WHERE ${query}`, arr,
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