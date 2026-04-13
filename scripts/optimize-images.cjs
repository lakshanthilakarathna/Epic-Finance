/**
 * One-off / maintenance: resizes huge JPEGs/PNGs to WebP for web.
 * Run: npm run optimize-images
 */
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const root = path.join(__dirname, "..");
const pub = path.join(root, "public");

async function main() {
  const photoDir = path.join(pub, "img/photo");
  const facesDir = path.join(pub, "img/faces");
  const logoDir = path.join(pub, "img/logo");

  const heroes = [
    ["Epic Finance1.jpg", "hero-1.webp"],
    ["Epic Finance2.JPG", "hero-2.webp"],
    ["Epic Finance3.jpg", "hero-3.webp"],
  ];
  for (const [src, out] of heroes) {
    const inp = path.join(photoDir, src);
    if (!fs.existsSync(inp)) {
      console.warn("skip missing", inp);
      continue;
    }
    await sharp(inp)
      .resize(1920, null, { withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(path.join(photoDir, out));
    console.log("wrote", out);
  }

  const aboutMain = path.join(photoDir, "Epic Finance8.jpg");
  if (fs.existsSync(aboutMain)) {
    await sharp(aboutMain)
      .resize(960, null, { withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(path.join(photoDir, "about-main.webp"));
    console.log("wrote about-main.webp");
  }

  const avatars = [
    ["Epic Financer1.jpg", "avatar-financer-1.webp"],
    ["Epic Financer2.jpg", "avatar-financer-2.webp"],
    ["Epic Financer3.jpg", "avatar-financer-3.webp"],
    ["Epic Financer4.jpg", "avatar-financer-4.webp"],
  ];
  for (const [src, out] of avatars) {
    const inp = path.join(facesDir, src);
    if (!fs.existsSync(inp)) continue;
    await sharp(inp)
      .resize(192, 192, { fit: "cover", position: "centre" })
      .webp({ quality: 82 })
      .toFile(path.join(facesDir, out));
    console.log("wrote", out);
  }

  const strongTeam = path.join(facesDir, "strong-team.jpg");
  if (fs.existsSync(strongTeam)) {
    await sharp(strongTeam)
      .resize(960, null, { withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(path.join(facesDir, "strong-team.webp"));
    console.log("wrote strong-team.webp");
  }

  const five = path.join(facesDir, "5.jpg");
  if (fs.existsSync(five)) {
    await sharp(five)
      .resize(192, 192, { fit: "cover", position: "centre" })
      .webp({ quality: 82 })
      .toFile(path.join(facesDir, "avatar-5.webp"));
    console.log("wrote avatar-5.webp");
  }

  for (const name of ["logo-dark.png", "logo-light.png"]) {
    const inp = path.join(logoDir, name);
    if (!fs.existsSync(inp)) continue;
    const out = name.replace(".png", ".webp");
    await sharp(inp)
      .resize(560, null, { withoutEnlargement: true })
      .webp({ quality: 90 })
      .toFile(path.join(logoDir, out));
    console.log("wrote", out);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
