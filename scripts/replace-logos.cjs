// Replace Logos Script v1
// Replaces logo <img> tags with ecosystemName text span
// Uses line-by-line matching with strict boundaries

const fs = require("fs");
const path = require("path");

const BASE = path.resolve(__dirname, "..", "src", "pages");
const DIRS = ["Templates", "UserTemplate", "EditTemplate"];

let totalFiles = 0;
let totalPatches = 0;

// All known logo src patterns to match
const STATIC_LOGO_URLS = [
  "gfa-tech.com/dimp-template-images/images/demo-barber-logo-black.png",
  "gfa-tech.com/dimp-template-images/images/demo-beauty-salon-logo-black.png",
  "gfa-tech.com/dimp-template-images/images/demo-beauty-salon-logo-white.png",
  "gfa-tech.com/dimp-template-images/images/demo-spa-salon-logo-white.png",
  "gfa-tech.com/dimp-template-images/make-up/about-logo.png",
  "gfa-tech.com/dimp-template-images/make-up/make6-logo.png",
  "gfa-tech.com/dimp-template-images/make-up/newlogo.png",
];

const DYNAMIC_LOGO_PATTERNS = [
  "details.navbar.logo",
  "details && details.navbar.logo",
];

function isLogoLine(line) {
  for (const url of STATIC_LOGO_URLS) {
    if (line.includes(url)) return true;
  }
  for (const pat of DYNAMIC_LOGO_PATTERNS) {
    if (line.includes(pat)) return true;
  }
  return false;
}

function isInsideComment(lines, targetIndex) {
  let inComment = false;
  for (let i = 0; i <= targetIndex; i++) {
    const line = lines[i];
    let pos = 0;
    while (pos < line.length) {
      if (!inComment) {
        const openIdx = line.indexOf("{/*", pos);
        if (openIdx === -1) break;
        const closeIdx = line.indexOf("*/}", openIdx + 3);
        if (closeIdx !== -1) {
          pos = closeIdx + 3;
        } else {
          inComment = true;
          break;
        }
      } else {
        const closeIdx = line.indexOf("*/}", pos);
        if (closeIdx === -1) break;
        inComment = false;
        pos = closeIdx + 3;
      }
    }
  }
  return inComment;
}

function processFile(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n");
  let modified = false;
  let patches = 0;
  const skip = new Set();

  for (let i = 0; i < lines.length; i++) {
    if (skip.has(i)) continue;
    const line = lines[i];

    if (!isLogoLine(line)) continue;
    if (line.trim().startsWith("//") || line.trim().startsWith("{/*")) continue;
    if (isInsideComment(lines, i)) continue;

    // Find the <img opening by scanning back (max 3 lines)
    let imgStart = -1;
    for (let j = i; j >= Math.max(0, i - 3); j--) {
      if (lines[j].includes("<img")) {
        imgStart = j;
        break;
      }
    }

    if (imgStart === -1) {
      console.log("  WARN: No <img found near line " + (i + 1) + " in " + filePath);
      continue;
    }

    // Verify imgStart isn't inside a comment
    if (isInsideComment(lines, imgStart)) continue;

    // Find the /> closing (max 5 lines forward from imgStart)
    let imgEnd = -1;
    for (let j = imgStart; j < Math.min(lines.length, imgStart + 6); j++) {
      if (lines[j].includes("/>")) {
        imgEnd = j;
        break;
      }
    }

    if (imgEnd === -1) {
      console.log("  WARN: No /> found near line " + (imgStart + 1) + " in " + filePath);
      continue;
    }

    if ((imgEnd - imgStart) > 5) {
      console.log("  WARN: <img> tag too long (" + (imgEnd - imgStart + 1) + " lines) at line " + (imgStart + 1) + " in " + filePath + " - SKIPPING");
      continue;
    }

    // Get the indent from the <img start line
    const indent = lines[imgStart].match(/^(\s*)/)[1];

    // Replace the entire <img ... /> with the span
    const replacement = indent + '<span className="text-2xl font-bold">{userDetails?.ecosystemName || ""}</span>';

    // Replace lines imgStart..imgEnd with the single replacement line
    lines.splice(imgStart, imgEnd - imgStart + 1, replacement);

    // Adjust skip set (lines shifted)
    const removedCount = imgEnd - imgStart; // number of extra lines removed
    skip.add(imgStart);

    patches++;
    modified = true;

    // Adjust i since we removed lines
    i = imgStart;
  }

  if (modified) {
    fs.writeFileSync(filePath, lines.join("\n"), "utf-8");
    console.log("  Fixed " + filePath + " (" + patches + " replacements)");
    totalPatches += patches;
    totalFiles++;
  }
}

function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath);
    } else if (entry.name.endsWith(".jsx") || entry.name.endsWith(".js")) {
      processFile(fullPath);
    }
  }
}

console.log("=== Replace Logos Script v1 ===\n");

for (const dir of DIRS) {
  const fullDir = path.join(BASE, dir);
  console.log("Processing " + dir + "/...");
  walkDir(fullDir);
}

console.log("\nDone! Fixed " + totalFiles + " files with " + totalPatches + " logo replacements.");
