import aws from "aws-sdk";

aws.config.update({ region: "eu-north-1" });

class UploadService {
  s3: aws.S3;

  constructor() {
    this.s3 = new aws.S3({ apiVersion: "2006-06-01" });
  }

  public async uploadFile(
    file: Express.Multer.File
  ): Promise<aws.S3.ManagedUpload.SendData> {
    const params: aws.S3.PutObjectRequest = {
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
      Bucket: String(process.env.BUCKET),
    };
    const result: aws.S3.ManagedUpload.SendData = await this.s3
      .upload(params)
      .promise();

    return result;
  }

  public async generateSignedUrl(
    objectKey: string,
    expirationInSeconds: number
  ): Promise<string> {
    const params = {
      Bucket: String(process.env.BUCKET),
      Key: objectKey,
      Expires: expirationInSeconds,
    };

    return new Promise<string>((resolve, reject) => {
      this.s3.getSignedUrl("getObject", params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}

export default UploadService;
