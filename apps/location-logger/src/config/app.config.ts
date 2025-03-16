import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  nodeenv: process.env.NODE_ENV,
}));
