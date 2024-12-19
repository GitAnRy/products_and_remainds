const data = require(`../../database`);

/* getRemaind - получить остаток по фильтрам
    params:
    plu - артикул товара
    shop_id - id магазина
    type_remaind - тип остатка:
        remaind - остаток на полке
        order - остаток в заказе
    quantity_up - верхняя граница для количества товара в остатке
    quantity_down - нижняя граница для количества товара в остатке*/

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