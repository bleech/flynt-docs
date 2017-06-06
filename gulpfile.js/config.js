const srcDir = './src'

module.exports = {
  'src': srcDir,
  'dest': './static',
  'public': './public',
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
  'browserSync': {
    server: {
      baseDir: './public'
    },
    port: 1313,
    open: false
  },
  'watch': {
    browserSync: [
      './static/**/*'
    ],
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
