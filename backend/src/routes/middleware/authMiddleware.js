const jwt = require("jsonwebtoken");


// Middleware to authenticate and authorize users based on JWT and roles
const authMiddleware = (allowedRoles = []) => {
    return (req, res, next) => {
        const authHeader = req.headers.authorization;

        // Check if the Authorization header is present and starts with "Bearer "
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Access denied. Token required."
            });
        }

        // Extract the token from the Authorization header
        const token = authHeader.split(" ")[1];

        try {
            // Verify the token using the secret key
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET
            );

            // Attach the decoded user information to the request object for further use
            req.user = decoded
            if (allowedRoles.length > 0 && !allowedRoles.includes(req.user.role)) {
                return res.status(403).json({
                    message: "Access denied. You do not have permission to access this resource."
                });
            }


            next();

        } catch (error) {
            return res.status(401).json({
                message: "Invalid or expired token"
            });
        }
    };
}

module.exports = authMiddleware;