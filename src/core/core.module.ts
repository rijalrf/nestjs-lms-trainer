import { Module } from '@nestjs/common';
import { TopicRepositoy } from './topic/topic.repo';
import { TopicService } from './topic/topic.service';
import { TopicController } from './topic/topic.controller';

@Module({
  imports: [],
  controllers: [TopicController],
  providers: [TopicRepositoy, TopicService],
})
export class CoreModule {}
