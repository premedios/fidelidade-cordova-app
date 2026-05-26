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

// Matches "XMLParser" (case-insensitive) not preceded by "." (excludes .XMLParser and xml.groovy.XMLParser)
const XMLPARSER_PATTERN = /(?<!\.)XMLParser/gi;
const XMLPARSER_REPLACEMENT = "groovy.xml.XmlParser";

module.exports = function () {
    if (!fs.existsSync(CORDOVA_GRADLE)) {
        console.warn("cordova.gradle not found, skipping XMLParser fix.");
        return;
    }

    const original = fs.readFileSync(CORDOVA_GRADLE, "utf8");

    const updated = original
        .split("\n")
        .map((line) => {
            const trimmed = line.trim();
            // Skip comment lines
            if (
                trimmed.startsWith("//") ||
                trimmed.startsWith("/*") ||
                trimmed.startsWith("*")
            ) {
                return line;
            }
            return line.replace(XMLPARSER_PATTERN, XMLPARSER_REPLACEMENT);
        })
        .join("\n");

    if (updated === original) {
        console.log("XMLParser already fixed in cordova.gradle, skipping.");
        return;
    }

    fs.writeFileSync(CORDOVA_GRADLE, updated, "utf8");
    console.log("Fixed XMLParser in CordovaLib/cordova.gradle");
};
