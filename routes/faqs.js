var express = require('express');
var router = express.Router();
var faqsModel = require ('../models/faqsModel');

/* GET FAQs page. */
router.get('/', async function (req, res, next) {
  var faqs = await faqsModel.getFaqs();
  res.render('faqs', {
   faqs
   });
});

module.exports = router;