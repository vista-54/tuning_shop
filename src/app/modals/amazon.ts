import { S3 } from "aws-sdk/clients/all";
import { DialogService } from '../tabs/chat/dialog/shared/services/dialog.service';

export class AmazonClass {

    // FOLDER = 'finistut/test-path/';
    public url: string;

    constructor(roomId: number, file: any, _dialog: DialogService) {
        debugger
        this.uploadfile(_dialog).then(url => {
            this.url = url;
            _dialog.setFile(roomId, { files: [url] }).subscribe();
        });
    }

    uploadfile(file: any): Promise<any> {
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
                Key: url + file.name,
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