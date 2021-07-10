if (typeof fetch === "undefined") global.fetch = require("node-fetch");
const {writeFileSync} = require("fs")
var { FetchOptions, urlRequest } = process.env;
FetchOptions = JSON.parse(FetchOptions || "{}");
fetch(urlRequest, FetchOptions).then(res => res.text()).then(res => {
    console.log(res);
    process.exit(0)
}).catch(res => {
    writeFileSync("./Catch,json", res)
    process.exit(2)
})