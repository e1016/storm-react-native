# Storm for React Native

###### Storage Object-Relational Mapping for React Native v1.0.0

this library provides a light but powerful way to handle AsyncStorage data, in a simple CRUD.

### Instalation

`npm install storm-react-native`

### Implementation

storm follows a collections philosophy, in this case we can create data groups using `Collection` method.

```js
import Collection from 'storm-react-native'

constructor () {
  this.cats = new Collection('@name:nameReference')
}
```
`nameReference` will be used for save and get data from AsyncStorage, it's advisable to use descriptive names, it can be the same as `cats` variable.

in case 2 variables use the same collection, like this.

```js
this.cats = new Collection('@data:cats')
this.coolestCats = new Collection('@data:cats')
```

both variables (`cats`, `coolestCats`) will have an impact on the same data.

---

### CRUD

#### Create

for save data (assuming we use the cats collection) you just need to run the save method of `cats` and pass a JSON argument with "the cat information", like this.

```js
this.cats.save({
   name: 'Sparky',
   age: 4,
   color: 'brown'
})
```
for each execution of this method, a new object is saved, then, let's keep 2 more cats.
```js
this.cats.save({
   name: 'Pillow paws',
   age: 6,
   color: 'white'
})

this.cats.save({
   name: 'Destroyer',
   age: 6,
   color: 'brown'
})
```
---
#### Read

at the time of reading we have 3 options:

1. get the entire collection.
2. get a part of the collection.
3. get specific nodes from a part of the collection.

## [1]
we can invoke the `find` method without parameters, on a collection, like this.

```js
this.cats.find()

// returns entire in a JSON
[{
   name: 'Sparky',
   age: 4,
   color: 'brown'
},{
   name: 'Pillow paws',
   age: 6,
   color: 'white'
},{
   name: 'Destroyer',
   age: 6,
   color: 'brown'
}]
```

## [2]
we can invoke the `find` method passing an object as a parameter, this object contains the conditions that `the cat` (in this case) must fulfill, like this.

```js
this.cats.find({
   color: 'brown'
})

// returns only cats that are brown
[{
   name: 'Sparky',
   age: 4,
   color: 'brown'
},{
   name: 'Destroyer',
   age: 6,
   color: 'brown'
}]
```
we can use more than 1 condition.
```js
// find ( conditions )
this.cats.find({
   color: 'brown',
   age: 4
})

// returns
[{
   name: 'Sparky',
   age: 4,
   color: 'brown'
}]
```

## [3]
if we pass as a last parameter a string defining which fields we want to recover, then we will only obtain those fields, like this.

```js
// find ( conditions, fields )

this.cats.find({
   color: 'brown'
}, 'name age') // <- separated by spaces

// returns
[{
   name: 'Sparky',
   age: 4
},{
   name: 'Destroyer',
   age: 6
}]
```

---
#### Update

the update method recive 1 parameter, a JSON with 2 main nodes `where` and `set`.

```js
this.cats.update({
   where: {
      // conditions
   },
   set: {
      // updates
   }
})
```
For example, if we want all brown cats to be 8 years old, we write the following.

```js
cats.update({
   where: {
      color: 'brown'
   },
   set: {
      age: 8
   }
})
```
there may be more than one condition and more than one data to update.
```js
cats.update({
   where: {
      color: 'brown',
      age: 8
   },
   set: {
      name: 'Kitties',
      newField: 'this cat was affected'
   }
})

cats.find()

// now returns
[{ // cat 1
   name: 'Kitties',
   age: 8,
   color: 'brown',
   newField: 'this cats was affected'
},{ // cat 2
   name: 'Pillow paws',
   age: 6,
   color: 'white'
},{ // cat 3
   name: 'Kitties',
   age: 8,
   color: 'brown',
   newField: 'this cat was affected'
}]
```
---
#### Delete

```js
cats.erase() // <- delete all from collection
```

You pass to parameters

```js
cats.erase({
  name: 'Kitties'
}) // <- erase all from collection where name is Kitties
```
