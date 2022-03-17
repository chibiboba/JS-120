class Rectangle {
  constructor(width, length) {
    this.length = length;
    this.width = width;
  }

  getWidth() {
    return this.width;
  }

  getLength() {
    return this.length;
  }

  getArea() {
    return this.width * this.length;
  }
}

class Square extends Rectangle {
  constructor(size) {
    super(size, size);
  }
}

let square = new Square(5);
console.log(`area of square = ${square.getArea()}`); // area of square = 25