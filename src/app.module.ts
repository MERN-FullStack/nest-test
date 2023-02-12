import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Dynamic_Module } from './dynamic_module/dynamic.module';
import { PostModule } from './post/post.module';
import { UsersModule } from './users/user.module';

@Module({
  imports: [UsersModule, PostModule, Dynamic_Module.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
