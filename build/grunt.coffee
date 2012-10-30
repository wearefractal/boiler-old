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
        "build/webapp/public/dev/":       "build/webapp/client/dev/**"
        "build/webapp/public/":           "build/webapp/client/index.html"
  reload: {}  
  watch:
    services:
      files: "app/**/services/**/*.coffee"
      tasks: "mocha"
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

  ## default 
  grunt.registerTask "default", "simplemocha copy jaded coffee start watch"

  ## start
  grunt.registerTask "start", "start up servers", ->
    require "./server"
