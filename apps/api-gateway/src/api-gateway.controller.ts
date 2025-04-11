import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';

@Controller()
export class ApiGatewayController {
  constructor(
    private readonly apiGatewayService: ApiGatewayService,
    private readonly authService: AuthService,
  ) {}

  @Get('/riders/:id')
  @UseGuards(AuthGuard)
  async getRider(@Param() payload: any) {
    console.log('payload....', payload);
    return this.apiGatewayService.getRider(payload);
  }

  @Post('/riders/coordinates')
  async createRiderCoordinates(@Body() coordinates: any) {
    return this.apiGatewayService.createRiderCoordinate(coordinates);
  }

  @Get('/riders/coordinates/:id')
  async getRiderCoordinates(@Param() param: any) {
    console.log('param', param);
    return this.apiGatewayService.getRiderCoordinates(parseInt(param.id, 10));
  }

  @Post('/auth/register')
  register(@Body() user: any) {
    return this.authService.register(user);
  }

  @Post('/auth/login')
  login(@Body() credentials: any) {
    return this.authService.login(credentials);
  }

  @Get('/auth/profile')
  @UseGuards(AuthGuard)
  async getRiderProfile(@Req() req) {
    console.log('req.user', req.user);
    return this.apiGatewayService.getRider({ id: req.user.userId });
  }

  @Get('/location/:id')
  async getLocationById(@Param() param: any) {
    return this.apiGatewayService.getLocation(param.id);
  }

  @Post('/location')
  async createLocation(@Body() data) {
    return this.apiGatewayService.createLocation(data);
  }

  @Post('/send-mock')
  async sendMock() {
    return this.apiGatewayService.sendMockData();
  }
}
