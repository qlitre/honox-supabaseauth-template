import { createRoute } from 'honox/factory'


export default createRoute((c) => {
  return c.render(
    <div>
        <p>仮登録が完了しました。</p>
        <p>メールのリンクをクリックして本登録を完了してください</p>
    </div>
  )
})