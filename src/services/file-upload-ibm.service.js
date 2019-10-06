//In order to run this first run npm i ibm-cos-sdk 
//----------------------------------------------------------------------------
//import * as axios from 'axios';
import fs from 'file-system'
const AWS = require('ibm-cos-sdk');


var config = {
    endpoint: 'https://s3.au-syd.cloud-object-storage.appdomain.cloud',
    apiKeyId: 'UQ1jMPP_T3tkJXNb5Vuc0YSv0ku3_Ncm6fptMYcqvpUC',
    ibmAuthEndpoint: 'https://iam.cloud.ibm.com/identity/token',
    serviceInstanceId: "crn:v1:bluemix:public:cloud-object-storage:global:a/a11c69163e7c498e943418e9e5723fdb:749ed0b3-a74f-4d81-a88c-cc7bc3594240::",
};
var cos = new AWS.S3(config);
function upload1(bucketName, itemName, filePath) {
    var uploadID = null;

    //    if (!fs.getExists(filePath)) {
    //        log.error(new Error(`The file \'${filePath}\' does not exist or is not accessible.`));
    //        return;
    //    }

    console.log(`Starting multi-part upload for ${itemName} to bucket: ${bucketName}`);
    return cos.createMultipartUpload({
        Bucket: bucketName,
        Key: itemName
    }).promise()
    .then((data) => {
        uploadID = data.UploadId;

        //begin the file upload        
        fs.readFile(filePath, (e, fileData) => {
            //min 5MB part
            var partSize = 1024 * 1024 * 5;
            var partCount = Math.ceil(fileData.length / partSize);

              const timesSeries = (partCount, async (partNum, next)  => {
                var start = partNum * partSize;
                var end = Math.min(start + partSize, fileData.length);
                
                partNum++;

                console.log(`Uploading to ${itemName} (part ${partNum} of ${partCount})`);  

                cos.uploadPart({
                    Body: fileData.slice(start, end),
                    Bucket: bucketName,
                    Key: itemName,
                    PartNumber: partNum,
                    UploadId: uploadID
                }).promise()
                .then((data) => {
                    next(e, {ETag: data.ETag, PartNumber: partNum});
                })
                .catch((e) => {
                    cancelMultiPartUpload(bucketName, itemName, uploadID);
                    console.error(`ERROR: ${e.code} - ${e.message}\n`);
                });
            }, (e, dataPacks) => {
                cos.completeMultipartUpload({
                    Bucket: bucketName,
                    Key: itemName,
                    MultipartUpload: {
                        Parts: dataPacks
                    },
                    UploadId: uploadID
                }).promise()
                .then(console.log(`Upload of all ${partCount} parts of ${itemName} successful.`))
                .catch((e) => {
                    cancelMultiPartUpload(bucketName, itemName, uploadID);
                    console.error(`ERROR: ${e.code} - ${e.message}\n`);
                });
            });
        });
    })
    .catch((e) => {
        console.error(`ERROR: ${e.code} - ${e.message}\n`);
    });
}

function cancelMultiPartUpload(bucketName, itemName, uploadID) {
    return cos.abortMultipartUpload({
        Bucket: bucketName,
        Key: itemName,
        UploadId: uploadID
    }).promise()
    .then(() => {
        console.log(`Multi-part upload aborted for ${itemName}`);
    })
    .catch((e)=>{
        console.error(`ERROR: ${e.code} - ${e.message} + ${e.error}\n`);
    });
}
// const BASE_URL = 'http://localhost:8080';

// function upload(formData) {
//     const url = `${BASE_URL}/photos/upload`;
//     return axios.post(url, formData)
//         // get data
//         .then(x => x.data)
//         // add url field
//         .then(x => x.map(img => Object.assign({},
//             img, { url: `${BASE_URL}/images/${img.id}` })));
// }
//upload("test-iport","careers 1.jpg", "./Downloads/careers 1.jpg" );
export { upload1 }