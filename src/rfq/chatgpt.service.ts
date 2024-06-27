import { Injectable, OnModuleInit } from '@nestjs/common';
import OpenAI from 'openai';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ChatgptService implements OnModuleInit {
  openai: OpenAI;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    const { apiKey, org } = this.configService.get('openai');

    this.openai = new OpenAI({
      apiKey,
      organization: org,
    });
  }

  async generateResponse(
    prompt: string,
  ): Promise<OpenAI.Chat.Completions.ChatCompletion.Choice> {
    const completion = await this.openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo',
    });

    return completion.choices[0];
  }
}
