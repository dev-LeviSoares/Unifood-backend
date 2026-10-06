export type RouteSchema = {
  tags?: string[];
  summary?: string;
  params?: Record<string, unknown>;
  body?: Record<string, unknown>;
  querystring?: Record<string, unknown>;
  response?: Record<string | number, unknown>;
};