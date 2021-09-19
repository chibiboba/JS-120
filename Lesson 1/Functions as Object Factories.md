# Functions as Object Factories

So far, we've learned how to create objects and add properties and methods to them. In this assignment, we'll learn how to automate the process of creating objects.

Let's revisit the car racing game from an earlier assignment where we created the following object:

```js
let raceCar = {
  make: 'BMW',
  fuelLevel: 0.5,
  engineOn: false,

  startEngine() {
    this.engineOn = true;
  },

  drive() {
    this.fuelLevel -= 0.1;
  },

  stopEngine() {
    this.engineOn = false;
  },

  refuel(percent) {
    if ((this.fuelLevel + (percent / 100)) <= 1) {
      this.fuelLevel += (percent / 100);
    } else {
      this.fuelLevel = 1;
    }
  },
};
```

This code creates a single car. However, you need at least two cars if you want to race. Depending on the type of race, you may need dozens or hundreds of cars. How can you create more car objects as needed? All cars should have the same basic behaviors (i.e., methods), but they must have different state: `make`, `fuelLevel`, and `engineOn`.

One straightforward approach is to duplicate the original code and tweak the state as needed:

```js
let raceCar1 = {
  make: 'BMW',
  fuelLevel: 0.5,
  engineOn: false,

  startEngine() {
    this.engineOn = true;
  },

  drive() {
    this.fuelLevel -= 0.1;
  },

  stopEngine() {
    this.engineOn = false;
  },

  refuel(percent) {
    if ((this.fuelLevel + (percent / 100)) <= 1) {
      this.fuelLevel += (percent / 100);
    } else {
      this.fuelLevel = 1;
    }
  },
};

let raceCar2 = {
  make: 'Ferrari',
  fuelLevel: 0.7,
  engineOn: true,

  startEngine() {
    this.engineOn = true;
  },

  drive() {
    this.fuelLevel -= 0.1;
  },

  stopEngine() {
    this.engineOn = false;
  },

  refuel(percent) {
    if ((this.fuelLevel + (percent / 100)) <= 1) {
      this.fuelLevel += (percent / 100);
    } else {
      this.fuelLevel = 1;
    }
  },
};
```

You can now interact with both cars independently:

```js
raceCar1.drive();
raceCar2.drive();
```

However, there are several problems with this approach:

1. There's a lot of code duplication between the cars.
2. The game may need a dynamic number of cars with attributes that we can't determine before the game begins running.
3. Creating additional cars is tedious and error-prone.

The more significant issue is that it's hard to see what attributes characterize and differentiate `raceCar1` from `raceCar2`: what makes them similar and what makes them different and unique?

It's easy to see that we're creating objects of a particular **type** (i.e., a race car). This notion of types will come up repeatedly in this course. We'll often need objects of the same type in our applications. Since we don't want to use the copy and paste approach we used above, we need some other way to create objects. One way to automate object creation is to use **object factories**: functions that create and return objects of a particular type.

Our car objects are mostly similar, but they have three important distinctions: the values they hold for the `make`, `fuelLevel`, and `engineOn` properties. One way to clarify this in our code is to move the similarities to one location and provide the differences when we create new objects.

Consider the following interface:

```js
function createCar(make, fuelLevel, engineOn) {
  // To be implemented by you.
}

let raceCar1 = createCar('BMW', 0.5, false);
raceCar1.drive();

let raceCar2 = createCar('Ferrari', 0.7, true);
raceCar2.drive();
```

You can see that we've moved the creation of each object into a new function, `createCar`, and that we pass the `make`, `fuelLevel`, and `engineOn` values to that function. In this case, `createCar` handles the similarities, while each invocation specifies the differences with arguments.

In the above code, we show the skeleton of the `createCar` function. Try to implement `createCar` on your own, then use it to create a new race car with the following details:

```plaintext
Make: Jaguar
Fuel Level: 0.4
Engine Status: off
```

Show Solution

### Summary

Automated object creation is an important process. While it's easy to create a single object, copying and pasting the code to create a related object that is independent of the first is both tedious and error-prone. If you need to create hundreds or thousands of similar objects, you'll soon realize why automating object creation is a vital aspect of programming.

In Object Oriented Programming, we often need to create multiple objects of the same type. Object factory functions provide a straightforward abstraction for object creation. We'll see some more involved techniques later.

```js
function createCar(make, fuelLevel, engineOn) {
  return {
    make: make,
    fuelLevel: fuelLevel,
    engineOn: engineOn,

    startEngine() {
      this.engineOn = true;
    },

    drive() {
      this.fuelLevel -= 0.1;
    },

    stopEngine() {
      this.engineOn = false;
    },

    refuel(percent) {
      if ((this.fuelLevel + (percent / 100)) <= 1) {
        this.fuelLevel += (percent / 100);
      } else {
        this.fuelLevel = 1;
      }
    },
  };
}

let jaguar = createCar('Jaguar', 0.4, false);

let raceCar1 = createCar('BMW', 0.5, false);
raceCar1.drive();

let raceCar2 = createCar('Ferrari', 0.7, true);
raceCar2.drive();
```

