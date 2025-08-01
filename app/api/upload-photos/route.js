// import { authOptions } from "@/app/utils/authOptions";
// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
// import { getServerSession } from "next-auth";
// import { NextResponse } from "next/server";

// // Helper function to upload to DigitalOcean Spaces
// async function uploadToDigitalOcean(fileBuffer, originalFilename, mimetype) {
//   const client = new S3Client({
//     region: 'us-east-1', // Any valid AWS region
//     endpoint: 'https://nyc3.digitaloceanspaces.com', // DigitalOcean Space endpoint
//     credentials: {
//       accessKeyId:process.env.ACCESS_KEY, // DigitalOcean Spaces Access Key
//       secretAccessKey: process.env.SECRET_KEY, // DigitalOcean Spaces Secret Key
//     },
//   });

//   const parts = originalFilename.split('.');
//   const ext = parts[parts.length - 1];
//   const newFilename = `${Date.now()}.${ext}`;
//   const bucket = 'gaadi9loofee'; // Replace with your Space name
//   const folder = 'Gaadi9'; // Folder in the Space

//   try {
//     // Upload file to DigitalOcean Space
//     await client.send(new PutObjectCommand({
//       Bucket: bucket,
//       Body: fileBuffer,
//       Key: `${folder}/${newFilename}`,
//       ContentType: mimetype,
//       ACL: 'public-read', // Optional: adjust permissions as needed
//     }));

//     return `https://${bucket}.nyc3.cdn.digitaloceanspaces.com/${folder}/${newFilename}`;
//   } catch (error) {
//     console.error('Error uploading file:', error);
//     throw error;
//   }
// }

// export async function POST(request) {
//   const MAX_FILE_SIZE = 800 * 1024; // Maximum size of each file in bytes (300KB)
//   const ALLOWED_MIME_TYPES = [
//     'image/jpeg',  // JPEG
//     'image/jpg',   // JPG (older variant, same as JPEG)
//     'image/png',   // PNG
//     'image/bmp',   // BMP
//     'image/tiff',  // TIFF
//     'image/webp',  // WEBP
//     'image/svg+xml',  // SVG
//     'image/x-icon',   // ICO (icons)
//     'image/heic',     // HEIC (used in newer iPhones)
//     'image/heif',     // HEIF
//   ];
  
//   const session = await getServerSession(authOptions);
//   if (!session) {
//      return new Response('You must be logged in to access this resource', { status: 401 });
//  }

//   try {
   
//     // Parse form data
//     const formData = await request.formData();
//     const files = formData.getAll('image'); // Get all uploaded files

//     // Validate number of files
//     if (files.length === 0) {
//       return NextResponse.json({ error: "No files uploaded!" }, { status: 400 });
//     }

//     const uploadResults = [];

//     // Loop through all the files and upload them one by one
//     for (const file of files) {
//       if (file && file instanceof Blob) {
//         const fileBuffer = Buffer.from(await file.arrayBuffer()); // Convert file to buffer
//         const originalFilename = file.name;
//         const mimetype = file.type;
//         const fileSize = file.size;

//         // Validate file type
//         if (!ALLOWED_MIME_TYPES.includes(mimetype)) {
//           return NextResponse.json({ error: "Only image files are allowed (jpeg, png, jpg,webp)" }, { status: 400 });
//         }

//         // Skip the upload if file size exceeds 300KB
//         if (fileSize > MAX_FILE_SIZE) {
//           return NextResponse.json({ error: `File size should not exceed 800KB! (${originalFilename})` }, { status: 400 });
//         }

//         // Upload the file to DigitalOcean Spaces
//         const fileUrl = await uploadToDigitalOcean(fileBuffer, originalFilename, mimetype);

//         // Store the result of each uploaded file
//         uploadResults.push({ filename: originalFilename, url: fileUrl });
//       }
//     }


//     // Return the uploaded file URLs
//     return NextResponse.json({ ok: true, message: "Files uploaded successfully", files: uploadResults }, { status: 201 });
//   } catch (error) {
//     console.error('Error:', error);
//     return NextResponse.json({ error: "Internal server error!" }, { status: 500 });
//   }
// }
  

import { authOptions } from "@/app/utils/authOptions";
import { getServerSession } from "next-auth";
import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from "next/server";

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  const MAX_FILE_SIZE = 800 * 1024;
  const ALLOWED_MIME_TYPES = [
    'image/jpeg', 'image/jpg', 'image/png', 'image/bmp', 'image/tiff',
    'image/webp', 'image/svg+xml', 'image/x-icon', 'image/heic', 'image/heif',
  ];

  // const session = await getServerSession(authOptions);
  // if (!session) {
  //   return new Response('You must be logged in to access this resource', { status: 401 });
  // }

  try {
    const formData = await request.formData();
    const files = formData.getAll('image');

    if (files.length === 0) {
      return NextResponse.json({ error: "No files uploaded!" }, { status: 400 });
    }

    const uploadResults = [];

    for (const file of files) {
      if (file && file instanceof Blob) {
        const fileBuffer = Buffer.from(await file.arrayBuffer());
        const originalFilename = file.name;
        const mimetype = file.type;
        const fileSize = file.size;

        if (!ALLOWED_MIME_TYPES.includes(mimetype)) {
          return NextResponse.json({ error: "Only image files are allowed." }, { status: 400 });
        }

        if (fileSize > MAX_FILE_SIZE) {
          return NextResponse.json({ error: `File size should not exceed 800KB! (${originalFilename})` }, { status: 400 });
        }

        // Upload to Cloudinary using buffer
        const uploadRes = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: 'Gaadi9' },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          stream.end(fileBuffer);
        });

        uploadResults.push({ filename: originalFilename, url: uploadRes.secure_url });
      }
    }

    return NextResponse.json({ ok: true, message: "Files uploaded successfully", files: uploadResults }, { status: 201 });
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    return NextResponse.json({ error: "Internal server error!" }, { status: 500 });
  }
}
