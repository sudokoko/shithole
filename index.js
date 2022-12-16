const express = require('express')
const directory = require('serve-index');
const fileUpload = require('express-fileupload')
const app = express()
const port = 8000

/* everything will be routed to /var/www/html */

/* create the upload endpoint */
app.use(fileUpload());

app.post('/api/v1/upload', function(req, res) {
  let uploadThisFuckingFile;
  let uploadPath;

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  uploadThisFuckingFile = req.files.uploadThisFuckingFile;
  uploadPath = '/var/www/html/' + uploadThisFuckingFile.name;

  // Use the mv() method to place the file somewhere on your server
  uploadThisFuckingFile.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);
    res.status(200).send("File was uploaded successfully, it should now appear on the dump.").end()
  });
});

/* serve the uploader */
app.use('*', express.static('static'))

app.listen(port, () => {
    if(port === 8000)
    {
        console.warn(`If you plan on using this legitimately, please change the port variable to 443 :)`)
    }
  console.log(`App listening on port ${port}`)
})
