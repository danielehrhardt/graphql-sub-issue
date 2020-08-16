import { Args, Resolver, Subscription, Query, Context } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Device } from './device.entity';
import { HttpException, HttpStatus } from '@nestjs/common';

const pubSub = new PubSub();

@Resolver(of => Device)
export class DeviceResolver {
  @Query(returns => [Device])
  async devices(
    @Context() ctx,
    @Args('dashboard', { nullable: true }) dashboard: boolean,
  ) {
    return;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @Subscription(returns => Device, {
    name: 'deviceUpdate',
    filter: (payload, variables) => {
      return payload.deviceUpdate.serialNumber === variables.serialNumber;
    },
  })
  async deviceUpdate(@Args('serialNumber') serialNumber: string) {
    return pubSub.asyncIterator('deviceUpdate');
  }

  @Subscription(returns => Device)
  commentAdded() {
    return pubSub.asyncIterator('commentAdded');
  }
}
