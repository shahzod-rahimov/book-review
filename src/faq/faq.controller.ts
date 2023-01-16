import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FaqService } from './faq.service';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Faq } from './entities/faq.entity';

@ApiTags('FAQ')
@Controller('faq')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @ApiOperation({ summary: 'Create faq' })
  @ApiResponse({
    status: 201,
    type: Faq,
  })
  @Post()
  create(@Body() createFaqDto: CreateFaqDto) {
    return this.faqService.create(createFaqDto);
  }

  @ApiOperation({ summary: 'Get all faqs' })
  @ApiResponse({
    status: 201,
    type: [Faq],
  })
  @Get()
  findAll() {
    return this.faqService.findAll();
  }

  @ApiOperation({ summary: 'Get faq' })
  @ApiResponse({
    status: 201,
    type: Faq,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.faqService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update faq' })
  @ApiResponse({
    status: 201,
    description: 'Return msg',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFaqDto: UpdateFaqDto) {
    return this.faqService.update(+id, updateFaqDto);
  }

  @ApiOperation({ summary: 'Delete faq' })
  @ApiResponse({
    status: 201,
    description: 'Return msg',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.faqService.remove(+id);
  }
}
