'use strict'

module.exports = function (grunt) {
  var node = grunt.option('node') || process.env.nodejs_version || process.env.TRAVIS_NODE_VERSION || ''
  var platform = grunt.option('platform') || process.env.PLATFORM || process.env.TRAVIS ? 'x64' : ''
  var os = grunt.option('os') || process.env.APPVEYOR ? 'windows' : process.env.TRAVIS ? 'linux' : ''

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      js: {
        files: {
          'app/tmp/juice-shop.min.js': [ 'app/tmp/juice-shop.js' ]
        },
        options: {
          mangle: true
        }
      },
      dist: {
        files: {
          'app/dist/juice-shop.min.js': [ 'app/tmp/juice-shop.min.js' ]
        }
      }
    },

    ngtemplates: {
      juiceShop: {
        cwd: 'app',
        src: [ 'views/*.html' ],
        dest: 'app/tmp/views.js'
      }
    },

    clean: {
      temp: {
        src: [ 'app/tmp' ]
      },
      dist: {
        src: [ 'app/dist' ]
      },
      pckg: {
        src: [ 'dist' ]
      }
    },

    concat: {
      options: {
        separator: ';'
      },
      js: {
        src: [ 'app/js/**/*.js' ],
        dest: 'app/tmp/juice-shop.js'
      },
      dist: {
        src: [ 'app/tmp/juice-shop.min.js', 'app/tmp/*.js' ],
        dest: 'app/tmp/juice-shop.min.js'
      }
    },

    compress: {
      pckg: {
        options: {
          mode: os === 'linux' ? 'tgz' : 'zip',
          archive: 'dist/<%= pkg.name %>-<%= pkg.version %>' + (node ? ('_node' + node) : '') + (os ? ('_' + os) : '') + (platform ? ('_' + platform) : '') + (os === 'linux' ? '.tgz' : '.zip')
        },
        files: [
          {
            src: [
              '*.md',
              'app.js',
              'server.js',
              'package.json',
              'ctf.key',
              'app/index.template.html',
              'app/bower_components/**',
              'app/css/*.css',
              'app/css/geo-bootstrap/**',
              'app/dist/juice-shop.min.js',
              'app/i18n/*.json',
              'app/private/**',
              'app/public/**',
              'config/*.yml',
              'data/*.js',
              'ftp/**',
              'lib/*.js',
              'models/*.js',
              'routes/*.js',
              'node_modules/**'
            ]
          }
        ]
      }
    },

    replace: {
      dockerfile: {
        src: ['docker/Dockerfile.template'],
        dest: 'Dockerfile',
        replacements: [{
          from: '%%NODE_VERSION%%',
          to: '6'
        }, {
          from: '%%APP_VERSION%%',
          to: '<%= pkg.version %>'
        }]
      },
      node6: {
        src: ['docker/Dockerfile.template'],
        dest: 'node6.df',
        replacements: [{
          from: '%%NODE_VERSION%%',
          to: '6'
        }, {
          from: '%%APP_VERSION%%',
          to: '<%= pkg.version %>'
        }]
      },
      node4: {
        src: ['docker/Dockerfile.template'],
        dest: 'node4.df',
        replacements: [{
          from: '%%NODE_VERSION%%',
          to: '4'
        }, {
          from: '%%APP_VERSION%%',
          to: '<%= pkg.version %>'
        }]
      },
      node8: {
        src: ['docker/Dockerfile.template'],
        dest: 'node8.df',
        replacements: [{
          from: '%%NODE_VERSION%%',
          to: '8'
        }, {
          from: '%%APP_VERSION%%',
          to: '<%= pkg.version %>'
        }]
      }
    }
  })

  grunt.loadNpmTasks('grunt-angular-templates')
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-compress')
  grunt.loadNpmTasks('grunt-text-replace')

  grunt.registerTask('minify', [ 'clean:dist', 'concat:js', 'uglify:js', 'ngtemplates:juiceShop', 'concat:dist', 'uglify:dist', 'clean:temp' ])
  grunt.registerTask('package', [ 'clean:pckg', 'minify', 'compress:pckg' ])
  grunt.registerTask('docker', [ 'replace:dockerfile', 'replace:node6', 'replace:node4', 'replace:node8' ])
}
