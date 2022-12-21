const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const app = express();
const port = 8000;

/* create the upload endpoint */
app.use(fileUpload());

app.post('/api/v1/upload/:nsfw', function (req, res) {
  let uploadThisFuckingFile;
  let uploadPath;
  let literalFilePath;
  let isNsfw;

  uploadThisFuckingFile = req.files.uploadThisFuckingFile;
  uploadPath = '/var/www/html/' + uploadThisFuckingFile.name;
  literalFilePath = uploadThisFuckingFile.name;
  isNsfw = req.query.nsfw;

  const banList = fs.readFileSync("/var/www/html/configuration/bans.txt");
  var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;

  if (banList.includes(ip)) {
    res.status(403).send("You are permanently banned from uploading content to this shithole instance because you have previously uploaded illegal, malicious, or copyrighted content.").end();
  } else if (uploadPath.includes("index")) {
    return res.status(403).send("您好 " + ip + "，您似乎正在尝试上传 index.html 文件。 不要那样做你这只傻鹅！").end();
  } else if (literalFilePath.includes("/") || literalFilePath.includes("\\") || literalFilePath.includes("..") || literalFilePath.includes("%2F") || literalFilePath.includes("%5C")) {
    res.status(403).send("no! th-thats dirty... you can't do that..!").end()
  } else {
    uploadThisFuckingFile.mv(uploadPath, function (err) {
      if (err)
        return res.status(500).send(err);
      if (isNsfw === "true") {
        fs.appendFileSync('/var/www/html/.htaccess', 'AddDescription "This file contains content flagged as NSFW." ' + literalFilePath + '\n')
      }
      fs.appendFileSync('/var/www/html/configuration/upload.log', '[' + ip + ' -> POST /api/v1/upload] ' + literalFilePath + '\n'); // logging. because people are dumb.
      res.status(200).send("File was uploaded successfully, it should now appear on the dump.").end();
    });
  }
});

/* serve the uploader */
app.use('*', express.static('static'));


app.listen(port, () => {
  if (port != 80 || port != 443) {
    console.warn(`You will probably need to do some jank shit with a tool like a port proxy to get the front-end accessible!`);
  }
  console.log(`App listening on port ${port}`);
})
