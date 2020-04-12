var express = require('express');
var router = express.Router();
var questionsCtrl = require("../controllers/questions")();

router.get('/learning/questions', function(req, res, next) {

	res.render('learning/questions.ejs', {title:"Add Questions"});
		
});
router.post('/questions/add', function(req, res, next) {
		questionsCtrl.add(req.body, function(pto){
			res.send(pto);
		});
});
                                     									
module.exports = router;