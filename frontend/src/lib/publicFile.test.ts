import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { resolvePublicFile } from "./publicFile";

let publicDir: string;

beforeAll(() => {
  publicDir = fs.mkdtempSync(path.join(os.tmpdir(), "public-"));
  fs.writeFileSync(path.join(publicDir, "photo.jpg"), "x");
});

afterAll(() => {
  fs.rmSync(publicDir, { recursive: true, force: true });
});

test("renvoie le chemin public si le fichier existe", () => {
  expect(resolvePublicFile("/photo.jpg", publicDir)).toBe("/photo.jpg");
});

test("renvoie null si le fichier n'existe pas", () => {
  expect(resolvePublicFile("/absente.jpg", publicDir)).toBeNull();
});

test("refuse un chemin qui sort du dossier public", () => {
  expect(resolvePublicFile("/../package.json", publicDir)).toBeNull();
});
