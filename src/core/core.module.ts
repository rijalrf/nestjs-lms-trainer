import { Module } from '@nestjs/common';
import { TopicRepositoy } from './topic/topic.repo';
import { TopicService } from './topic/topic.service';
import { TopicController } from './topic/topic.controller';
import { MaterialRepository } from './material/material.repo';
import { MaterialService } from './material/material.service';
import { MaterialController } from './material/material.controller';

@Module({
  imports: [],
  controllers: [TopicController, MaterialController],
  providers: [
    TopicRepositoy,
    TopicService,
    MaterialRepository,
    MaterialService,
  ],
})
export class CoreModule {}
