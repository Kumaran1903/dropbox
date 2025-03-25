import { auth } from "@/lib/auth";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function POST(req) {
  try {
    const session = await auth(); // This is your auth method

    if (!session || !session.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { fileName, fileType } = body;

    if (!fileName || !fileType) {
      return Response.json(
        { error: "Missing fileName or fileType" },
        { status: 400 }
      );
    }

    const userId = session.user.id || session.user.email; // Use user ID or email for folder

    const s3 = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });

    const key = `${userId}/${fileName}`;

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      ContentType: fileType,
    };

    const uploadUrl = await getSignedUrl(s3, new PutObjectCommand(params), {
      expiresIn: 60,
    });

    return Response.json({ uploadUrl }, { status: 200 });
  } catch (error) {
    console.error("Upload URL Error:", error);
    return Response.json(
      { error: "Failed to generate URL", details: error.message },
      { status: 500 }
    );
  }
}
