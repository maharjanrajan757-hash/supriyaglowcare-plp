import sharp from "sharp";

const images = [
  ["public/images/leito-shampoo-original.jpeg", "public/images/leito-shampoo.png"],
  ["public/images/leito-mask-original.jpeg", "public/images/leito-mask.png"],
];

await Promise.all(
  images.map(([input, output]) =>
    sharp(input)
      .rotate()
      .resize({ width: 1200, withoutEnlargement: true })
      .png({ compressionLevel: 9, quality: 92, palette: true })
      .toFile(output),
  ),
);

console.log("Product images optimized to PNG.");
