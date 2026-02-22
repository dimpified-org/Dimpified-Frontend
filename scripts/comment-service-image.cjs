// SAFE ServiceImage Commenting Script v4
// Comments out the ENTIRE <img> tag containing serviceImage
// Properly tracks multi-line JSX comment blocks to avoid nested comments

const fs = require("fs");
const path = require("path");

const BASE = path.resolve(__dirname, "..", "src", "pages");
const DIRS = ["Templates", "UserTemplate", "EditTemplate"];

let totalFiles = 0;
let totalPatches = 0;

// Check if a given line index is inside a {/* ... */} comment block
function isInsideComment(lines, targetIndex) {
  let inComment = false;
  for (let i = 0; i <= targetIndex; i++) {
    const line = lines[i];
    // Simple scan: look for {/* and */} on each line
    // A line can open and close a comment on the same line
    let pos = 0;
    while (pos < line.length) {
      if (!inComment) {
        const openIdx = line.indexOf("{/*", pos);
        if (openIdx === -1) break;
        // Check if this comment closes on the same line
        const closeIdx = line.indexOf("*/}", openIdx + 3);
        if (closeIdx !== -1) {
          // Comment opens and closes on this line
          if (i === targetIndex && targetIndex === i) {
            // target is on this line - check if target col is inside
            // For simplicity, if the line has serviceImage and it's between open/close, it's commented
          }
          pos = closeIdx + 3;
        } else {
          // Comment opens but doesn't close on this line
          inComment = true;
          break;
        }
      } else {
        const closeIdx = line.indexOf("*/}", pos);
        if (closeIdx === -1) {
          // Still inside comment
          break;
        } else {
          inComment = false;
          pos = closeIdx + 3;
        }
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
  const skip = new Set(); // lines already handled

  for (let i = 0; i < lines.length; i++) {
    if (skip.has(i)) continue;
    const line = lines[i];

    if (!line.includes("service.serviceImage")) continue;

    // Skip lines already commented on the same line
    if (line.trim().startsWith("{/*") || line.trim().startsWith("/*")) continue;

    // Skip if inside a multi-line comment block
    if (isInsideComment(lines, i)) {
      continue;
    }

    // --- Pattern A: Inside an <img> tag ---
    let imgStart = -1;
    let imgEnd = -1;

    // Check if current line or nearby lines have <img
    for (let j = i; j >= Math.max(0, i - 5); j--) {
      if (lines[j].includes("<img")) {
        imgStart = j;
        break;
      }
    }

    if (imgStart !== -1) {
      // Find the closing />
      for (let j = imgStart; j < Math.min(lines.length, imgStart + 8); j++) {
        if (lines[j].includes("/>")) {
          imgEnd = j;
          break;
        }
      }
    }

    if (imgStart !== -1 && imgEnd !== -1 && (imgEnd - imgStart) <= 7) {
      // Verify imgStart is not inside a comment either
      if (isInsideComment(lines, imgStart)) {
        continue;
      }
      // Comment out the entire <img ... /> block
      const indent = lines[imgStart].match(/^(\s*)/)[1];
      lines[imgStart] = indent + "{/* " + lines[imgStart].trimStart();
      lines[imgEnd] = lines[imgEnd].trimEnd() + " */}";
      for (let j = imgStart; j <= imgEnd; j++) skip.add(j);
      patches++;
      modified = true;
      i = imgEnd;
      continue;
    }

    // --- Pattern B: backgroundImage style ---
    if (line.includes("backgroundImage") && line.includes("service.serviceImage")) {
      const indent = line.match(/^(\s*)/)[1];
      lines[i] = indent + "/* " + line.trim() + " */";
      skip.add(i);
      patches++;
      modified = true;
      continue;
    }

    // --- Pattern C: {service.serviceImage && ( ... )} conditional block ---
    if (line.includes("service.serviceImage") && line.includes("&&")) {
      let blockStart = i;
      let blockEnd = -1;

      // Count parens to find matching )}
      let depth = 0;
      let foundOpen = false;
      for (let j = i; j < Math.min(lines.length, i + 25); j++) {
        for (const ch of lines[j]) {
          if (ch === "(") { depth++; foundOpen = true; }
          if (ch === ")") {
            depth--;
            if (foundOpen && depth === 0) {
              blockEnd = j;
              break;
            }
          }
        }
        if (blockEnd !== -1) break;
      }

      if (blockEnd !== -1 && (blockEnd - blockStart) <= 25) {
        const indent = lines[blockStart].match(/^(\s*)/)[1];
        lines[blockStart] = indent + "{/* " + lines[blockStart].trim().replace(/^\{/, "");
        lines[blockEnd] = lines[blockEnd].replace(/\)\s*\}/, ") */}");
        for (let j = blockStart; j <= blockEnd; j++) skip.add(j);
        patches++;
        modified = true;
        i = blockEnd;
        continue;
      }
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, lines.join("\n"), "utf-8");
    console.log("  Fixed " + filePath + " (" + patches + " patterns)");
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

console.log("=== ServiceImage Commenting Script v4 ===\n");

for (const dir of DIRS) {
  const fullDir = path.join(BASE, dir);
  console.log("Processing " + dir + "/...");
  walkDir(fullDir);
}

console.log("\nDone! Fixed " + totalFiles + " files with " + totalPatches + " pattern replacements.");
