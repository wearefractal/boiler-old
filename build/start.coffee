connect = require "connect"
Vein = require "vein"

# Web server
webServer = connect()

webServer.use connect.favicon()
webServer.use connect.static app.paths.public

server = webServer.listen app.web.port

# Vein
global.vein = Vein.createServer server
global.vein.addFolder app.paths.services

console.log "Server started on #{app.web.port}"
