import AWS from 'aws-sdk';
 
const s3 = new AWS.S3();
 
export async function handler(event) {
    try {
        if (!event.body) {
            throw new Error('No file provided');
        }
        
        const file = event.body;
        const fileName = event.queryStringParameters && event.queryStringParameters.fileName;
        const bucketName = 'test-api-1797';

        if (!fileName) {
            throw new Error('Missing fileName parameter');
        }
 
        const params = {
            Bucket: bucketName,
            Key: fileName,
            Body: file
        };
 
        await s3.upload(params).promise();
 
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'File uploaded successfully' }),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error uploading file', error: error.message }),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
}