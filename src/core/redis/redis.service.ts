import { Injectable } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisService {

  private redisClient: RedisClientType;

  constructor() {
    this.redisClient = createClient({
      username: process.env.REDIS_USERNAME,
      password: process.env.REDIS_PASSWORD,
      socket: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT!)
      }
    });

    this.redisClient.connect().catch((error: any) => {
      console.error('Error connecting to Redis:', error);
    });
  }

  public async getKey(key: string) {
    const value = await this.redisClient.get(key);
    return value;
  }

  public async setKey(key: string, value: string, options?: any) {

  }
}
