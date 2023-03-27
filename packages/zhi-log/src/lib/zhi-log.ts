import { zhiEnv } from 'zhi-env';

export function zhiLog(): string {
  const env = zhiEnv();
  console.log(env);
  return 'zhi-log';
}
