'use strict';

const express = require('express');
const app = express();
var path  = require("path");

app.get('/', (req, res) => res.sendFile(path.join(__dirname+'/index.html')));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(process.env.PORT || 8080, () => console.log(
	`Your app is listening on port ${process.env.PORT || 8080}`)
);
