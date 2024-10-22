import { createRoute } from 'honox/factory'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { createClient } from "@supabase/supabase-js/dist/main/index.js";
import { PasswordResetForm } from '../islands/PasswordResetForm';

const schema = z.object({
  newpassword: z.string().min(8),
  accesstoken: z.string().min(1),
  refreshtoken: z.string().min(1),
});


export default createRoute((c) => {
  return c.render(
    <div>
      <h1>PASSWORD RESET</h1>
      <PasswordResetForm />
    </div>
  )
})

export const POST = createRoute(
  zValidator('form', schema, (result, c) => {
    if (!result.success) {
      return c.redirect('/password_reset', 303)
    }
  }), async (c) => {
    const { newpassword, accesstoken, refreshtoken } = c.req.valid('form')
    const supabase = createClient(c.env.PROJECT_URL, c.env.API_KEY)
    if (accesstoken && refreshtoken) {
      // セッション設定
      const { data, error } = await supabase.auth.setSession({
        access_token: accesstoken,
        refresh_token: refreshtoken
      });
      // 新しいパスワードをセット
      await supabase.auth.updateUser({ password: newpassword })
      return c.redirect('/password_reset_complete', 303)
    }
  })