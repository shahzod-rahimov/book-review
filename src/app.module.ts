import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';
import { PublishersModule } from './publishers/publishers.module';
import { SocialsModule } from './socials/socials.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { CommentsModule } from './comments/comments.module';
import { BooksModule } from './books/books.module';
import { CategoriesModule } from './categories/categories.module';
import { BookPhotosModule } from './book-photos/book-photos.module';
import { FaqModule } from './faq/faq.module';
import { ReviewsModule } from './reviews/reviews.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { FilesModule } from './files/files.module';
import { resolve } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'static'),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadModels: true,
      logging: false,
    }),
    UsersModule,
    AdminModule,
    PublishersModule,
    SocialsModule,
    SubscriptionsModule,
    CommentsModule,
    BooksModule,
    CategoriesModule,
    BookPhotosModule,
    FaqModule,
    ReviewsModule,
    FilesModule,
  ],
})
export class AppModule {}
