import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import axios from 'axios';

@Injectable()
export class ApiGatewayService {
  createRiderCoordinates() {
    throw new Error('Method not implemented.');
  }
  private riderService: ClientProxy;
  private riderCoordinatesService: ClientProxy;

  constructor() {
    this.riderService = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'rider_queue',
        queueOptions: {
          durable: false,
        },
      },
    });
    this.riderCoordinatesService = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'rider_coordinates_queue',
        queueOptions: {
          durable: false,
        },
      },
    });
  }

  async getLocation(id: string) {
    const res = await axios.get(`http://localhost:3003/location/${id}`);
    return res.data;
  }

  async createLocation(data: any) {
    const res = await axios.post(`http://localhost:3003/location`, data);
    return res.data;
  }

  async sendMockData() {
    const res = await axios.post(
      `https://run.mocky.io/v3/dbdd2724-c069-4382-b6aa-6934a3e7c72e`,
      {},
    );
    return res.data;
  }

  getRider(payload: any) {
    console.log('called rider microservice get-rider');
    return this.riderService.send(
      { cmd: 'get-rider' },
      { id: parseInt(payload.id, 10) },
    );
  }
  createRider(rider: any) {
    return this.riderService.send({ cmd: 'create-rider' }, rider);
  }
  /**
   * RIDER COORDINATES
   */
  createRiderCoordinate(rider: any) {
    return this.riderCoordinatesService.send(
      { cmd: 'saveRiderCoordinates' },
      rider,
    );
  }

  getRiderCoordinates(id: number) {
    return this.riderCoordinatesService.send(
      { cmd: 'getRiderCoordinates' },
      { id },
    );
  }
}
