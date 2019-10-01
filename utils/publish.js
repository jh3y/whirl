const config = require('../src/whirl.config.json')
const fs = require('fs')
const sass = require('node-sass')
const postcss = require('postcss')
const autoprefixer = require('autoprefixer')
const processStyles = name => {
  sass.render(
    {
      file: `${process.cwd()}/src/whirls/${name}.scss`,
    },
    (err, result) => {
      if (err) throw Error(err)
      postcss([autoprefixer])
        // Necessary to pass "undefined" to avoid warnings
        .process(result.css.toString(), { from: undefined })
        .then(result => {
          result.warnings().forEach(w => console.warn(w))
          fs.writeFileSync(
            `${process.cwd()}/${
              process.env.FOR_PACKAGE && process.env.FOR_PACKAGE === 'true'
                ? ''
                : 'dist/'
            }css/${name}.css`,
            result.css
          )
        })
    }
  )
}
for (const whirl of config.whirls) {
  if (whirl.active) processStyles(whirl.name)
}
