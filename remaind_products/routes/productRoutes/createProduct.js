const data = require(`../../database`);

/* createProduct - создать остаток
    params:
    plu - артикул товара
    name - название товара*/

module.exports = async (req, res) => {

    const {plu, name} = req.body;

    if(plu && name) {
        const product = {plu, name};
        const createProduct = await data.addProduct(product);
        res.status(200).json(createProduct);
    } else {
        res.status(400).json({message: `PLU and Name are required`});
    }
}