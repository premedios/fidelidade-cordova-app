#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const CORDOVA_GRADLE = path.join(
    __dirname,
    "..",
    "platforms",
    "android",
    "CordovaLib",
    "cordova.gradle",
);

// Matches "XMLParser" not already preceded by "xml.groovy."
const XMLPARSER_PATTERN = /(?<!xml\.groovy\.)XMLParser/g;
const XMLPARSER_REPLACEMENT = "xml.groovy.XMLParser";

module.exports = function () {
    if (!fs.existsSync(CORDOVA_GRADLE)) {
        console.warn("cordova.gradle not found, skipping XMLParser fix.");
        return;
    }

    const original = fs.readFileSync(CORDOVA_GRADLE, "utf8");

    if (!XMLPARSER_PATTERN.test(original)) {
        XMLPARSER_PATTERN.lastIndex = 0;
        return;
    }
    XMLPARSER_PATTERN.lastIndex = 0;

    const updated = original.replace(XMLPARSER_PATTERN, XMLPARSER_REPLACEMENT);

    fs.writeFileSync(CORDOVA_GRADLE, updated, "utf8");
    console.log("Fixed XMLParser in CordovaLib/cordova.gradle");
};
