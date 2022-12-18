const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const app = express();
const port = 8000;

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
    res.status(200).send("File was uploaded successfully, it should now appear on the dump.").end();
  });
});

app.get('/api/v1/delete', function(req, res) {
  let auth = req.params.token;
  let file = req.params.path; 

  if(auth = process.env.MODERATION_TOKEN)
  {
    fs.unlinkSync("/var/www/html/" + file);
    res.status(200).send("File has been deleted.").end();
  } else {
    res.status(403).send("You are not authorized to perform this action").end();
  }
});

/* serve the uploader */
app.use('*', express.static('static'));


app.listen(port, () => {
    if(port != 80 || port != 443)
    {
        console.warn(`You will probably need to do some jank shit with a tool like a port proxy to get the front-end accessible!`);
    }
  console.log(`App listening on port ${port}`);
})
