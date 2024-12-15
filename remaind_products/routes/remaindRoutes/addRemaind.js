const data = require(`../../database`);

module.exports = async (req, res) => {

    const {id, quantity} = req.body;

    if(id && quantity) {
        const dto = {id, quantity};
        const remaind = await data.remaindQuantityAdd(dto);
        res.status(200).json(remaind);
    } else {
        res.status(400).json({message: `Remaind not found`});
    }
}