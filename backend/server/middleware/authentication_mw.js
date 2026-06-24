const jwt = require("jsonwebtoken")
const Estudiante = require("../models/estudiante.model")

const passwordxd = "170";

module.exports.protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization;
            console.log('Token recibido-con Bearer: ', token);
            token = token.split(' ')[1];
            console.log('Token extraído: ', token);
            const decoded = jwt.verify(token, passwordxd);
            req.estudiante = await Estudiante.findOne({ _id: decoded._id }).select('-password');
            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized!' });
        }
    }
    if (!token) {
        res.status(401).json({ message: 'Not authorized, missed token!' });
    }
}