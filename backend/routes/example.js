const router = require('express').Router()
let Example = require('../models/example.model');


router.route('/').get((req, res) => {
  Example.find()
    .then(examples => res.json(examples))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/add').post((req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const date = Date.parse(req.body.date);


  const newExample = new Example({
    name,
    description,
    date,
  });


  newExample.save()
    .then(() => res.json('Example added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;

;
