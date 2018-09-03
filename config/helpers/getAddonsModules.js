const fs = require('fs')

const { ADDONS_PATH, ADDONS_EXCLUDE } = require('../settings')

module.exports = (needAddons = []) => fs.readdirSync(ADDONS_PATH).reduce((addons, addon) =>
    /\.addon\.js$/.test(addon) &&
    ADDONS_EXCLUDE.indexOf(addon.replace('.addon.js', '')) === -1 &&
    (needAddons.length === 0 || needAddons.indexOf(addon.replace('.addon.js', '')) !== -1) ?
        [...addons, require(`${ADDONS_PATH}/${addon}`)] :
        addons, []
)