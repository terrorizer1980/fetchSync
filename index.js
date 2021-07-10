#!/usr/bin/env node
// Inport Node Libs
const child_process = require("child_process");
const path = require("path");
const fs = require("fs");

// Exec Functions
function fetchSync(url = "https://www.google.com/search?q=Is+Test", options = {}, binary = false){
    if (options.method){if (options.method.toLocaleLowerCase() === "get") throw new Error("Please remove 'get' option from 'method'")}
    options = JSON.stringify(options)
    var BufferC;
    if (binary) {
        try {
            BufferC = child_process.execFileSync("node", [path.resolve(__dirname, "./lib/fetchSyncBin.js")], {env: {...process.env, FetchOptions: options, urlRequest: url}}).toString();
            BufferC = BufferC.split("TmpFetch*****");
            BufferC = BufferC[BufferC.length - 1];
            BufferC = BufferC.split("\n").filter(a=>a)[0];
            const BinaryBuffer = fs.readFileSync(BufferC);
            fs.rmSync(BufferC);
            return {
                Buffer: BinaryBuffer,
                SavePath: function(path = ""){
                    fs.writeFileSync(path, BinaryBuffer, "binary");
                    return path;
                }
            }
        } catch (err) {
            console.log(err)
        }
    }
    else {
        try {
            BufferC = child_process.execFileSync("node", [path.resolve(__dirname, "./lib/fetchSync.js")], {env: {...process.env, FetchOptions: options, urlRequest: url}}).toString();
            return {
                text: function(){return BufferC},
                json: function (){return JSON.parse(BufferC)},
            }
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = fetchSync;