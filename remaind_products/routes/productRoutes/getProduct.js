const data = require(`../../database`);

/* getProduct - получить товар по фильтрам
    params:
    plu - артикул товара
    name - название товара*/

module.exports = async (req, res) => {

    const {plu, name} = req.query;

    let product;

    if(plu) {
        product = await data.getProductByPLU(plu);
        if (product)
            res.status(200).json(product);
    } 
    
    if(!product && name) {
        product = await data.getProductByName(name);
        if (product)
            res.status(200).json(product);
    } 
    
    if (!product) {
        res.status(400).json({message: `Product not found`});
    }
}