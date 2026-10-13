import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const isAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies || {};

        if (!token) {
            return res.status(401).json({
                message: "Token not found. Please login again."
            });
        }

        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = verifyToken.userId;

        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: "Token expired, please login again"
            });
        }

        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                message: "Invalid token"
            });
        }

        return res.status(500).json({
            message: "Error in isAuth middleware",
            error: error.message
        });
    }
};

export default isAuth;