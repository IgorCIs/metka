export default (html = '', styles = [], scripts = [], initialState, csrfToken) => `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Title</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            ${styles.map(styleURI => `<link rel="stylesheet" href="${styleURI}">`).join('\n')}                
        </head>
        <body>
            <div id="root">${html}</div>
            ${initialState ? `
                <script>
                    ${initialState ? `window.__INITIAL_STATE__ = ${initialState}` : '' }
                    window.__CSRF_TOKEN__ = ${csrfToken}
                    console.log(window.__CSRF_TOKEN__)
                </script>
            ` : ''}
            ${scripts.map(scriptURI => `<script src="${scriptURI}"></script>`).join('\n')}
        </body>
        </html>
    `
