import { Module } from '@nestjs/common';
import { EnvConfigModule } from './shared/infrastructure/env-config/env-config.module';
import { UserModule } from './user/infrastructure/user.module';
import { DatabaseModule } from './shared/infrastructure/database/database.module';
import { AuthModule } from './auth/infrastructure/auth.module';
import { ClassroomModule } from './classroom/infrastructure/classroom.module';
import { CourseModule } from '@/course/infrastructure/course.module';
import { CoursePeriodModule } from './course/infrastructure/course-period.module';

@Module({
  imports: [
    EnvConfigModule,
    ClassroomModule,
    CourseModule,
    CoursePeriodModule,
    UserModule,
    DatabaseModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
