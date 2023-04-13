import { Injectable } from "@nestjs/common";
import { exec, spawn } from "child_process";
import * as fs from 'fs';
import * as moment from 'moment';
import { Observable, Subject } from "rxjs";

@Injectable()
export class FileService {
    private detectionLogs$ = new Subject<string>();

    async saveFile(video: Express.Multer.File) {
        try {
            /* 파일 이름은 '유저의 아이디 혹은 닉네임 + 업로드 된 시각'이 적절해보임.
            const now = moment().format('YYYY-MM-DD HH:mm:ss');
            console.log(now);
            const path = `./raw/${userName + " " + now}`; */
            const path = `./raw/${video.originalname}`;
            fs.writeFileSync(path, video.buffer);
            console.log(`File saved at ${path}`);

            return path;
        } catch (err) {
            console.log("Error has been occured while saving the raw video.");
            console.log(err);

            return null;
        }
    }

    // async runObjectDetection(videoPath: string) {

    //     return new Promise((resolve, reject) => {
    //         exec(
    //             'cd yolov7 && python3 YOLOv7_custom.py',
    //             (error, stdout, stderr) => {
    //                 if (error) {
    //                     console.error(`exec error: ${error}`);
    //                     reject(error);
    //                     return;
    //                 }

    //                 if (stderr) {
    //                     console.error(`stderr: ${stderr}`);
    //                     reject(stderr);
    //                     return;
    //                 }

    //                 resolve(stdout);
    //             },
    //         );
    //     });
    // }

    runObjectDetection(videoPath: string): Observable<string> {
        const pythonCode = `
        import subprocess

        subprocess.run(['python3', 'counter.py', '--weights', 'best.pt', '--conf', '0.5', '--source', 'sample.mp4', '--no-trace'])
        `;

        exec(
            `cd yolov7 && python3 -c "${pythonCode}"`,
            (error, stdout, stderr) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    this.detectionLogs$.error(error);
                    return;
                }

                if (stderr) {
                    console.error(`stderr: ${stderr}`);
                    this.detectionLogs$.error(stderr);
                    return;
                }

                this.detectionLogs$.complete();
            }
        );

        return this.detectionLogs$.asObservable();
    }

    async getDetectionLogs() {
        return this.detectionLogs$.asObservable();
    }

    async convert() {
        return new Promise((resolve, reject) => {
            exec('cd yolov7 && jupyter nbconvert --to python YOLOv7_custom.ipynb', (error, stdout, stderr) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(stdout);
                }
            });
        }
        )
    }

    async test(): Promise<string> {
        const command = 'cd py && ls';

        return new Promise((resolve, reject) => {
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    reject(error);
                }
                console.log(`stdout: ${stdout}`);
                console.error(`stderr: ${stderr}`);
                resolve(stdout);
            });
        });
    }
}