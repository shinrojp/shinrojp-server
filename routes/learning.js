// create by tiennv597-2020/04/22

// 301 redirect: Moved Permanently (often best for SEO)
// 302 redirect: Found / Moved temporarily.
// 303 redirect: See Other.
// 307 redirect: Temporarily Redirect.
// 308 redirect: Permanent Redirect.

var express = require('express');
var router = express.Router();
var learnCtrl = require("../controllers/learn-controller")();
var JapaneseRegex = require("../common/JapaneseRegex")();

router.get('/learning/learning', function (req, res, next) {

	res.render('learning/settings.ejs', { title: "Learn" });

});

router.get('/learning/questions', function (req, res, next) { // get page questions

	res.render('learning/questions.ejs', { title: "Add Questions" });

});
router.post('/questions/add', function (req, res, next) { // insert question

	learnCtrl.addQuestions(req.body, function (pto) {
		res.send(pto);
	});
});
router.get('/learning/questions/api', function (req, res, next) {

	res.render('learning/questions.ejs', { title: "Add Questions" });

});

router.get('/learning/grammar', function (req, res, next) {  // page grammar

	learnCtrl.getGrammar(req.body, function (grammars) {
		res.render('learning/grammar.ejs', { title: "Grammar", grammars: grammars });

	});
});

router.post('/grammars/add', function (req, res, next) { //add grammar

	learnCtrl.addGrammar(req.body, function (pto) {
		res.redirect('/learning/grammar');
	});
});

router.post('/learning/grammar/edit', function (req, res, next) { //edit grammar

	learnCtrl.editGrammar(req.body, function (pto) {
		res.redirect('/learning/grammar');
	});
});

router.post('/learning/grammar/delete', function (req, res, next) { //delete grammar

	learnCtrl.deleteGrammar(req.body, function (pto) {
		res.redirect('/learning/grammar');

	});
});
router.get('/learning/grammar/api', function (req, res, next) {

	learnCtrl.getGrammar(req.body, function (grammars) {
		res.send(grammars);
	});
});

router.post('/learning/grammar/detail', function (req, res, next) { //page detail grammar

	learnCtrl.getGrammarById(req.body.grammar_id, function (grammar) {

		res.render('learning/grammar-detail.ejs', { title: "Detail", grammar: grammar });
	});

});

router.post('/learning/grammar/example/add', function (req, res, next) { //add example

	learnCtrl.addExample(req.body, function () {
		res.redirect(308, '/learning/grammar/detail');
	});

});

router.post('/learning/grammar/search', function (req, res, next) { //search grammar

	var detection = JapaneseRegex.detection(req.body.key_search);

	if (detection) { //Japanese characters found
		learnCtrl.getGrammarByJapanese(req.body.key_search, function (grammars) {
			res.render('learning/grammar.ejs', { title: "Grammar", grammars: grammars });
		});
	}
	else { //No Japanese characters
		learnCtrl.getGrammarByNoJapanese(req.body.key_search, function (grammars) {
			res.render('learning/grammar.ejs', { title: "Grammar", grammars: grammars });
		});
	}

});

router.post('/learning/example/search/api', function (req, res, next) {//search grammar

	var detection = JapaneseRegex.detection(req.body.key_search);

	if (detection) { //Japanese characters found
		
		learnCtrl.getExampleByJapanese(req.body.key_search, function (examples) {
			console.log(req.body.key_search);
			res.send(examples);;
		});
	}
	else { //No Japanese characters

		learnCtrl.getExampleByNoJapanese(req.body.key_search, function (examples) {
			console.log(req.body.key_search);
			res.send(examples);
		});
	}

});
module.exports = router;