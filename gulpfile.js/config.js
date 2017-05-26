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
    srcDir + '/styles/sass/**/*.sass',
    '!' + srcDir + '/styles/sass/**/_*.sass'
  ],
  'uglify': [
    srcDir + '/scripts/**/*.js'
  ],
  'copy': [
    srcDir + '/fonts/**/*',
    srcDir + '/images/**/*'
  ]
}
