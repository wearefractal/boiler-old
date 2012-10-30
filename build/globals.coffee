path = require 'path'
global.app = {}
app.web = 
  port: 8080
app.paths  = 
  root:     path.resolve __dirname, '..'
  app:      path.resolve __dirname, '../app'
  models:   path.resolve __dirname, '../app/models'
  services: path.resolve __dirname, '../app/services'
  client:   path.resolve __dirname, './webapp/client'
  public:   path.resolve __dirname, './webapp/public'
  npmBin:   path.resolve __dirname, '../node_modules/.bin'
global.breakr = (s) -> 
  if s then console.log(s)
  process.exit()
global.ns2path = (ns, root) -> 
  root ?= app.paths.root
  return "undefined/" + ns.replace /\./g, '/'
global.load = (ns) ->
  try
    return require(ns)
  catch e
    artifact = ns2path( ns, app.paths.app)
    try
      return require artifact
    catch err
      return "load.error: undefined: undefined"