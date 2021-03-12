const { User} = require('../../db/db-connection').db;
const { validationResult } = require('express-validator');
const constants = require('../../middleware/constants');

const { personalDetails } = require('./personal-details');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");


const register= async (req, res) => {

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors });
	}
	const payload = req.body;
	try {
		const result = await personalDetails(payload);
		if (payload.id) {
			if (result)
				res.status(200).json({ "msg": "Updated successfully" })
			else
				res.status(404).json({ errors: [{ "msg": "no data found"}] });
		} else {
			if (result) {
				let token = generateJWTToken({ id: result.result.result.id, userName: result.result.result.username});
				res.status(200).json({ id: result.result.result.id, token: token});
			}
		}
	} catch (error) {
		if (error.name === 'SequelizeUniqueConstraintError') {
			return res.status(409).json({ errors: "Username already exists" });
		}
		return res.status(409).json({ errors: error});
	}
}



const login= async (req, res) => {

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors });
	}

	const username = req.body.username;
	const password = req.body.password;
	try {
		var result = await User.findOne(
			{
				where: { username: username},
				attributes: ['id', 'username', 'password']
			}
		);


		if (result && result.dataValues) {
			const isMatch = await bcrypt.compare(password, result.dataValues.password);

			if (isMatch) {
				const token = generateJWTToken({ id: result.dataValues.id, userName: result.dataValues.username });
				res.status(200).json({ id: result.dataValues.id, token: token });
			} else {
				res.status(422).json({ errors: [{ "msg": "Invalid  password"}] });
			}
		}
		else {
			return res.status(422).json({ errors: [{ "msg": "Invalid Username or password"}] });
		}
	} catch (error) {
		return res.status(422).json({ errors: error });
	}
}

const generateJWTToken = (user) => {

	let payload = {
		id: user.id,
		name: user.userName
	};

	let token = '';
	try {
		token = jwt.sign(payload, constants.SECRET, { expiresIn: 7 * 60 * 60 })
	}
	catch (error) {
		console.log(error)
	}
	return token;
}


module.exports = {login,register};