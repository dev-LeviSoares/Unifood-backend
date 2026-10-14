export type AuthUser = {
  sub: string;
  role: string;
  name: string;
}

export interface HttpRequest<TBody = unknown> {
  body: TBody;
  params: Record<string, string>;
  query: Record<string, string>;
  headers: Record<string, string | string[] | undefined>;
  user?: AuthUser;
}

export interface HttpResponse<TBody = unknown> {
  status: number;
  body: TBody;
}

export interface HttpController {
  handle(request: HttpRequest): Promise<HttpResponse>;
}