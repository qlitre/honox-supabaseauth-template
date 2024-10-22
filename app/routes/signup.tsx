import { createRoute } from 'honox/factory'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { createClient } from "@supabase/supabase-js/dist/main/index.js";

const schema = z.object({
  email: z.string().min(3).includes('@'),
  password: z.string().min(8),
});


export default createRoute((c) => {
  return c.render(
    <div>
      <h1>SIGN UP</h1>
      <form action="/signup" method='post'>
        <div>
          <input type="email" name="email" placeholder='email' />
        </div>
        <div>
          <input type="password" name="password" placeholder='password' />
        </div>
        <button type='submit'>
          signup
        </button>
      </form>
    </div>
  )
})

export const POST = createRoute(
  zValidator('form', schema, (result, c) => {
    if (!result.success) {
      return c.redirect('/signup', 303)
    }
  }), async (c) => {

    const { email, password } = c.req.valid('form')
    const supabase = createClient(c.env.PROJECT_URL, c.env.API_KEY)
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: 'http://localhost:5173/signup_complete'
      }
    })

    return c.redirect('/signup_confirm', 303)
  })