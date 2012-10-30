
define(["models/Todo"], function(Todo) {
  return dermis.collection({
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
});
