import { Controller, Get, Post, UploadedFile, UseInterceptors, Sse } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { FileService } from "./file.service";

@Controller('file')
export class FileController {
    constructor(private readonly fileService: FileService) { }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    @Sse('file/detection')
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        const filePath = await this.fileService.saveFile(file);
        this.fileService.runObjectDetection(filePath);
    }

    @Post('detection')
    @Sse('file/detection')
    async getDetectionLogs() {
        return await this.fileService.getDetectionLogs();
    }

    @Get('test')
    async test(): Promise<string> {
        return this.fileService.test();
    }

    @Get('convert')
    async convert() {
        return this.fileService.convert();
    }

}