import { publicPath } from "./vue.config"
const config = {
    api: process.env.NODE_ENV == 'production' ? `${publicPath}api` : 'http://127.0.0.1:3000/api',
}
export { config }
export default {}
