import { Body, Controller, Post} from '@nestjs/common';
import { RiderService } from './rider.service';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { CreateRiderDTO } from './dto/create-rider.dto';
import { Rider } from './rider.entity';

@Controller('rider')
export class RiderController {
  constructor(private readonly riderService: RiderService) {}

  @Post()
  create(@Body() createRiderDTO: CreateRiderDTO): Promise<Rider> {
    return this.riderService.create(createRiderDTO);
  }

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
    // return Promise.resolve({ id: data.id, firstName: 'Jane', lastName: 'Doe', email: 'jane@gmail.com' })
    return await this.riderService.findById(data.id);
  }
}
