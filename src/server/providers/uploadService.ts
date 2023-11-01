import aws from "aws-sdk";

aws.config.update({ region: "eu-north-1" });

class UploadService {
  s3: aws.S3;

  constructor() {
    this.s3 = new aws.S3({ apiVersion: "2006-06-01" });
  }

  public async uploadFile(file: Express.Multer.File) {
    const params: aws.S3.PutObjectRequest = {
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
      Bucket: String(process.env.BUCKET),
    };
    await this.s3.upload(params).promise();
  }
}

export default UploadService;
