import {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { auth } from "@/lib/auth";

export async function GET(req) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id || session.user.email; // Use user-specific folder

    const s3 = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });

    // Get all user files
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Prefix: `${userId}/`,
    };

    const { Contents } = await s3.send(new ListObjectsV2Command(params));

    if (!Contents) {
      return Response.json({ files: [] }, { status: 200 });
    }

    // Generate pre-signed URLs for secure downloads
    const files = await Promise.all(
      Contents.map(async (file) => {
        const command = new GetObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: file.Key,
        });

        const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 }); // URL valid for 60 sec

        return {
          key: file.Key,
          name: file.Key.split("/").pop(),
          url: signedUrl, // Secure link
        };
      })
    );

    return Response.json({ files }, { status: 200 });
  } catch (error) {
    console.error("Fetch Files Error:", error);
    return Response.json({ error: "Failed to fetch files" }, { status: 500 });
  }
}
