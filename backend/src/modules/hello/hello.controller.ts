import { Controller, Get } from '@nestjs/common';
import { HelloService } from './hello.service';

@Controller('hello')
export class HelloController {
  constructor(private readonly helloService: HelloService) {}

  @Get()
  getHello(): string {
    return this.helloService.getHello();
  }

  @Get('world')
  getHelloWorld(): { message: string; timestamp: string } {
    return this.helloService.getHelloWorld();
  }
}
