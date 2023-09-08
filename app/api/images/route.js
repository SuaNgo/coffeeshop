import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

export async function POST(request) {
  const myS3client = new S3Client({
    region: "ap-southeast-1",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });
  const formData = await request.formData();
  const links = [];

  for (const fileInfo of formData) {
    const file = fileInfo[1];
    const name = Date.now().toString() + file.name;
    const chunks = [];
    for await (const chunk of file.stream()) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);
    await myS3client.send(
      new PutObjectCommand({
        Bucket: "suango-coffee-images",
        Key: name,
        ACL: "public-read",
        Body: buffer,
        ContentType: file.type,
      })
    );
    links.push("https://suango-coffee-images.s3.amazonaws.com/" + name);
  }
  return NextResponse.json(links);
}
