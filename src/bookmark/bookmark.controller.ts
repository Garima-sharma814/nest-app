import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGaurd } from 'src/auth/gaurd';
import { BookmarkService } from './bookmark.service';
import { getUser } from 'src/auth/decorator';
import { CreateBookmarkDto } from './dto';
import { EditBookmarkDto } from './dto/editBookmark.dto';

@UseGuards(JwtGaurd)
@Controller('bookmarks')
export class BookmarkController {
  constructor(private bookmarkservice: BookmarkService) {}
  @Get()
  getBookmarks(@getUser('id') userId: number) {
    return this.bookmarkservice.getBookmarks(userId);
  }

  @Get(':id')
  getBookmarkById(
    @getUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return this.bookmarkservice.getBookmarkById(userId, bookmarkId);
  }

  @Post()
  createBookmark(
    @getUser('id') userId: number,
    @Body() dto: CreateBookmarkDto,
  ) {
    return this.bookmarkservice.createBookmark(userId, dto);
  }

  @Patch(':id')
  editBookmarkById(
    @getUser('id') userId: number,
    @Body() dto: EditBookmarkDto,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return this.bookmarkservice.editBookmarkById(userId, dto, bookmarkId);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteBookmarkById(
    @getUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return this.bookmarkservice.deleteBookmarkById(userId, bookmarkId);
  }
}
