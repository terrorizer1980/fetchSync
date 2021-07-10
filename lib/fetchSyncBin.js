if (typeof fetch === "undefined") global.fetch = require("node-fetch");
const path = require("path");
const fs = require("fs");
const { tmpdir } = require("os");
const { FetchOptions, urlRequest } = process.env;
fetch(urlRequest, JSON.parse(FetchOptions || "{}")).then(res => res.arrayBuffer()).then(res => Buffer.from(res)).then(res => {
    const radomNameTmp = path.resolve(tmpdir(), Math.random().toString().replace(/[01]\./, "")+".tmpFetch");
    fs.writeFileSync(radomNameTmp, res, "binary");
    console.log(`TmpFetch*****\n${radomNameTmp}`);
    process.exit(0)
}).catch(res => {console.log(res); process.exit(2)})