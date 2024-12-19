const data = require(`../../database`);

module.exports = async (req, res) => {

    const {plu, shop_id, type_remaind, quantity_up, quantity_down} = req.query;

    if(plu || shop_id || type_remaind || quantity_up || quantity_down) {
        const dto = {plu, shop_id, type_remaind, quantity_up, quantity_down};
        const remainds = await data.getRemainds(dto);
        res.status(200).json(remainds);
    } else{
        res.status(400).json({message: `Remaind not found`});
    }
}