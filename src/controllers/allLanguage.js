const {Language} = require("../db")



const allLanguage = async (req, res, next) => {
	try {
		var data = await Language.findAll({
            attributes: ['id','language'],
        });
		res.send(data);
	} catch (error) {
		next(error);
	}
};

module.exports = allLanguage