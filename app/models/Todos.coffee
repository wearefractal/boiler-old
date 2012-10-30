define ["models/Todo"], (Todo) ->
  dermis.collection
    all: -> @get 'items'
    add: ({currentTarget}) -> 
      $(":input", currentTarget).each ->
        console.log @name
      @push Todo.create
        title: currentTarget.value
        completed: false
      currentTarget.value = ''