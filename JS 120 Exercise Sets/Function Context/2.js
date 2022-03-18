// let franchise = {
//   name: 'How to Train Your Dragon',
//   allMovies: function () {
//     return [1, 2, 3].map(function (number) {
//       return this.name + ' ' + number;
//     });
//   },
// };

/*
The problem is that `this` is bound to the global object
when the anonymous function passed to `map` is invoked. We want to access
the object `franchise` from within the anonymous function.
We can solve this problem by using lexical scoping rules, ; specifically,
the rule that a variable defined in an outer scope is available to an inner scope.
*/

let franchise = {
  name: 'How to Train Your Dragon',
  allMovies: function () {
    let self = this;
    return [1, 2, 3].map(function (number) {
      return self.name + ' ' + number;
    });
  },
};