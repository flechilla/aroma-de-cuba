import { put } from '@vercel/blob';

const BLOB_READ_WRITE_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

async function upload(path, filename) {
  try {
    const fs = await import('fs');
    const fileBuffer = fs.readFileSync(path);
    const blob = await put(`aroma-de-cuba/images/blog/${filename}`, fileBuffer, {
      access: 'public',
      token: BLOB_READ_WRITE_TOKEN
    });
    console.log(`Uploaded ${filename}: ${blob.url}`);
  } catch (err) {
    console.error(`Failed to upload ${filename}: `, err);
  }
}

// Just dummy uploads to get URLs
upload('public/images/blog/fitcuba-varadero.jpg', 'fitcuba-varadero.jpg');
upload('public/images/blog/turismo-cuba-18m.jpg', 'turismo-cuba-18m.jpg');
upload('public/images/blog/hoteles-cerrados-cuba.jpg', 'hoteles-cerrados-cuba.jpg');
