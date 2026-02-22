// Comment Edit Image Script v1
// Comments out image editing functionality on EditTemplate pages
// Handles: import, destructuring, permission check blocks, file input tags

const fs = require("fs");
const path = require("path");

const BASE = path.resolve(__dirname, "..", "src", "pages", "EditTemplate");

let totalFiles = 0;
let totalPatches = 0;

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

  // === Phase 1: Comment out import { useImageEditor } ===
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes("useImageEditor") && lines[i].trim().startsWith("import")) {
      lines[i] = "// " + lines[i];
      skip.add(i);
      patches++;
      modified = true;
      break;
    }
  }

  // === Phase 2: Comment out the destructuring block ===
  // Pattern: const { fileInputRefs, handleEditImageClick, handleImageChange, loadingImage } = useImageEditor();
  for (let i = 0; i < lines.length; i++) {
    if (skip.has(i)) continue;
    // Look for the start: "const {" or "const{" followed by fileInputRefs within next few lines
    if (lines[i].includes("useImageEditor()") || lines[i].includes("useImageEditor ()")) {
      // This line has the call - find the start (const {) by scanning back
      let blockStart = i;
      for (let j = i; j >= Math.max(0, i - 8); j--) {
        if (lines[j].trim().startsWith("const {") || lines[j].trim().startsWith("const{")) {
          blockStart = j;
          break;
        }
      }
      // Comment out all lines from blockStart to i
      for (let j = blockStart; j <= i; j++) {
        if (!lines[j].trim().startsWith("//")) {
          lines[j] = "// " + lines[j];
        }
        skip.add(j);
      }
      patches++;
      modified = true;
      break;
    }
  }

  // === Phase 3: Comment out {userPlan && userPermissions.canEditImage ...} blocks ===
  for (let i = 0; i < lines.length; i++) {
    if (skip.has(i)) continue;

    const line = lines[i];
    // Match lines containing the permission check for edit image
    if (!line.includes("userPermissions") || !line.includes("canEditImage")) continue;
    if (line.trim().startsWith("//") || line.trim().startsWith("{/*")) continue;
    if (isInsideComment(lines, i)) continue;

    // Find the opening { for this JSX expression
    // It should be on this line or the line before
    let blockStart = i;
    const trimmed = line.trim();

    // Check if the { is on this line
    if (trimmed.startsWith("{")) {
      blockStart = i;
    } else {
      // Check previous line for standalone {
      for (let j = i - 1; j >= Math.max(0, i - 2); j--) {
        if (lines[j].trim() === "{" || lines[j].trim().startsWith("{userPlan")) {
          blockStart = j;
          break;
        }
      }
    }

    // Now track brace depth from blockStart to find the matching }
    let depth = 0;
    let blockEnd = -1;
    let foundFirstBrace = false;

    for (let j = blockStart; j < Math.min(lines.length, blockStart + 30); j++) {
      for (let c = 0; c < lines[j].length; c++) {
        const ch = lines[j][c];
        if (ch === "{") {
          depth++;
          foundFirstBrace = true;
        }
        if (ch === "}") {
          depth--;
          if (foundFirstBrace && depth === 0) {
            blockEnd = j;
            break;
          }
        }
      }
      if (blockEnd !== -1) break;
    }

    if (blockEnd !== -1 && (blockEnd - blockStart) <= 30) {
      const indent = lines[blockStart].match(/^(\s*)/)[1];
      lines[blockStart] = indent + "{/* " + lines[blockStart].trimStart().replace(/^\{/, "");
      // Replace the closing } with */}
      // Find the last } on blockEnd line and replace it
      const lastBraceIdx = lines[blockEnd].lastIndexOf("}");
      if (lastBraceIdx !== -1) {
        lines[blockEnd] =
          lines[blockEnd].substring(0, lastBraceIdx) + "*/}";
      }
      for (let j = blockStart; j <= blockEnd; j++) skip.add(j);
      patches++;
      modified = true;
      i = blockEnd;
    }
  }

  // === Phase 4: Comment out <input> tags with fileInputRefs ===
  for (let i = 0; i < lines.length; i++) {
    if (skip.has(i)) continue;

    const line = lines[i];
    if (!line.includes("fileInputRefs")) continue;
    if (line.trim().startsWith("//") || line.trim().startsWith("{/*")) continue;
    if (isInsideComment(lines, i)) continue;

    // Find the <input opening by scanning back
    let inputStart = -1;
    for (let j = i; j >= Math.max(0, i - 5); j--) {
      if (lines[j].includes("<input")) {
        inputStart = j;
        break;
      }
    }

    if (inputStart === -1) continue;

    // Find the /> closing
    let inputEnd = -1;
    for (let j = inputStart; j < Math.min(lines.length, inputStart + 10); j++) {
      if (lines[j].includes("/>")) {
        inputEnd = j;
        break;
      }
    }

    if (inputEnd !== -1 && (inputEnd - inputStart) <= 10) {
      if (isInsideComment(lines, inputStart)) continue;

      const indent = lines[inputStart].match(/^(\s*)/)[1];
      lines[inputStart] = indent + "{/* " + lines[inputStart].trimStart();
      lines[inputEnd] = lines[inputEnd].trimEnd() + " */}";
      for (let j = inputStart; j <= inputEnd; j++) skip.add(j);
      patches++;
      modified = true;
      i = inputEnd;
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

console.log("=== Comment Edit Image Script v1 ===\n");
console.log("Processing EditTemplate/...");
walkDir(BASE);
console.log("\nDone! Fixed " + totalFiles + " files with " + totalPatches + " pattern replacements.");
