import { AuthModule } from '@/auth/infrastructure/auth.module';
import { DeleteCourseUsecase } from '@/course/application/usecases/delete-course.usecase';
import { GetCourseUsecase } from '@/course/application/usecases/get-course.usecase';
import { ListCoursesUsecase } from '@/course/application/usecases/list-course.usecase';
import { UpdateCourseUsecase } from '@/course/application/usecases/update-course.usecase';
import { CourseRepository } from '@/course/domain/repositories/course.repository';
import { CourseController } from '@/course/infrastructure/course.controller';
import { CoursePrismaRepository } from '@/course/infrastructure/database/prisma/repositories/course-prisma.repository';
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [AuthModule],
  controllers: [CourseController],
  providers: [
    {
      provide: 'PrismaService',
      useClass: PrismaService,
    },
    {
      provide: 'CourseRepository',
      useFactory: (prismaService: PrismaService) => {
        return new CoursePrismaRepository(prismaService);
      },
      inject: ['PrismaService'],
    },
    {
      provide: GetCourseUsecase.UseCase,
      useFactory: (courseRepository: CourseRepository.Repository) => {
        return new GetCourseUsecase.UseCase(courseRepository);
      },
      inject: ['CourseRepository'],
    },
    {
      provide: ListCoursesUsecase.UseCase,
      useFactory: (courseRepository: CourseRepository.Repository) => {
        return new ListCoursesUsecase.UseCase(courseRepository);
      },
      inject: ['CourseRepository'],
    },
    {
      provide: UpdateCourseUsecase.UseCase,
      useFactory: (courseRepository: CourseRepository.Repository) => {
        return new UpdateCourseUsecase.UseCase(courseRepository);
      },
      inject: ['CourseRepository'],
    },
    {
      provide: DeleteCourseUsecase.UseCase,
      useFactory: (courseRepository: CourseRepository.Repository) => {
        return new DeleteCourseUsecase.UseCase(courseRepository);
      },
      inject: ['CourseRepository'],
    },
  ],
})
export class CourseModule {}
