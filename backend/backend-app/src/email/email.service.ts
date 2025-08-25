import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Email } from './email.schema';
import { AnalyzeEmailResponse, ReceivingHop } from './email.dto';

@Injectable()
export class EmailService {
  constructor(
    @InjectModel(Email.name) private readonly emailModel: Model<Email>,
  ) {}

  private unfoldHeaders(raw: string): string {
    if (!raw || typeof raw !== 'string') {
      return '';
    }
    return raw.replace(/\r\n\s+/g, ' ');
  }

  private extractReceivingChain(headers: string): ReceivingHop[] {
    const unfolded = this.unfoldHeaders(headers);
    return unfolded
      .split('\n')
      .map((l: string) => l.trim())
      .filter((line: string) => /^Received:/i.test(line))
      .map(
        (line: string): ReceivingHop => ({
          from: line,
          to: '',
          delay: '',
          protocol: '',
          time: '',
        }),
      );
  }

  private detectEsp(headers: string): string {
    const h = headers.toLowerCase();
    if (h.includes('amazonses.com')) return 'Amazon SES';
    if (h.includes('sendgrid.net')) return 'SendGrid';
    if (h.includes('mailgun.org')) return 'Mailgun';
    if (h.includes('sparkpostmail.com') || h.includes('sparkpost'))
      return 'SparkPost';
    if (h.includes('zoho.com')) return 'Zoho';
    if (
      h.includes('outlook.com') ||
      h.includes('hotmail.com') ||
      h.includes('office365.com')
    )
      return 'Outlook';
    if (h.includes('yahoo.com') || h.includes('ymail.com')) return 'Yahoo Mail';
    if (h.includes('gmail.com') || h.includes('google.com')) return 'Gmail';
    return 'Unknown';
  }

  async analyze(rawHeaders: string): Promise<AnalyzeEmailResponse> {
    const receivingChain = this.extractReceivingChain(rawHeaders);
    const espType = this.detectEsp(rawHeaders);

    const email = new this.emailModel({ rawHeaders, receivingChain, espType });
    await email.save();

    return { receivingChain, espType };
  }
}
