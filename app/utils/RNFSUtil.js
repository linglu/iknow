import RNFS from 'react-native-fs';

export default class RNFSUtil {

    static ROOT_DIR = RNFS.ExternalStorageDirectoryPath;

    /**
     * type DownloadFileOptions = {
        fromUrl: string;          // URL to download file from
        toFile: string;           // Local filesystem path to save the file to
        headers?: Headers;        // An object of headers to be passed to the server
        progressInterval?: number;
        progressDivider?: number;
        begin?: (res: DownloadBeginCallbackResult) => void;
        progress?: (res: DownloadProgressCallbackResult) => void;
        connectionTimeout?: number // only supported on Android yet
        readTimeout?: number       // supported on Android and iOS
        };
     */
    static downloadFile = async (fromUrl, classId, lessonName, progressCallback, resultCallback)=>{
    
        classDir = RNFSUtil.ROOT_DIR + "/linky/" + classId;
        
        exist = await RNFS.exists(classDir);
        if (!exist) {
            await RNFS.mkdir(classDir);
        }

        downloadDest = classDir + "/" + lessonName;

        exist = await RNFS.exists(downloadDest);
        if (exist) {
            resultCallback("success", downloadDest);
            return;
        }

        console.log('linky ==  3 ' + downloadDest);

        const options = {
            fromUrl: fromUrl,
            toFile: downloadDest,
            begin: (res) => {
                console.log('linky ==  begin');
            },
            progress: (res) => {
                let progress = ""
                if (res.bytesWritten < 1024 * 1024) {
                    progress = ((res.bytesWritten / 1024).toFixed(2)) + " K"
                } else {
                    progress = (res.bytesWritten / 1024 / 1024).toFixed(2) + " K"
                } 

                progressCallback(progress);
            }
        }

        try {

            const ret = RNFS.downloadFile(options);
            ret.promise.then(res => {

                console.log('linky  success', res);
                console.log('linky file://' + downloadDest)

                resultCallback("success", downloadDest)

            }).catch(err => {
                console.log('linky == err: ' + err);
                resultCallback("fail")
            })
                
        } catch (err) {
            console.log('linky == error: ' + err);
            resultCallback("fail")
        }
            
    }

    static readFile = async (filepath) => {
        // filepath = dirname + "/" + filename;
        // console.log('linky ==  filepath : ' + filepath);
        return RNFS.readFile(filepath, 'utf8');
    }

    static readDir = async () => {

        RNFS.readDir(path) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
        .then((result) => {
            console.log('GOT RESULT', result);
        
            // stat the first file
            return Promise.all([RNFS.stat(result[0].path), result[0].path]);
        })
        .then((statResult) => {
            
            if (statResult[0].isFile()) {
                // if we have a file, read it
                return RNFS.readFile(statResult[1], 'utf8');
            }
        
            return 'no file';
        })
        .then((contents) => {
            // log the file contents
            console.log(contents);
        })
        .catch((err) => {
            console.log(err.message, err.code);
        });
    }
}