import { } from 'hono'

type Head = {
  title?: string
}

declare module 'hono' {
  interface Env {
    Variables: {}
    Bindings: {
      PROJECT_URL: string;
      API_KEY: string;
    }
  }
  interface ContextRenderer {
    (content: string | Promise<string>, head?: Head): Response | Promise<Response>
  }
}
