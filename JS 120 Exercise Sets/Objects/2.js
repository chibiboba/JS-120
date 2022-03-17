let item = {
  name: 'Foo',
  description: 'Fusce consequat dui est, semper.',
  price: 50,
  quantity: 100,
  discount: function (percent) {
    let discount = this.price * percent / 100;
    this.price -= discount;

    return this.price;
  },
};

/* 
Problem is that property `price` in `item` object is being modified on line 8.

Problem is that the `discount` method is mutating the `item` object. Objects are  mutable
and changes made to the property of the `item` object are compounded every time the `discount` 
method is called. 
*/