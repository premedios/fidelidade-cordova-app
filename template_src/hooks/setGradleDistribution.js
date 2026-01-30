#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const ANDROID_WRAPPER = path.join(
    __dirname,
    "..",
    "..",
    "platforms",
    "android",
    "gradle",
    "wrapper",
    "gradle-wrapper.properties",
);

const TARGET_URL = "distributionUrl=https\\://services.gradle.org/distributions/gradle-9.0.0-bin.zip";

function updateGradleWrapper(filePath) {
    if (!fs.existsSync(filePath)) {
        return;
    }

    const original = fs.readFileSync(filePath, "utf8");
    const lines = original.split(/\r?\n/);

    let updated = false;
    let found = false;

    const nextLines = lines.map((line) => {
        if (line.startsWith("distributionUrl=")) {
            found = true;
            if (line !== TARGET_URL) {
                updated = true;
                return TARGET_URL;
            }
        }
        return line;
    });

    if (!found) {
        nextLines.push(TARGET_URL);
        updated = true;
    }

    if (updated) {
        const trailingNewline = original.endsWith("\n") ? "\n" : "";
        fs.writeFileSync(filePath, nextLines.join("\n") + trailingNewline, "utf8");
        console.log("Updated Gradle wrapper distributionUrl to 9.0.0");
    } else {
        console.log("Gradle wrapper distributionUrl already set to 9.0.0");
    }
}

updateGradleWrapper(ANDROID_WRAPPER);
