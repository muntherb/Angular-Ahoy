const { Router } = require('express');
var express = require('express');
var router = express.Router();
var speechController = require('../controllers/textToSpeech')

// var playAudioFile = require('../controllers/textToSpeech')

/* POST */
router.post('/', speechController.IbmFunction);

router.post('/delete', speechController.deleteFile)

router.get('/get', speechController.getAll)

router.get('/:text', speechController.searchWithQuery)


module.exports = router;
