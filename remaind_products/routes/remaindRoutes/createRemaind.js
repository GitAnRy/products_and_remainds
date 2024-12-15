const data = require(`../../database`);

module.exports = async (req, res) => {

    const {plu, shop_id, quantity, type_remaind} = req.body;

    if(plu && shop_id && quantity && type_remaind) {
        const remaind = {plu, shop_id, quantity, type_remaind};
        const createRemaind = await data.addRemaind(remaind);
        res.status(200).json(createRemaind);
    } else {
        res.status(400).json({message: `One of the parameters is missing`});
    }
}