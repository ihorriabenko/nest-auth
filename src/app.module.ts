import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { hash } from 'bcryptjs';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { User, UserSchema } from './user/schema/user.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/auth'),
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          schema.pre('save', async function () {
            if (this.isModified('password')) {
              this.password = await hash(this.password, 12);
            }
          });
          return schema;
        },
      },
    ]),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
