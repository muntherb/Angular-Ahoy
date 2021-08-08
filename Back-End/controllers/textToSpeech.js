const fs = require('fs');
const path = require('path');
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
var id;


exports.deleteFile = function(req, res){
  var file = req.body.text
  fs.stat(`Text2Speech/src/assets/VoiceFile${file}.wav`, function (err, stats) {
    console.log(stats);//here we got all information of file in stats variable
    if (err) {
        return console.error(err);
    }
    fs.unlink(`Text2Speech/src/assets/VoiceFile${file}.wav`,function(err){
         if(err) return console.log(err);
         console.log('file deleted successfully');
         res.end(`Deleted!`);
    });  
 });
}



exports.IbmFunction =function(req, res,){
  res.setHeader('Access-Control-Allow-Origin', '*');
  const text = req.body.text
   id = req.body.id
  const textToSpeech = new TextToSpeechV1({
    authenticator: new IamAuthenticator({
      apikey: 'wGujP0VDuSUrXC9K7yYe2Ybddamh9MflUt32-7CKbAuz',
    }),
    serviceUrl: 'https://api.eu-gb.text-to-speech.watson.cloud.ibm.com/instances/b59ba72d-e64d-4876-9161-41b307478967',
  });
  
  const synthesizeParams = {
    text: text,
    accept: 'audio/wav',
    voice: 'en-US_AllisonV3Voice',
  };
  
  textToSpeech.synthesize(synthesizeParams)
    .then(response => {
      return textToSpeech.repairWavHeaderStream(response.result);
    })
    .then(buffer => {
      var path = `Text2Speech/src/assets/VoiceFile${text}.wav`
      fs.writeFileSync(path, buffer);
      res.json({Voice: req.body});
    })
    .catch(err => {
      console.log('error:', err);
    });

}


exports.getAll = function(req, res){
  readFilesSync(`Text2Speech/src/assets`)
  function readFilesSync(dir) {
    const files = [];
  
    fs.readdirSync(dir).forEach(filename => {
      const name = path.parse(filename).name.substring(9)
      const filepath = path.resolve(dir, filename);
      const stat = fs.statSync(filepath);
      const isFile = stat.isFile();
      if (isFile) files.push({"text": name});
    });
    files.sort((a, b) => {
      // natural sort alphanumeric strings
      // https://stackoverflow.com/a/38641281
      return a.text.localeCompare(b.text, undefined, { numeric: true, sensitivity: 'base' });
    });
  
    return res.json(files);
  }
}

exports.searchWithQuery = function(req, res){
  console.log(req.query.id)
  res.end('success')
}