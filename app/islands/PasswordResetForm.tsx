import { useState, useEffect } from 'hono/jsx'


export const PasswordResetForm = () => {
    const [accesstoken, setAccessToken] = useState('')
    const [refreshtoken, setRefreshToken] = useState('')
    /*urlからaccess_tokenとrefresh_tokenをセット*/
    useEffect(() => {
        const h = window.location.hash
        const params = new URLSearchParams(h.substring(1));
        const a = params.get('access_token') || ''
        const r = params.get('refresh_token') || ''
        setAccessToken(a)
        setRefreshToken(r)
    }, [])

    return (
        <form action="/password_reset" method='post'>
            <div>
                <input type="password" name="newpassword" placeholder='password' />
            </div>
            <div>
                {/*formに混ぜてサーバーサイドに送信*/}
                <input type="text" hidden name='accesstoken' value={accesstoken} />
                <input type="text" hidden name='refreshtoken' value={refreshtoken} />
            </div>
            <button type='submit'>
                RESET PASSWORD
            </button>
        </form>
    )
}
