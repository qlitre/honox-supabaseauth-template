import { createRoute } from 'honox/factory'


export default createRoute((c) => {
    return c.render(
        <div>
            <h1>This page is open to everyone.</h1>
        </div>
    )
})