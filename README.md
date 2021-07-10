# fetchSync

Fetch Sync remote files in different methods such as Buffer (It is also possible to Save the file with the SavePath option), text and json.

## Heads up!!

This option needs to have NodeJS above 14.x Installed on your system to use.

## Installation

npm registry: `npm install @the-bds-maneger/fetchsync`.

Github Repository: `npm install https://github.com/The-Bds-Maneger/fetchSync.git`

## Examples

***get JSON***:
```javascript
const fetchSync = require("@the-bds-maneger/fetchsync");
const userIPInfo = fetchSync("https://ipinfo.io/json").json();
console.log(userIPInfo);
```

***Get HTML***:
```javascript
const fetchSync = require("@the-bds-maneger/fetchsync");
const ExampleCom = fetchSync("https://example.com/").text();
fs.writeFileSync("./Example.html", ExampleCom);
```

***Get ZIP File***:
```javascript
const fetchSync = require("@the-bds-maneger/fetchsync");
const adm_zip = require("adm-zip");
const zip = new adm_zip(fetchSync("https://example.com/Example.zip", {}, true).Buffer);
zip.extraAll("/tmp/ZipZipDir/")
```