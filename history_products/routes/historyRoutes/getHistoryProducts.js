const data = require(`../../database`);

/* getHistoryProducts params
    plu - артикул товара
    shop_id - id магазина
    action_id - id события
    date_from - дата начала диапазона
    date_to - дата окончания диапазона*/

module.exports = async (req, res) => {

    const {plu, shop_id, action_id, date_from, date_to} = req.query;
    const {page} = req.params;

    page ||= 1;

    if(plu || shop_id || action_id || date_from || date_to) {
        const dto = {plu, shop_id, action_id, date_from, date_to};
        const historyRecords = await data.getHistoryProducts(dto, page);
        res.status(200).json(historyRecords);
    } else{
        res.status(400).json({message: `Operations not found`});
    }
}