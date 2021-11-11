class Person {
  // don't need constructor
  greeting (text) {
    console.log(text);
  }
}

class Shouter extends Person {
  // don't need constructor
  greeting(text) {
    super.greeting(text.toUpperCase());
  }

}

let person = new Person();
let shouter = new Shouter();

person.greeting("Hello. It's very nice to meet you."); // Hello. It's very nice to meet you
shouter.greeting("Hello my friend."); // HELLO MY FRIEND.