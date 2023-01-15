import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {
  async createFile(file): Promise<string> {
    try {
      if (file == undefined) {
        return null;
      }
      const fileName = uuid.v4() + '.jpg';
      const filePath = path.join(__dirname, '..', 'static');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      return fileName;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Faylni yozishda xatolik',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteFile(fileName): Promise<void> {
    try {
      const filePath = path.join(__dirname, '..', 'static');
      if (!fileName) return;

      fs.unlinkSync(path.join(filePath, fileName));
    } catch (error) {
      console.log(error);
      throw new HttpException(
        "Faylni o'chirishda xatolik",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
