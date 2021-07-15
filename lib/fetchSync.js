if (typeof fetch === "undefined") global.fetch = require("node-fetch");
const path = require("path");
const fs = require("fs");
const { tmpdir } = require("os");
const { urlRequest } = process.env;

const FetchOptions = JSON.parse(process.env.FetchOptions || "{}");

/**
 * Exit Codes
 * 
 * 14 => RES.ok === false
 * 
 * 15 => Catch Error
 */

if (FetchOptions.Binary) {
    delete FetchOptions.Binary;
    fetch(urlRequest, FetchOptions).then(res => {
        if (res.ok) return res.arrayBuffer(); else {
            console.log(JSON.stringify(res));
            process.exit(14)
        }
    }).then(res => Buffer.from(res)).then(res => {
        const radomNameTmp = path.resolve(tmpdir(), Math.random().toString().replace(/[01]\./, "")+".tmpFetch");
        fs.writeFileSync(radomNameTmp, res, "binary");
        console.log(`TmpFetch*****\n${radomNameTmp}`);
        process.exit(0)
    }).catch(res => {console.log(res); process.exit(15)})
} else {
    fetch(urlRequest, FetchOptions).then(res => {
        if (res.ok) return res.text(); else {
            console.log(JSON.stringify(res));
            process.exit(14)
        }
    }).then(res => {
        console.log(res);
        process.exit(0)
    }).catch(res => {console.log(res); process.exit(15)})
}

