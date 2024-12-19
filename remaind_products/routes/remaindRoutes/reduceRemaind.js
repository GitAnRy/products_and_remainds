const data = require(`../../database`);

/* reduceRemaind - увеличить остаток
    params:
    id - id остатка в БД
    quantity - убавляемое количество товара*/

module.exports = async (req, res) => {

    const {id, quantity} = req.body;

    if(id && quantity) {
        const dto = {id, quantity};
        const remaind = await data.remaindQuantityReduce(dto);
        res.status(200).json(remaind);
    } else {
        res.status(400).json({message: `Remaind not found`});
    }
}