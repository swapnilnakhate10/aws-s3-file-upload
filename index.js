const express = require('express')
const app = express();
const AWS = require('aws-sdk')

AWS.config.update({ region: 'eu-central-1' });

app.get('/generate-presigned-url', async (req, res) => {
    const s3 = new AWS.S3();
  const fileName = 'free_delivery.png';
  console.log("fileName ",fileName);
  const params = {
    Bucket: 'sdist-testfiles',
    Key: fileName, // The name of the file in S3
    Expires: 19600, // Time in seconds for the URL to remain valid
  };
  try {
    const url = await s3.getSignedUrlPromise('putObject', params);
    console.log('Generated presigned URL:', url);
    res.send({ fileName, url });
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    res.send({ error });
  }
})

app.get('/download-presigned-url', async (req, res) => {
    const { path } = req.query
    const downloadURL = await awsS3GeneratePresignedUrl(path, 'getObject', 160)
    res.send({ downloadURL })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})