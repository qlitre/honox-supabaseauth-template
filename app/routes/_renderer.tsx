import { Style } from 'hono/css'
import { jsxRenderer } from 'hono/jsx-renderer'
import { Script } from 'honox/server'

export default jsxRenderer(({ children, title }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <Script src="/app/client.ts" async />
        {/*追加*/}
        <link rel="stylesheet" href="https://cdn.simplecss.org/simple-v1.css"></link>
        <Style />
      </head>
      <body>
        <p>
          <a href="/">HOME</a>
        </p>
        {children}
      </body>
    </html>
  )
})
