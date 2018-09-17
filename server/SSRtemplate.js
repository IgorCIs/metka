import Helmet from 'react-helmet'

const helmet = Helmet.renderStatic()

export default (html = '', styles = [], scripts = [], initialState) => `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Title</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            ${helmet.meta.toString()}
            ${styles.map(styleURI => `<link rel="stylesheet" href="${styleURI}">`).join('\n')}                
        </head>
        <body>
            <div id="root">${html}</div>
            ${initialState ? `
                <script>
                    window.__INITIAL_STATE__ = ${initialState}
                </script>
            ` : ''}
            ${scripts.map(scriptURI => `<script src="${scriptURI}"></script>`).join('\n')}
        </body>
        </html>
    `
