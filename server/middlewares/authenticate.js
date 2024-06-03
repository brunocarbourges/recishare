import jwt from 'jsonwebtoken';

//Resposible for verifying JWT token provided in request header to ensure user making request is authetnicated
const authenticate = (req, res, next) => {
    // Retrieve the token from the Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    // Check if the token is present
    if (!token) {
        return res.status(401).json({ message: "Authentication token missing" });
    }

    try {
        // Verify the token using the secret
        const decoded = jwt.verify(token, process.env.JWT_HIDDEN);
        
        // Attach the decoded user information to the request object
        req.user = decoded;
        
        // Proceed to the next middleware or route handler
        next();
    } catch (err) {
        // Return an error response if token verification fails
        return res.status(401).json({ message: "Authentication failed" });
    }
};

export default authenticate;