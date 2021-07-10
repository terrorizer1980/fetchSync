const path = require("path");
const fs = require("fs");
const package_json = require("../package.json");
const { actions_id } = process.env;

const new_version = [
    actions_id.slice(0,2),
    actions_id.slice(3,5),
    actions_id.slice(6),
]
package_json.version = new_version.join(".")
console.log(package_json.version);
fs.writeFileSync(path.resolve(__dirname, "../package.json"), JSON.stringify(package_json, null, 2))