const router = require('express').Router()
const { getExamples, addExample } = require('../controllers/example-controller')


router.get('/', getExamples);

router.post('/add', addExample);


module.exports = router;