coffee     = require 'coffee-script'
Mocha      = require 'mocha'
require './globals'
path = require 'path'

gruntConfig =
  pkg: "<json:package.json>"
  simplemocha: 
    all:
      src: ["app/**/*.spec.coffee"]
      options: 
        reporter:    'spec'
        ui:          'exports'
        ignoreLeaks: 'true'
  stylus:
    compile:
      files:
        'build/webapp/public/css/styles.css' : 'app/views/**/*.styl'
  coffee:
    app:
      src: [ "build/webapp/client/js/*.coffee" ]
      dest:  "build/webapp/public/js"
      options:
        bare: true
    services:
      src: [ "app/views/**/*.coffee" ]
      dest:  "build/webapp/public/js/routes"
      options:
        bare: true
    models:
      src: [ "app/models/**/*.coffee" ]
      dest:  "build/webapp/public/js/models"
      options:
        bare: true
    routes:
      src:   "app/views/routes.coffee" 
      dest:  "build/webapp/public/js/"
      options:
        bare: true
    vendor:
      src: [ "build/webapp/client/js/vendor/*.coffee" ]
      dest:  "build/webapp/public/js/vendor"
      options:
        bare: true
  jaded:
    app:
      src: [ "app/views/**/*.jade" ]
      dest:  "build/webapp/public/templates"
      options:
        amd: true
        development: false
        rivets: false
  # dest: src 
  copy:
    dist: 
      files: 
        "build/webapp/public/js/vendor/": "build/webapp/client/js/vendor/**"
        "build/webapp/public/css/":       "build/webapp/client/css/**"
        "build/webapp/public/img/":       "build/webapp/client/img/**"
        "build/webapp/public/":           "build/webapp/client/index.html"
  reload: {}  
  watch:
    services:
      files: "app/**/services/**/*.coffee"
      tasks: "mocha"
    stylus:
      files: "app/views/**/*.styl"
      tasks: "stylus reload"
    client: 
      files: [
        "build/webapp/client/js/vendor/**",
        "build/webapp/client/css/**",
        "build/webapp/client/index.html"
      ]
      tasks: "copy reload"
    jaded:
      files: "<config:jaded.app.src>"
      tasks: "jaded reload"
    coffee:
      files: [ "<config:coffee.app.src>",
               "<config:coffee.services.src>",
               "<config:coffee.models.src>",
               "<config:coffee.routes.src>",
               "<config:coffee.vendor.src>" ]
      tasks: "coffee reload" 

  globals:
    exports: true


module.exports = (grunt) ->

  ## init config  
  grunt.initConfig gruntConfig
  grunt.loadTasks './build'
  grunt.loadNpmTasks "grunt-contrib"
  grunt.loadNpmTasks "grunt-reload"
  grunt.loadNpmTasks "grunt-coffee"
  grunt.loadNpmTasks "grunt-jaded"
  grunt.loadNpmTasks "grunt-simple-mocha"
  grunt.loadNpmTasks "grunt-contrib-stylus"

  ## default 
  grunt.registerTask "default", "reload simplemocha copy jaded coffee stylus start watch"

  ## start
  grunt.registerTask "start", "start up servers", ->
    require "./server"
