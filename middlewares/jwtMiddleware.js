const jwt = require('jsonwebtoken');

exports.jwtMiddleware = (req, res, next) => {
    
    console.log("________JWT Middleware_____");
    
    try {
        // access token from req   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjYyYWY2OTY2ZmRlNDgyMDZhMTA5Y2QiLCJpYXQiOjE3MTg3Nzc0ODN9.7-YMAHkKN9F0R7_fK6NxxUWosJXQ5yEQ3Ll-hhGZ6nk"
        const token = req.headers['access_token'].split(" ")[1]

        // verify
        const jwtResponse = jwt.verify(token, process.env.SECRET_KEY)
        console.log(jwtResponse.userId);

        // access the payload and store
        req.payload = jwtResponse.userId

        // exit from middleware function and continue
        next()
        
    }
    catch {
        res.status(401).json("authentication failed ! please login")

    }

   


}