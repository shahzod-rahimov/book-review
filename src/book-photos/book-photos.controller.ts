import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../common/decorators/roles-auth.decorator';
import { BookPhotosService } from './book-photos.service';
import { CreateBookPhotoDto } from './dto/create-book-photo.dto';
import { UpdateBookPhotoDto } from './dto/update-book-photo.dto';
import { BookPhoto } from './entities/book-photo.entity';

@ApiTags('Book Photos')
@Controller('book-photos')
export class BookPhotosController {
  constructor(private readonly bookPhotosService: BookPhotosService) {}

  @ApiOperation({ summary: 'Create book-photo' })
  @ApiResponse({
    status: 201,
    type: BookPhoto,
  })
  @Post()
  create(@Body() createBookPhotoDto: CreateBookPhotoDto) {
    return this.bookPhotosService.create(createBookPhotoDto);
  }

  @ApiOperation({ summary: 'Get book-photos' })
  @ApiResponse({
    status: 201,
    type: [BookPhoto],
  })
  @Get()
  findAll() {
    return this.bookPhotosService.findAll();
  }

  @ApiOperation({ summary: 'Get book-photo' })
  @ApiResponse({
    status: 201,
    type: BookPhoto,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookPhotosService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update book-photo' })
  @ApiResponse({
    status: 201,
    description: 'Return msg',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBookPhotoDto: UpdateBookPhotoDto,
  ) {
    return this.bookPhotosService.update(+id, updateBookPhotoDto);
  }

  @ApiOperation({ summary: 'Delete book-photo' })
  @ApiResponse({
    status: 201,
    description: 'Return msg',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookPhotosService.remove(+id);
  }
}
