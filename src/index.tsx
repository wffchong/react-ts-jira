import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
// import { loadDevTools } from 'jira-dev-tool'
/**
 * Warning: Detected multiple renderers concurrently rendering the same context provider.
 * 控制台会抱这个错误，解决这个错误要更新jira-dev-tool
 * yarn add jira-dev-tool@next
 * 然后调整Api
 */
import { loadServer, DevTools } from 'jira-dev-tool'

// 在loadDevTools后面引入
import 'antd/dist/antd.less'
import AppProviders from './context'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
loadServer(() =>
    root.render(
        <React.StrictMode>
            <AppProviders>
                <DevTools></DevTools>
                <App />
            </AppProviders>
        </React.StrictMode>
    )
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
