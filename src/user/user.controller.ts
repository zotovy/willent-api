import { Controller, HttpException, HttpStatus, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from "@nestjs/platform-express";
import { HttpAuthGuard } from "../auth/auth.guard";
import { HttpUserId } from "../helpers/user.decorator";
import { UserService } from "./user.service";
import { diskStorage } from "multer";
import * as path from "path";


const storage = diskStorage({
    destination(req, file, cb) {
        cb(null, path.join(__dirname, '../../static/profile-images'))
    },
    filename(req, file, cb) {
        cb(null, `${ req.headers.userId }.jpg`)
    }
})

@Controller('user')
export class UserController {

    constructor(private readonly userServices: UserService) {
    }

    @UseGuards(HttpAuthGuard)
    @Post("profile-image")
    @UseInterceptors(FileInterceptor("file", {
        storage,
        limits: { fileSize: 1000000, files: 1 },
        fileFilter: function (req, file, callback) {
            let ext = path.extname(file.originalname);
            if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
                return callback(new HttpException('Only images are allowed', HttpStatus.BAD_REQUEST), null)
            }
            callback(null, true)
        },
    }))
    async uploadImage(@UploadedFile() file: Express.Multer.File, @HttpUserId() userid) {
        return this.userServices.updateUserImage(userid, !!file);
    }
}
