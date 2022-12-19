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
  
  if(uploadPath.includes("/") || uploadPath.includes("\\") || uploadPath.includes("..") || uploadPath.includes("%2F") || uploadPath.includes("%5C")) {
    res.status(403).send("no! th-thats dirty... you can't do that..!").end()
  }

  if(uploadPath.includes("index")) {
    var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
    return res.status(403).send("您好 "+ ip + "，您似乎正在尝试上传 index.html 文件。 不要那样做你这只傻鹅！").end();
  } else {
    uploadThisFuckingFile.mv(uploadPath, function(err) {
      if (err)
        return res.status(500).send(err);
      res.status(200).send("File was uploaded successfully, it should now appear on the dump.").end();
    });
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
