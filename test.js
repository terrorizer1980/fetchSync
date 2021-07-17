const fetchSync = require("./index");
const { exit } = process;
const { tmpdir } = require("os");
const { resolve } = require("path");

// Home Page Google
try {
    const GoogleHomePage = fetchSync("https://google.com");
    GoogleHomePage.text()
} catch (error) {
    console.log("Unable to fetch the Google page");
    exit(1);
}

// Get Bds Maneger Server JSON
try {
    const BdsManegerServers = fetchSync("https://raw.githubusercontent.com/The-Bds-Maneger/Raw_files/main/Server.json");
    BdsManegerServers.json()
} catch (error) {
    console.log("Unable to get JSON from Server");
    exit(2);
}

// Php Bin
try {
    const php_urls = fetchSync("https://raw.githubusercontent.com/The-Bds-Maneger/Php_Static_Binary/main/binarys.json").json();
    const urlPhp = php_urls["linux"]["x64"];
    // console.log(urlPhp);
    const php_zip = fetchSync(urlPhp, {
        Binary: true
    });
    php_zip.SavePath(resolve(tmpdir(), Math.random().toString() + "-testTmp.zip"))
} catch (error) {
    console.log("Unable to download php zip file");
    console.log(error)
    exit(3);
}