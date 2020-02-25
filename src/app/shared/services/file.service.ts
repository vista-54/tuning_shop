import { Platform } from '@ionic/angular';
import { FilePath } from '@ionic-native/file-path/ngx';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { Injectable } from '@angular/core';
import { IOSFilePicker } from '@ionic-native/file-picker/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Injectable()
export class FileService {

    private images = [];

    constructor(
        private file: File,
        private camera: Camera,
        private webview: WebView,
        private filePath: FilePath,
        private platform: Platform,
        private fileChooser: FileChooser,
        private filePicker: IOSFilePicker,
    ) { }

    async selectFiles() {
        let fileURI;
        this.platform.is('android') ? fileURI = await this.fileChooser.open() : fileURI = await this.filePicker.pickFile();
        if (this.platform.is('ios')) fileURI = 'file://' + fileURI;
        let filePath;
        if (this.platform.is('android')) {
            filePath = await this.filePath.resolveNativePath(fileURI);
        } else {
            filePath = fileURI;
        }
        let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
        let currentName = filePath.substring(filePath.lastIndexOf('/') + 1);
        let fileType = currentName.substring(currentName.lastIndexOf('.') + 1);
        return await this.copyFileToLocalDir(correctPath, currentName, currentName);
    }

    async getCam(sourceType) {
        var options: CameraOptions = {
            quality: 100,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };

        let imagePath = await this.camera.getPicture(options);
        if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
            let filePath = await this.filePath.resolveNativePath(imagePath)
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            return await this.copyFileToLocalDir(correctPath, currentName, currentName);
        } else {
            var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
            var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
            return await this.copyFileToLocalDir(correctPath, currentName, currentName);
        }
    }

    async copyFileToLocalDir(namePath, currentName, newFileName) {
        debugger
        let date = this.filePathData();
        let newPath = this.file.dataDirectory + date + '/';
        try {
            let statusDir = await this.file.checkDir(this.file.dataDirectory, date);
            if (statusDir) {
                return await this.copy(namePath, currentName, newFileName, newPath);
            }
        } catch (e) {
            let entry = await this.file.createDir(this.file.dataDirectory, date, true);
            return await this.copy(namePath, currentName, newFileName, newPath);
        }
    }

    filePathData() {
        let time = new Date().toLocaleTimeString('en-US', { hour12: false });
        let timeStr;
        let timeSplit;
        let timeStrSplit;
        timeSplit = time.split(':');
        timeStr = new Date().toLocaleDateString();
        timeStrSplit = timeStr.split('/');
        return timeStrSplit[0] + timeStrSplit[1] + timeStrSplit[2] + '-' + timeSplit[0] + timeSplit[1] + timeSplit[2];
    }

    async copy(namePath, currentName, newFileName, newPath) {
        if (this.platform.is('android')) newPath = await this.filePath.resolveNativePath(newPath);
        await this.file.copyFile(namePath, currentName, newPath, newFileName);
        let filePath = newPath + newFileName;
        let resPath = this.pathForImage(filePath);
        let newEntry = {
            name: newFileName,
            path: resPath,
            filePath: filePath
        };
        return await this.startUpload(newEntry);
    }

    pathForImage(img) {
        if (img === null) {
            return '';
        } else {
            let converted = this.webview.convertFileSrc(img);
            return converted;
        }
    }

    startUpload(fileEntry) {
        return new Promise((resolve, reject) => {
            this.file.resolveLocalFilesystemUrl(fileEntry.filePath)
                .then(entry => {
                    (<FileEntry>entry).file(file => {
                        console.log(file);
                        this.readFile(file).then(blob => {
                            console.log(blob);
                            resolve(blob);
                        });
                    });
                })
                .catch(err => {
                    console.log('Error while reading file.');
                    reject();
                });
        });
    }

    readFile(file: any) {
        return new Promise<any>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imgBlob = new Blob([reader.result], {
                    type: file.type
                });
                console.log('file', imgBlob, file.name);
                resolve({ file: imgBlob, fileName: file.name, fileType: file.type });
            };
            reader.readAsArrayBuffer(file);
        });
    }

    rmFile(file: object) {
        this.file.removeFile(file['fileUrl'], file['fileName']);
    }

}
