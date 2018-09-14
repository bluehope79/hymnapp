var express = require('express');
var router = express.Router();

var Board = require('../models/board');

/* GET home page. */
router.get('/', function(req, res, next) {
  Board.find({}, function (err, board) {
      res.render('index', { title: '찬송가봇', board: board });
  });
});

/* Write board page */
router.get('/write', function(req, res, next) {
    res.render('write', { title: '등록' });
});

/* board insert mongo */
router.post('/board/write', function (req, res) {
  var board = new Board();
  board.title = req.body.title;
  board.contents = req.body.contents;
  board.author = req.body.author;

  board.save(function (err) {
    if(err){
      console.log(err);
      res.redirect('/');
    }
    res.redirect('/');
  });
});


/* board edit mongo */
router.post('/board/edit', function (req, res) {
    var board = new Board();
    board.contents = req.body.modcontents;
    
    Board.findOneAndUpdate({_id : req.body.id}, {$set:{contents:req.body.modcontents}} , function (err, board) {
        if(err){
            console.log(err);
            res.redirect('/');
        }
        res.redirect('/board/'+req.body.id);
    });

});

/* board find by id */
router.get('/board/:id', function (req, res) {
    Board.findOne({_id: req.params.id}, function (err, board) {
        res.render('board', { title: '찬양봇', board: board });
    })
});



/* comment insert mongo*/
router.post('/comment/write', function (req, res){
    var comment = new Comment();
    comment.contents = req.body.contents;
    comment.author = req.body.author;

    Board.findOneAndUpdate({_id : req.body.id}, { $push: { comments : comment}}, function (err, board) {
        if(err){
            console.log(err);
            res.redirect('/');
        }
        res.redirect('/board/'+req.body.id);
    });
});

module.exports = router;
