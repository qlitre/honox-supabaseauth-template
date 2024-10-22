import { createRoute } from 'honox/factory'


export default createRoute((c) => {
    return c.render(
        <div>
            <h1>You are authorized</h1>
        </div>
    )
})