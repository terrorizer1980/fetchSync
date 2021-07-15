#!/usr/bin/env node
// Inport Node Libs
const child_process = require("child_process");
const path = require("path");
const fs = require("fs");

function fetchSync(url = "https://google.com", options = {
    Binary: false,
    mode: "cors"
}){
    try {
        var ExecResult = child_process.execFileSync("node", [path.resolve(__dirname, "./lib/fetchSync.js")], {
            env: {
                ...process.env,
                urlRequest: url,
                FetchOptions: JSON.stringify(options)
            }
        }).toString("utf8");
        
        // Bin Function
        if (options.Binary) {
            ExecResult = ExecResult.split("TmpFetch*****");
            ExecResult = ExecResult[ExecResult.length - 1];
            ExecResult = ExecResult.split("\n").filter(a=>a);
            ExecResult = path.resolve(ExecResult)
            const FsBuffer = fs.readFileSync(ExecResult);
            fs.rmSync(ExecResult, {force: true})
            return {
                Buffer: FsBuffer,
                save: function(savePath = "./tmpFile.tmp") {
                    savePath = path.resolve(savePath)
                    fs.writeFileSync(savePath, FsBuffer, "binary");
                    return savePath
                }
            }
        } else {
            return {
                text: function(){return ExecResult},
                json: function(){return JSON.parse(ExecResult)},
            }
        }
    } catch(err) {
        const code = err.status;
        const stdout = err.stdout.toString();
        const stderr = err.stderr.toString();
        if (code === 14 || code === 15) {
            throw {stdout, stderr}
        } else {
            throw new Error("uncontrolled code", stdout, stderr)
        }
    }
}

module.exports = fetchSync