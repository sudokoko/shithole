const express = require('express')
const directory = require('serve-index');
const fileUpload = require('express-fileupload')
const app = express()
const port = 8000

/* create the upload endpoint */
app.use(fileUpload());

app.post('/api/v1/upload', function(req, res) {
  let uploadThisFuckingFile;
  let uploadPath;

  uploadThisFuckingFile = req.files.uploadThisFuckingFile;
  uploadPath = '/var/www/html/' + uploadThisFuckingFile.name;

  uploadThisFuckingFile.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);
    res.status(200).send("File was uploaded successfully, it should now appear on the dump.").end()
  });
});


/* serve the uploader */
app.use('*', express.static('static'))


app.listen(port, () => {
    if(port != 80 || port != 443)
    {
        console.warn(`You will probably need to do some jank shit with a tool like Portzilla to get the front-end accessible!`)
    }
  console.log(`App listening on port ${port}`)
})
