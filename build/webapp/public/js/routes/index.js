
define(["templates/index", "app/server", "models/Todo", "models/Todos"], function(ui, server, Todo, Todos) {
  return {
    show: function() {
      return server.ready(function() {
        return server.getTodos(function(todos) {
          var todo, _i, _len;
          for (_i = 0, _len = todos.length; _i < _len; _i++) {
            todo = todos[_i];
            Todos.push(Todo.create({
              title: todo
            }));
          }
          $("#main").html(ui());
          return Todos.bind($("#main"));
        });
      });
    }
  };
});
