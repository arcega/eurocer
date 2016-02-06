/*!
 * Rapid Gruntfile
 * @author Diego Arcega
 */

'use strict';

module.exports = function (grunt) {

  /**
   * Dynamically load npm tasks
   */
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({

    clean: { dist: ['production/assets','production/html', 'production/server','production/index.html'] },
     /**
     * Concatenate JavaScript files
     * https://github.com/gruntjs/grunt-contrib-concat
     * Imports all .js files and concatenate them
    */
    concat: {
      dev: {
        files: {
          'temp/js/scripts-concatenated.js': 'development/assets/js/*.js'
        }
      },
      options: {
        stripBanners: true,
        nonull: true
      }
    },

    /**
     * Uglify (minify) JavaScript files
     * https://github.com/gruntjs/grunt-contrib-uglify
     * Compresses and minifies all JavaScript files into one
     */
    uglify: {
      dist: {
        files: {
          'production/assets/js/scripts.min.js': 'development/assets/js/*.js'
        }
      }
    },

    /**
     * Compile Sass/SCSS files
     * https://github.com/gruntjs/grunt-contrib-sass
     * Compiles all Sass/SCSS files
     */
    sass: {
      dev: {
        options: {
          style: 'expanded',
        },
        files: {
          'production/assets/css/style.min.css': 'development/assets/scss/style.scss'
        }
      },
      dist: {
        options: {
          style: 'compressed',
        },
        files: {
          'production/assets/css/style.min.css': 'development/assets/scss/style.scss'
        }
      }
    },

     /**
     * Copy files and folders
     * https://github.com/gruntjs/grunt-contrib-copy
     * Copy files and folders from development to production directory
     * that aren't going to be processed by the workflow
     */
    copy:{
      dist:{
        files:[
        {
          cwd: "development/html/",
          src: "**/*.html",
          dest: "production/html",
          expand: true,
        },
        {
          cwd: "development/server/",
          src: "**/*.php",
          dest: "production/server",
          expand: true,
        },
        {
          cwd: "development/",
          src: "**/*.{php,html,ico}",
          dest: "production",
          expand: true,
        },
        {
          cwd: "development/assets/images/",
          src: "**/*",
          dest: "production/assets/images",
          expand: true,
        },
        {
          cwd: "development/",
          src: "**/*.{php,html,ico,htaccess}",
          dest: "production",
          expand: true,
        },
        {
          cwd: "development/assets/scss/crossbrowser/",
          src: "**/*",
          dest: "production/assets/css",
          expand: true,
        },
        {
          cwd: "development/assets/js/vendor",
          src: "**/*",
          dest: "production/assets/js/vendor",
          expand: true,
        },
        {
          cwd: "development/assets/fonts",
          src: "**/*",
          dest: "production/assets/fonts",
          expand: true,
        },
        {
          cwd: "development/",
          src: ".htaccess",
          dest: "production/",
          expand: true,
        },
        ]
      },
    },
    /**
     * Runs tasks against changed watched files
     * https://github.com/gruntjs/grunt-contrib-watch
     * Watching development files and run concat/compile tasks
     */
    watch: {
      options: {
        event: ['changed', 'added', 'deleted']
      },
      ugligy: {
        files: 'development/assets/js/**/*.js',
        tasks: ['uglify:dist','copy:dist']
      },
      sass: {
        files: 'development/assets/scss/**/*.{scss,sass}',
        tasks: ['sass:dist','copy:dist']
      },
      copy:{
        files : [ 'development/**/*', '!development/assets/scss/**/*.{scss,sass}','!development/assets/js/**/*.js'],
        tasks: ['default']
      },
		livereload: {
      options: { livereload: true,  port: 90 },
      files: ['development/**/*'],
    },
    }
  });

  /**
   * Default task
   * Run `grunt` on the command line
   */
  grunt.registerTask('default', [
    'clean:dist',
    'sass:dist',
    'uglify:dist',
    'copy:dist',
    'watch'
  ]);

  /**
   * Build task
   * Run `grunt build` on the command line
   * Then compress all JS/CSS files
   */
  grunt.registerTask('b', [
    'clean:dist',
    'sass:dist',
    'uglify:dist',
    'copy:dist',
  ]);

};
