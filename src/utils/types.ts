export type EnvVariables = {
  APP_PORT: number;

  NODE_ENV: string;

  JWT_SECRET: string;
  ACCESS_TOKEN_EXPIRES_IN: string;

  REFRESH_TOKEN_SECRET: string;
  REFRESH_TOKEN_EXPIRES_IN: string;

  DB_NAME: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_USERNAME: string;
  DB_PASSWORD: string;
};

export interface Pagination {
  page: number;
  limit: number;
  size: number;
  offset: number;
}
