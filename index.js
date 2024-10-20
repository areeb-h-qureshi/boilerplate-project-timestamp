// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use('/public', express.static(__dirname + '/public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", function(req, res) {
  let unix = req.params.date;
  let utc;
  if (!unix) {
    unix = "";
    utc = new Date();
  } else if (isNaN(unix)) {
    utc = new Date(unix);
  } else {
    utc = new Date(Number(unix));
  }

  if (utc.toString() === 'Invalid Date') {
    console.log({ error: 'Invalid Date' });
    return res.json({ error: 'Invalid Date' });
  } else {
    console.log({ unix: utc.getTime(), utc: utc.toUTCString() });
    return res.json({ unix: utc.getTime(), utc: utc.toUTCString() });
  }
})

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
