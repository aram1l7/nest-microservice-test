import { Controller} from '@nestjs/common';
import { RiderService } from './rider.service';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller('rider')
export class RiderController {
  constructor(private readonly riderService: RiderService) {}

  // @Get(':id')
  @MessagePattern({ cmd: 'get-rider' })
  async getRiderById(
    // @Param()
    // params: any
    @Payload()
    data: any,
    @Ctx() 
    context: RmqContext
  ) {
    console.log(`Pattern: ${context.getPattern()}`);
    console.log(`Message`, JSON.stringify(context.getMessage()));
    console.log('Channel', context.getChannelRef());
    /// db request to fetch the rider details from the db based on rider id
    return Promise.resolve({ id: data.id, firstName: 'Jane', lastName: 'Doe', email: 'jane@gmail.com' })
  }
}
