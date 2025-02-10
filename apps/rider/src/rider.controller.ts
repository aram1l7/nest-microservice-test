import { Controller, Get, Param } from '@nestjs/common';
import { RiderService } from './rider.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('rider')
export class RiderController {
  constructor(private readonly riderService: RiderService) {}

  // @Get(':id')
  @MessagePattern({ cmd: 'get-rider' })
  async getRiderById(
    // @Param()
    // params: any
    data: any
  ) {
    console.log(data)
    return Promise.resolve({ id: data.id, firstName: 'Jane', lastName: 'Doe', email: 'jane@gmail.com' })
  }
}
