const express = require('express')
const router = express.Router()
const authController = require('../controller/auth')
const homeController = require('../controller/home')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', homeController.getIndex)
router.get('/login',ensureAuth, authController.getLogin)
router.post('/login',ensureAuth, authController.postLogin)
router.get('/logout',ensureAuth, authController.logout)
router.get('/signup',ensureAuth, authController.getSignup)
router.post('/signup',ensureAuth, authController.postSignup)

module.exports = router