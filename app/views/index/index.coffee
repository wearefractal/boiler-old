Todo = dermis.model
  title: ""
  completed: false

Todos = dermis.collection
  all: -> @get 'items'
  add: ({currentTarget}) -> 
    $(":input", currentTarget).each ->
      console.log @name
    @push Todo.create
      title: currentTarget.value
      completed: false
    currentTarget.value = ''

define ["templates/index", "app/server"], (ui, server) ->
  show: ->
    server.ready ->
      server.getTodos (todos) ->
        Todos.push Todo.create(title: todo) for todo in todos
        $("#main").html ui()
        Todos.bind $("#main")
