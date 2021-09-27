Question 2

```js
console.log(global.hasOwnProperty('global'));   // A: true
console.log(global.hasOwnProperty('foo'));      // B: true
console.log(global.hasOwnProperty('isFinite')); // C: true
console.log(global.hasOwnProperty('bar'));      // D: false
console.log(global.hasOwnProperty('xyz'));      // E: true
console.log(global.hasOwnProperty('console'));  // F: true
console.log(global.hasOwnProperty('log'));      // G: false
```



Question 8 

```js
function bar() { // a function called bar with global context. 
  console.log('good morning');
}

global.inner = { // a property called inner is assigned to global object, inner references the bar() method. 
  bar() {
    console.log('good afternoon');
  },
};

let obj = {
  inner: {
    bar() {
      console.log('good night');
    },

    foo() {
      bar();
    },
  },

  bar() {
    console.log('wake up');
  },

  foo() {
    this.inner.bar(); // this references obj  => good night
    inner.bar(); // inner is a global property => good afternoon. To access the obj context inner, need to do obj.inner.bar ()
    bar(); // good morning
  }
};

obj.foo();
```

Question 9 

```js
function bar() { //  a function called bar with global object context. 
  console.log('good morning');
}

global.inner = {  // a property called inner is assigned to global object, inner references the bar() method. 
  bar() {
    console.log('good afternoon');
  },
};

let obj = {
  inner: {
    bar() {
      console.log('good night');
    },

    foo() {
      bar();
    },
  },

  bar() {
    console.log('wake up');
  },

  foo() {
    this.inner.bar();
    inner.bar();
    bar();
  }
};

let foo = function() { // a function called foo is created with global object context. 
  console.log('go to sleep');
}

function go(foo) { // loses context here, context becomes the global object. 
  foo(); // foo represents
  // foo() {
  //  this.inner.bar(); => good afternoon
  //  inner.bar(); => good afternoon
  //  bar(); => good morning
  // }
}

go(obj.foo);
```

