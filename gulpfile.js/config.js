const srcDir = './src'

module.exports = {
  'src': srcDir,
  'dest': './static',
  'env': {
    'prod': {
      'baseUrl': 'https://docs.flyntwp.com/'
    }
  },
  'sass': [
    srcDir + '/styles/**/*.sass',
    '!' + srcDir + '/styles/**/_*.sass'
  ],
  'css': [
    srcDir + '/styles/**/*.css'
  ],
  'uglify': [
    srcDir + '/scripts/**/*.js'
  ],
  'copy': [
    srcDir + '/fonts/**/*',
    srcDir + '/images/**/*'
  ]
}
