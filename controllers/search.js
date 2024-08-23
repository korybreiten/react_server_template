const db = require('../config/database');
const Users = db.User;
const Op = db.Sequelize.Op;

module.exports = {
    search
}

async function search(req, res){
    const keyword = req.params.keyword;
    try {
        const data = await Users.findAll(
            { where: { [Op.or]: [{firstName: {[Op.like]: '%' + keyword + '%'}}, 
            {lastName: {[Op.like]: '%' + keyword + '%'}}, 
            {email: {[Op.like]: '%' + keyword + '%'}} ] } }
        );
        let users = [];
        data.forEach(function(user){
            const userData = {
                firstName: user.dataValues.firstName,
                lastName: user.datavalues.lastName,
                email: user.dataValues.email,
                avatar: user.dataValues.avatar
            };
            users.push(userData);
        });
        res.status(200).json( users );
        
    } catch(err){
        return res.status(401).json(err)
    }
}