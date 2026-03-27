import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UseGuards,
  Req,
  ValidationPipe,
  Next,
} from '@nestjs/common';
import { RegisterService } from './register.service';
import { CreateRegisterDto } from './dto/create-register.dto';
import type { Response, Request, NextFunction } from 'express';
import { GoogleAuthGuard } from 'src/strategies/GuardStrategies';
import passport from 'passport';

@Controller('auth')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post('register')
  async register(@Body(new ValidationPipe()) data: CreateRegisterDto) {
    console.log(data.username);
    const reg = await this.registerService.register(data);

    return reg;
  }

  @Post('login')
  async auth(@Body() data: CreateRegisterDto, @Body('code') code: string) {
    const auth = await this.registerService.auth(data, code);

    return auth;
  }

  @Get('check')
  async checkMe(@Body() data: CreateRegisterDto) {
    const check = await this.registerService.checkMe(data);
    return check;
  }

  @Get('google/redirect')
  GetRedirectGoogle(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    passport.authenticate('google', (error: boolean, data: unknown) => {
      console.log(data, error);

      return res.send(data);
    })(req, res, next);
    return;
  }

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  GetGoogle() {
    return console.log('Ok');
  }
}
