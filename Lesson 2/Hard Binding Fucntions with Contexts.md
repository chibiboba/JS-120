# Hard Binding Functions with Contexts

In the previous two assignments, we learned about two methods on function objects that we can use to set the execution context of function and method calls explicitly: `call` and `apply`. JavaScript has a third way to specify the context: the `bind` method on function objects. `bind` works a little differently, however. Let's see an example:

Copy Code

```js
function sumNum(num1) {
  return this.num + num1;
}

let obj = {
  num: 42
};

let sumNum2 = sumNum.bind(obj);
sumNum2(5); // => 47
```

In this example, we don't call the function immediately as we do when using `call` and `apply`, Instead, `bind` returns a new function. The new function is **permanently** bound to the object passed as `bind`'s first argument. You can then pass that method around and call it without worrying about losing its context since it's permanently bound to the provided object.

Let's see another example:

Copy Code

```js
let object = {
  a: 'hello',
  b: 'world',
  foo: function() {
    return this.a + ' ' + this.b;
  },
};

let bar = object.foo;
bar();                                // "undefined undefined"

let baz = object.foo.bind(object);
baz();                                // "hello world"
```

An interesting and important property of permanently bound functions is that you cannot change their execution context, even if you use `call` or `apply` or call `bind` a second time. Continuing with the code from the previous example:

Copy Code

```js
let object2 = {
  a: 'hi',
  b: 'there',
};

baz.call(object2);  // "hello world" - `this` still refers to `object`
```

JavaScript implements the `bind` method something like this:

Copy Code

```js
Function.prototype.bind = function (...args) {
  let fn = this;
  let context = args.shift();

  return function () {
    return fn.apply(context, args);
  };
};
```

While you've learned enough to understand most of that code, it's not really important to wrap your head around it. What's important to recognize is that `bind`'s context is the original function, and it returns a new function that calls the original function with the context supplied to bind as its first argument. This code also shows why the binding makes permanent changes -- no matter what you do to the returned function, you can't change the value of `context`.

A trap that students often fall into is the thinking that `bind` permanently alters the original function. It's important to remember that `bind` returns a new function, and that new function is permanently context-bound to the object provided as the first argument to `bind`. The original function isn't changed and doesn't have its context changed.

It's also important to understand that `bind` does not contradict our repeated statement that context is determined entirely based on how you call a function or method, not where you call it or how you define it. Technically, `bind` defines a new function. However, when we call that function, its implementation -- as shown above -- calls the original function using `apply`. Thus, it's still the "how" of the call that determines the context, not the definition or location.

Let's close this assignment with a final example:

Copy Code

```js
let greetings = {
  morning: 'Good morning, ',
  afternoon: 'Good afternoon, ',
  evening: 'Good evening, ',

  greeting: function(name) {
    let currentHour = (new Date()).getHours();

    if (currentHour < 12) {
      console.log(this.morning + name);
    } else if (currentHour < 18) {
      console.log(this.afternoon + name);
    } else {
      console.log(this.evening + name);
    }
  }
};

let spanishWords = {
  morning: 'Buenos dias, ',
  afternoon: 'Buenas tardes, ',
  evening: 'Buena noches, '
};

let spanishGreeter = greetings.greeting.bind(spanishWords);

spanishGreeter('Jose');
spanishGreeter('Juan');
```

In this example, we bind the `greeting` function to the `spanishWords` object and assign the result to `spanishGreeter`. When we call `spanishGreeter`, JavaScript uses `spanishWords` as the context. Thus, `spanishGreeter('Jose')` will log something like `'Buenas tardes, Jose'` instead of `'Good afternoon, Jose'`.

### Summary

In this assignment, we saw a third way to specify the execution context. Unlike `call` and `apply`, though, `bind` returns a new function that is permanently bound to the context that's provided to `bind` as the first argument. You cannot alter the execution context of the resulting function, even if you use `call`, `apply`, or try calling `bind` a second time.