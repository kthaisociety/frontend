const { Resvg } = require('@resvg/resvg-js');
const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, '../src/app/favicon.svg');
const outputDir = path.join(__dirname, '../src/app');

// Read the SVG file
const svgContent = fs.readFileSync(svgPath, 'utf-8');

// Icon sizes to generate
const iconSizes = [
  { size: 192, filename: 'android-chrome-192x192.png' },
  { size: 512, filename: 'android-chrome-512x512.png' },
  { size: 180, filename: 'apple-touch-icon.png' },
];

// Generate each icon size
iconSizes.forEach(({ size, filename }) => {
  try {
    const resvg = new Resvg(svgContent, {
      fitTo: {
        mode: 'width',
        value: size,
      },
    });
    
    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();
    
    const outputPath = path.join(outputDir, filename);
    fs.writeFileSync(outputPath, pngBuffer);
    
    console.log(`✓ Generated ${filename} (${size}x${size})`);
  } catch (error) {
    console.error(`✗ Error generating ${filename}:`, error.message);
    process.exit(1);
  }
});

console.log('\nAll icons generated successfully!');





