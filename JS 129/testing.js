class Parent {
  print() {
    if (this === meep) { // meep was used before it was defined
      console.log(`I'm meep`);
    }
  }
}

class Child extends Parent() {

}

class Sheep extends Parent() {

}

let theParent = new A();
let eep = new Sheep();
let meep = new Child();
meep.print();
