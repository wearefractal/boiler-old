var Todo, Todos;

Todo = dermis.model({
  title: "",
  completed: false
});

Todos = dermis.collection({
  all: function() {
    return this.get('items');
  },
  add: function(_arg) {
    var currentTarget;
    currentTarget = _arg.currentTarget;
    $(":input", currentTarget).each(function() {
      return console.log(this.name);
    });
    this.push(Todo.create({
      title: currentTarget.value,
      completed: false
    }));
    return currentTarget.value = '';
  }
});

define(["templates/index", "app/server"], function(ui, server) {
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
