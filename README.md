# Storm for React Native

### v1.0

[storm for web localStorage manager](https://github.com/e1016/storm)

## Install
`npm i storm-react-native`

storm provides a simple way to manage AsyncStorage, using
crud methods as `save`, `find`, `update`, and `erase`. Storm
use collections as a reference for save data, exa.

```js
import Collection from 'storm-react-native'

class App extends Component {
  constructor () {
    this.cats = new Collection('@Cats:data')
  }
}
```

`@Cats:data` is used for manage data, under the hood looks like this: `AsyncStorage.action('@Cats:data')`

---

## CRUD

#### Create

for create use **save** method.

```js

/**
* save
* @param data:     Object -> contains data for save
* @param callback: Function -> for request data
*/
const catInfo = {
  name: 'Pillow Paws',
  color: 'brown',
  age: 4
}

this.cats.save(catInfo, (collection, cat) => {
  console.log('all cats are avalible in', collection, 'and the last saved cat is', cat)
})
```

#### Read

for read info use **find** method.

```js
/**
* find
* @param params:   Object -> define for filter results (optional)
* @param fields:   String -> define the fields that are recovered (optional)
* @param callback: Function
*/

this.cats.find(
// search conditions
{
  name: 'Pillow Paws',
  age: 4
},
// fields
'color name',
// callback
data => {
  console.log('All data in collection is', data)
})
```

#### Update
use update method.

```js
/**
* update
* @param conditions: Object -> define for filter results
* @param callback:   Function
*/

this.cats.update({
  where: {
    color: 'brown',
    age: 4
  },
  set: {
    name: 'Snowball IV'
  }
}, data => {
  console.log('all data was updated to', data)
})
```

### Delete
for delete data use erase

```js
/**
* update
* @param conditions: Object -> define for filter erase data (optional)
* @param callback:   Function
*/

this.cats.erase({
  color: 'brown',
  age: 4
}, data => {
  console.log('all data was updated to', data)
})
```
