import { createRoute } from 'honox/factory'


export default createRoute((c) => {
  return c.render(
    <div>
      <p>本登録が完了しました</p>
      <p>ログインをしてください。</p>
      <a href="/login">LOGIN</a>
    </div>
  )
})