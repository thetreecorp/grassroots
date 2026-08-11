import assert from "node:assert/strict";
import { readdir, readFile, stat } from "node:fs/promises";
import { join } from "node:path";
import test from "node:test";

const root = new URL("..", import.meta.url).pathname;

test("every referenced image, poster, and video is present in the deployment bundle", async () => {
  const appRoot = join(root, "app");
  const entries = await readdir(appRoot, { recursive: true, withFileTypes: true });
  const sourceFiles = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".tsx"))
    .map((entry) => join(entry.parentPath, entry.name));

  const mediaPaths = new Set();
  for (const sourceFile of sourceFiles) {
    const source = await readFile(sourceFile, "utf8");
    for (const match of source.matchAll(/["'](\/media\/[^"']+)["']/g)) {
      mediaPaths.add(match[1].split("?")[0]);
    }
  }

  assert.ok(mediaPaths.size >= 18, "expected the site to reference its full media set");

  for (const mediaPath of mediaPaths) {
    for (const base of ["public", "dist/client"]) {
      const assetPath = join(root, base, mediaPath);
      const asset = await stat(assetPath);
      assert.ok(asset.isFile(), `${mediaPath} must be a file in ${base}`);
      assert.ok(asset.size > 0, `${mediaPath} must not be empty in ${base}`);
    }
  }
});
