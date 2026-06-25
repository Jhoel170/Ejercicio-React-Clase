const authorizeRoles = (...roles) => {
    return (res, req, next) => {
        if(!roles.includes(req.user.rol)) {
            return req.status(403).json({ message: "No autorizado para esta acción"});
        }
        next()
    }
}
module.exports = { authorizeRoles};