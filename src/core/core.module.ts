import { Module } from '@nestjs/common';
import { TopicRepositoy } from './topic/topic.repo';
import { TopicService } from './topic/topic.service';
import { TopicController } from './topic/topic.controller';
import { MaterialRepository } from './material/material.repo';
import { MaterialService } from './material/material.service';
import { MaterialController } from './material/material.controller';
import { AssignmentReposity } from './assignment/assignment.repo';
import { AssignmentService } from './assignment/assignment.service';
import { AssignmentController } from './assignment/assignment.controller';

@Module({
  imports: [],
  controllers: [TopicController, MaterialController, AssignmentController],
  providers: [
    TopicRepositoy,
    TopicService,
    MaterialRepository,
    MaterialService,
    AssignmentReposity,
    AssignmentService,
  ],
})
export class CoreModule {}
