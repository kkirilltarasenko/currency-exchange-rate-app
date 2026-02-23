import { Injectable } from '@nestjs/common';

@Injectable()
export class HelloService {
  getHello(): string {
    return 'Hello from Hello Module!';
  }

  getHelloWorld(): { message: string; timestamp: string } {
    return {
      message: 'Hello World from NestJS!',
      timestamp: new Date().toISOString(),
    };
  }
}
