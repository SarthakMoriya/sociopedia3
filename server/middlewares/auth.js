// import jwt from 'jsonwebtoken';
// //AUTHORIZATION
// //to verify the token to give access to various functions of app to loggedin users only...

// export const verifyToken = async (req, res, next) => {
//     try {
//         let token = req.header('Authorization');

//         if (!token) return req.status(403).send('Access Denied...!')

//         if (token.startsWith('Bearer ')) token = token.split(' ')[1];

//         const verified = jwt.verify(token, process.env.JWT_SECRET)

//         //set new verified property on user
//         //userId miljayrgi in req.user
//         req.user = verified
//         //new where ever this middleware is used on success req.user will be availabe to following request
//         next();
//     } catch (error) {
//         res.status(500).json({ msg: "Access Denied...!", error: error });
//     }
// }

import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization");
        if (!token) {
            return res.status(403).send("Access Denied");
        }

        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }
        console.log(token)

        const verified = jwt.verify(token, 'process.env.JWT_SECRET');
        req.user = verified;
        next();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};