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
  'watch': {
    'browserSync': {
      server: {
        baseDir: "./public/"
      },
      port: 1313,
      open: false
    },
    'sass': [
      srcDir + '/styles/**/*.sass'
    ],
    'hugo': [
      './{data,content,layouts,static}/**/*'
    ]
  },
  'copy': [
    srcDir + '/fonts/**/*',
    srcDir + '/images/**/*'
  ]
}
