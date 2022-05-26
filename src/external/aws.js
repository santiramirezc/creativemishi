const AWS = require('aws-sdk')

module.exports = ({ envConfig }) => {

  const s3 = new AWS.S3()

  AWS.config.update({
    accessKeyId: envConfig.AWS_ACCESS_KEY_ID,
    secretAccessKey: envConfig.AWS_SECRET_ACCESS_KEY,
    region: 'us-east-1'
  });

  return {

    uploadFile: ({ buffer, fileName }) => {
      const params = {
        ACL: 'public-read',
        Body: buffer,
        Bucket: envConfig.S3_BUCKET,
        Key: fileName,
      };
      return s3.upload(params).promise();
    },

    deleteFile: ({ contributionId, fileName }) => {
      const params = { Bucket: envConfig.S3_BUCKET, Key: contributionId + '/' + fileName }
      return new Promise((resolve, reject) => {
        s3.deleteObject(params, function (err, data) {
          if (err) {
            console.log(err, err.stack)
            reject(err)
          }
          else {
            console.log("File deleted")
            resolve(data)
          }
        })
      })
    },

  }
}