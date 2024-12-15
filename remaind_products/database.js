const db = require(`./data-config`);

db.pool.query(`CREATE TABLE IF NOT EXISTS products(
    id SERIAL PRIMARY KEY,
    plu INTEGER UNIQUE NOT NULL,
    name VARCHAR(30) NOT NULL)`);

db.pool.query(`CREATE TABLE IF NOT EXISTS remainds(
    id SERIAL PRIMARY KEY ,
    plu INTEGER NOT NULL, 
    shop_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    type_remaind VARCHAR(10) NOT NULL)`);
    
module.exports = {

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

    async getRemainds(dto) {

        let query = '';
        let i = 1;
        let arr = [];

        for (let key in dto) {
            let v = dto[key];
            console.log('key = ' + key);
            console.log('value = ' + v);
            if (v) {
                query = query + `${(i != 1)? " AND ":""}${key} = $${i}`;
                arr.push(v);
                i++;
            }
            
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