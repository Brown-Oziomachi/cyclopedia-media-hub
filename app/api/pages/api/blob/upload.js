// pages/api/blob/upload.js
export const config = {
  api: {
    bodyParser: false,
  },
};

import { put } from "@vercel/blob";

const { url } = await put("articles/blob.txt", "Hello World!", {
  access: "public",
});

export default async function handler(req, res) {
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(500).json({ error: "Form parsing failed" });
      return;
    }

    const file = files.file;

    if (!file || !file.filepath) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }

    try {
      const blob = await put(
        file.originalFilename,
        fs.createReadStream(file.filepath),
        {
          access: "public",
          token: process.env.BLOB_READ_WRITE_TOKEN, // ✅ Must be in .env.local
        }
      );

      res.status(200).json({ url: blob.url });
    } catch (error) {
      console.error("Upload failed:", error);
      res.status(500).json({ error: "Upload failed" });
    }
  });
}
