#!/usr/bin/env node
// Inport Node Libs
const child_process = require("child_process");
const path = require("path");
const fs = require("fs");

function fetchSync(url = "https://google.com", options = {
    Binary: false,
    binary: false,
    mode: "cors"
}){
    var ExecResult = child_process.execFileSync("node", [path.resolve(__dirname, "./lib/fetchSync.js")], {
        env: {
            ...process.env,
            urlRequest: url,
            FetchOptions: JSON.stringify(options)
        }
    }).toString("utf8");
    

    // Bin Function
    if ((options.Binary || options.binary)) {
        ExecResult = path.resolve(ExecResult.split("\n").filter(a=>a).join(""))
        const FsBuffer = fs.readFileSync(ExecResult);
        fs.rmSync(ExecResult, {force: true})
        const Func = {
            Buffer: FsBuffer,
            save: function(savePath = "./tmpFile.tmp") {
                savePath = path.resolve(savePath)
                fs.writeFileSync(savePath, FsBuffer, "binary");
                return savePath
            }
        }
        Func["SavePath"] = Func.save
        return Func
    } else {
        return {
            text: function(){return ExecResult},
            json: function(){return JSON.parse(ExecResult)},
        }
    }
}

module.exports = fetchSync