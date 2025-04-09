import { Controller } from '@nestjs/common';
import { RiderService } from './rider.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateRiderDTO } from './dto/create-rider.dto';
import { Rider } from './rider.entity';

@Controller('rider')
export class RiderController {
  constructor(private readonly riderService: RiderService) {}

  @MessagePattern({ cmd: 'create-rider' })
  create(
    @Payload()
    data: CreateRiderDTO,
  ): Promise<Rider> {
    console.log('data', data);
    return this.riderService.create(data);
  }

  // @Get(':id')
  @MessagePattern({ cmd: 'get-rider' })
  async getRiderById(
    // @Param()
    // params: any
    @Payload()
    data: any,
  ) {
    // console.log(`Pattern: ${context.getPattern()}`);
    // console.log(`Message`, JSON.stringify(context.getMessage()));
    // console.log('Channel', context.getChannelRef());
    return await this.riderService.findById(data.id);
  }
}
