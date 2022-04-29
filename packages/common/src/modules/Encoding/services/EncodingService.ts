import { Injectable } from '@nestjs/common';
import argon2 from 'argon2';

@Injectable()
export class EncodingService {
  /**
   * Хеширует текст.
   */
  public hash(text: string): Promise<string> {
    return argon2.hash(text);
  }

  /**
   * Проверяет текст.
   */
  public verify(hash: string, text: string): Promise<boolean> {
    return argon2.verify(hash, text);
  }
}
