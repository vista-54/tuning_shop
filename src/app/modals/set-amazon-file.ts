import { S3 } from "aws-sdk/clients/all";

export class SetAmazonFileClass {

    // FOLDER = 'finistut/test-path/';

    constructor() { }

    uploadfile(file: any, name: string): Promise<any> {
        let promise = new Promise((resolve, reject) => {

            let url = + new Date().getTime() + '/';

            const bucket = new S3(
                {
                    accessKeyId: 'AKIAJZGQSX2UU5BN3CMA',
                    secretAccessKey: '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',
                    region: 'eu-central-1'
                }
            );

            const params = {
                Bucket: 'vektior',
                Key: url + name,
                Body: file,
                ACL: 'public-read'
            };

            const options = {

            };
            // console.log(bucket.upload);
            bucket.upload(params, options, (err, data) => {

                console.log(data.Location, 'text');

                if (err) {
                    console.log('There was an error uploading your file: ', err);
                    return false;
                }
                resolve(data.Location);
                console.log('Successfully uploaded file.', data);
                return true;
            });
        });
        return promise;

    }

}