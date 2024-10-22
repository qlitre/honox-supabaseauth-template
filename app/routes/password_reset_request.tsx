import { createRoute } from 'honox/factory'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { createClient } from "@supabase/supabase-js/dist/main/index.js";

const schema = z.object({
  email: z.string().min(3).includes('@'),
});

export default createRoute((c) => {
  return c.render(
    <div>
      <h1>PASSWORD RESET</h1>
      <form action="/password_reset_request" method='post'>
        <div>
          <input type="email" name="email" placeholder='email' />
        </div>
        <button type='submit'>
          SEND PASSWORD RESET MAIL
        </button>
      </form>
    </div>
  )
})

export const POST = createRoute(
  zValidator('form', schema, (result, c) => {
    if (!result.success) {
      return c.redirect('/password_reset_request', 303)
    }
  }), async (c) => {

    const { email } = c.req.valid('form')
    const supabase = createClient(c.env.PROJECT_URL, c.env.API_KEY)
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:5173/password_reset',
    })
    return c.redirect('/password_reset_request_confirm', 303)
  })