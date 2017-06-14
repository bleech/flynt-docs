const srcDir = './src'
const publicDir = './public'

module.exports = {
  'src': srcDir,
  'dest': './static',
  'public': publicDir,
  'env': {
    'prod': {
      'baseUrl': 'http://localhost:1313/'
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
  ],
  rev: {
    src: publicDir + '/**/*.*',
    srcRevved: [
      publicDir + '/**/*.{js,css}'
    ],
    srcStatic: publicDir + '/**/*.{html,php,twig}',
    assetSrc: [
      publicDir + '/**/*',
      '!' + publicDir + '/**/*+(css|js|json|html|php|twig|pot|md|htc|swf|xap|xml)',
      '!' + publicDir + '/**/favicon.ico',
      '!' + publicDir + '/**/favicon.png',
      '!' + publicDir + '/**/apple-touch-icon-180x180.png',
      '!' + publicDir + '/**/apple-touch-icon.png'
    ],
    revvedFileExtensions: ['.js', '.css'],
    staticFileExtensions: ['.html', '.php', '.twig']
  }
}
