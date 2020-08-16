import { Field, ObjectType } from '@nestjs/graphql';
@ObjectType('Device')
export class Device {
  @Field({ nullable: true })
  model?: string;
}
