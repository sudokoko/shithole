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
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files.sampleFile;
  uploadPath = __dirname + '/content/' + sampleFile.name;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });
  
  res.end();
});

app.listen(port, () => {
    if(port === 8000)
    {
        console.warn(`If you plan on using this legitimately, please change the port variable to 443 :)`)
    }
  console.log(`App listening on port ${port}`)
})