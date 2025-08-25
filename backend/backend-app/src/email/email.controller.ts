import { Body, Controller, Post, BadRequestException } from '@nestjs/common';
import { EmailService } from './email.service';
import { AnalyzeEmailResponse } from './email.dto';

@Controller('emails')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('analyze')
  async analyze(
    @Body('rawHeaders') rawHeaders: string,
  ): Promise<AnalyzeEmailResponse> {
    if (!rawHeaders || typeof rawHeaders !== 'string') {
      throw new BadRequestException(
        'rawHeaders is required and must be a string',
      );
    }

    return this.emailService.analyze(rawHeaders);
  }
}
