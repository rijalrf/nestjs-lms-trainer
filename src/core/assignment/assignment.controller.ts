import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import {
  AssignmentRequestDTO,
  AssignmentResponseDTO,
  AssignmentResponseWithPaginationDTO,
} from './assignment.dto';
import { ZBody } from 'src/common/decorator/zod.decorator';
import { AssignmentValidation } from './assignment.validation';
import { Auth } from 'src/auth/auth.decorator';
import { UserResponseDTO } from 'src/user/user.dto';

@Controller('v1/api/assignments')
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  @Post()
  async create(
    @ZBody(AssignmentValidation.CREATEUPDATE) request: AssignmentRequestDTO,
    @Auth() user: UserResponseDTO,
  ): Promise<AssignmentResponseDTO> {
    return this.assignmentService.create(request, user.id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @ZBody(AssignmentValidation.CREATEUPDATE) request: AssignmentRequestDTO,
    @Auth() user: UserResponseDTO,
  ): Promise<AssignmentResponseDTO> {
    return this.assignmentService.update(id, request, user.id);
  }

  @Get()
  async getAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ): Promise<AssignmentResponseWithPaginationDTO> {
    return this.assignmentService.getAll(page, limit);
  }

  @Get(':id')
  async getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<AssignmentResponseDTO> {
    return this.assignmentService.getById(id);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.assignmentService.delete(id);
  }
}
