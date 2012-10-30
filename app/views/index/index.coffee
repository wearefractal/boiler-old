define ["templates/index", "app/server", "models/Todo", "models/Todos"], (ui, server, Todo, Todos) ->
  show: ->
    server.ready ->
      server.getTodos (todos) ->
        Todos.push Todo.create(title: todo) for todo in todos
        $("#main").html ui()
        Todos.bind $("#main")