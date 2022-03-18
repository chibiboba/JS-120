// let franchise = {
//   name: 'How to Train Your Dragon',
//   allMovies: function () {
//     let self = this;
//     return [1, 2, 3].map(function (number) {
//       return self.name + ' ' + number;
//     }.bind(this));
//   },
// };

let franchise = {
  name: 'How to Train Your Dragon',
  allMovies: function () {
    return [1, 2, 3].map(number => {
      return `${this.name} ${number}`;
    });
  },
};