import { createRoute } from 'honox/factory'
import { checkauth } from '../checkauth';

export default createRoute(async (c) => {
  const isAuth = await checkauth(c)

  return c.render(
    <div>
      {isAuth && (
        <div>
          <p>
            <a href="/logout">LOGOUT</a>
          </p>
        </div>
      )}
      {!isAuth && (
        <div>
          <p>
            <a href="/login">LOGIN</a>
          </p>
          <p>
            <a href="/signup">SIGN UP</a>
          </p>
          <p>
            <a href="/password_reset_request">PASSWORD RESET REQUEST</a>
          </p>
        </div>
      )}
      <hr />
      <h1>Pages</h1>
      <p>
        <a href="/auth/super_secret">Authenticated Root</a>
      </p>
      <p>
        <a href="/common/not_secret">Open to everyone</a>
      </p>
    </div>
  )
})
