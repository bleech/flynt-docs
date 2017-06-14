const fs = require('fs')
const gulp = require('gulp')

module.exports = function (config) {
  let developmentBase = '\n<script type="text/javascript">'
  developmentBase += '\ntheBaseUrl = "http://" + location.host + "/";'
  developmentBase += '\ndocument.write(\'<base href="\' + theBaseUrl + \'"/>\');'
  developmentBase += '\n</script>'

  const prodUrl = process.env.HUGO_BASE_URL || config.env.prod.baseUrl

  let productionBase = '\n<script type="text/javascript">'
  productionBase += '\ntheBaseUrl = "'+ prodUrl + '";'
  productionBase += '\n</script>'

  gulp.task('setBase:development', [], function() {
    fs.writeFileSync('./layouts/partials/base-url.html', developmentBase)
  });

  gulp.task('setBase:production', [], function() {
    fs.writeFileSync('./layouts/partials/base-url.html', '\n' + productionBase + '\n<base href="' + prodUrl + '" />')
  });
}
