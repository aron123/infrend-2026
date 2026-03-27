"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
app.listen(3000, function (err) {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Listening on port 3000 ...');
});
