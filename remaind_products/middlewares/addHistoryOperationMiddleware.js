const rabbitmqService = require(`../rabbitmqService`);
const db = require(`../database`);

module.exports = {

    async createProduct(req, res, next) {

        const {plu, name} = req.body;
    
        if(plu && name) {
            const body = {plu,
                shop_id: -1,
                name_action: `create product`
            };
            rabbitmqService.sendInQueue(body);
        } 

        next();
    },

    async createRemaind(req, res, next) {

        const {plu, shop_id, quantity, type_remaind} = req.body;
    
        if(plu && shop_id && quantity && type_remaind) {
            const body = {plu,
                shop_id: shop_id,
                name_action: `create ${type_remaind}`
            };
            rabbitmqService.sendInQueue(body);
        } 

        next();
    },

    async addRemaindQuantity(req, res, next) {

        const {id, quantity} = req.body;
    
        if(id && quantity) {

            const remaind = await db.getRemaindById(id);
            const body = {
                name_action: `adding quantity`,
                ...remaind
            };
            rabbitmqService.sendInQueue(body);
        } 

        next();
    },

    async reduceRemaindQuantity(req, res, next) {

        const {id, quantity} = req.body;
    
        if(id && quantity) {

            const remaind = await db.getRemaindById(id);
            const body = {
                name_action: `reduce quantity`,
                ...remaind
            };
            rabbitmqService.sendInQueue(body);
        } 

        next();
    }

}