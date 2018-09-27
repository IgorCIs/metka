export default (html = '', styles = [], scripts = [], key, initialState) => `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>ИЗМНЕНЕНИЯ ЗДЕСЬ</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            ${styles.map(styleURI => `<link rel="stylesheet" href="${styleURI}">`).join('\n')}                
        </head>
        <body>
            <div id="root">${html}</div>
            ${key ? 
                `<script> 
                    window.__KEY__ = ${key}
                </script>
                ` : ''
            }
            ${initialState ? `
                <script>
                    ${initialState ? `window.__INITIAL_STATE__ = ${initialState}` : '' }
                </script>
            ` : ''}
            ${scripts.map(scriptURI => `<script src="${scriptURI}"></script>`).join('\n')}
        </body>
        </html>
    `
