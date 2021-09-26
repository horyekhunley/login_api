// const jwt = require('jsonwebtoken')
// require('dotenv').config({ path: './config.env' })

// const auth = (req, res, next ) => {
//     const token = req.header('x-access-token')

//     if(!token) return res.status(406).json({ err: "You are not authorized to do this"})

//     const verified = jwt.verify(token, process.env.JWT_SECRET)
//     if(!verified) return res.status(406).json({ err: 'You are not authorized to do this'})

//     req.user_.id = verified.id
//     next()
// }

// module.exports = auth