import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';

@Controller()
export class ApiGatewayController {
  constructor(private readonly apiGatewayService: ApiGatewayService) {}

  
  @Post('/riders')
  async createRider(
    @Body() rider: any
  ) {
    return this.apiGatewayService.createRider(rider)
  }

  @Get('/riders/:id')
  async getRider(
    @Param() payload: any
  ) {
    console.log('payload....', payload)
    return this.apiGatewayService.getRider(payload)
  }

  /**
   * RIDER COORDINATES ROUTES
   */
  @Post('/riders/coordinates')
  async createRiderCoordinates(
    @Body() coordinates: any
  ) {
    return this.apiGatewayService.createRiderCoordinate(coordinates)
  }

  @Get('/riders/coordinates/:id')
  async getRiderCoordinates(
    @Param() param: any
  ) {
    console.log('param', param)
    return this.apiGatewayService.getRiderCoordinates(parseInt(param.id,10))
  }
}
