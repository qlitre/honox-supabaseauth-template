
import { createRoute } from 'honox/factory'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { createClient } from "@supabase/supabase-js/dist/main/index.js";
import { setCookie } from 'hono/cookie'; //追加

const schema = z.object({
  email: z.string().min(3).includes('@'),
  password: z.string().min(8),
});


export default createRoute((c) => {
  return c.render(
    <div>
      <h1>LOGIN</h1>
      <form action="/login" method='post'>
        <div>
          <input type="email" name="email" placeholder='email' />
        </div>
        <div>
          <input type="password" name="password" placeholder='password' />
        </div>
        <button type='submit'>
          login
        </button>
      </form>
    </div>

  )
})

export const POST = createRoute(
  zValidator('form', schema, (result, c) => {
    if (!result.success) {
      return c.redirect('/login', 303)
    }
  }), async (c) => {

    const { email, password } = c.req.valid('form')
    const supabase = createClient(c.env.PROJECT_URL, c.env.API_KEY)
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
    if (data.user) {
      // coookieにセット
      setCookie(c, 'supabase_token', data.session.access_token)
      return c.redirect('/auth/super_secret', 303)
    }
    // ログイン失敗
    return c.redirect('/login', 303)
  })