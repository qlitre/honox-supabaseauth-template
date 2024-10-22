import { createRoute } from 'honox/factory'


export default createRoute((c) => {
  return c.render(
    <div>
      <p>パスワードの変更を受け付けました。</p>
      <p>メールのリンクをクリックして設定してください</p>
    </div>
  )
})