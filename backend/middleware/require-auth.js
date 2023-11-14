const User = require('../models/user-model')
const jwt = require('jsonwebtoken')

const requireAuth = async (req, res, next) => {
  // verify user is authenticated
  const { authorization } = req.headers // one of the header properties is authorization. The idea is to add the authorization property (includes token) when sending requests from the frontend to backend

  if (!authorization) {
    return res.status(401).json({ error: 'Authorization token required' })
  }

  const token = authorization.split(' ')[1] // Authorization is made of two parts. We want to grab the token which is the second part

  try {
    const { _id } = jwt.verify(token, process.env.SECRET) // jwt.verify returns the token. We want to grab the id part of the token for future use

    req.user = await User.findOne({ _id }).select('_id') // allow future routes to access the user id via req.user._id
    next() // if authenticated, continue along the route

  } catch (error) {
    console.log(error)
    res.status(401).json({ error: 'Request is not authorized' })
  }
}

module.exports = requireAuth
