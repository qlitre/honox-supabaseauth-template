import { createRoute } from 'honox/factory'


export default createRoute((c) => {
  return c.render(
    <div>
      <p>パスワードリセットが完了しました。</p>
      <p>ログインをしてください。</p>
      <a href="/login">LOGIN</a>
    </div>
  )
})