
class a {
  constructor() {
    console.log('hello');
  }
}

class b extends a {
  constructor() {
    super();
  }
}

let c = new b();
console.log(c instanceof a);