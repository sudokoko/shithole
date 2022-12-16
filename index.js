const express = require('express')
const directory = require('serve-index');
const fileUpload = require('express-fileupload')
const app = express()
const port = 8000

/* create the "file listing" page */
app.use('/', directory(__dirname + '/content'));

/* serve the uploader */
app.use('/shit', express.static('static'))

/* create the upload endpoint */
app.use(fileUpload());

app.post('/upload', function(req, res) {
  let uploadThisFuckingFile;
  let uploadPath;

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  uploadThisFuckingFile = req.files.uploadThisFuckingFile;
  uploadPath = __dirname + '/content/' + uploadThisFuckingFile.name;

  // Use the mv() method to place the file somewhere on your server
  uploadThisFuckingFile.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);
    res.status(200).end()
  });
});

app.listen(port, () => {
    if(port === 8000)
    {
        console.warn(`If you plan on using this legitimately, please change the port variable to 443 :)`)
    }
  console.log(`App listening on port ${port}`)
})