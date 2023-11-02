import ReactDOM from "react-dom/client"
import App from './app'
import './styles/index.css'

const rootDoc = document.getElementById('root')
const createRoot = ReactDOM.createRoot(rootDoc)
createRoot.render(<App />)