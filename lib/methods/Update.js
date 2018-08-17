import { AsyncStorage } from 'react-native'

export default function update (query, callback) {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(this.$reference, (err, store) => {
      store = !!store ? this.json(store) : []
      const { where, set } = query
      let paramsLength = Object.keys(where).length

      /*
      * Iterate elements in store
      */
      store.forEach(elemt => {
        let counter = 0
        // if all elements in where statement counter increments in one
        for (let key in elemt) if (elemt[key] === where[key]) counter++
        // if all the elements coincided, push this object (updated) in store
        if (counter === paramsLength) for (let key in set) elemt[key] = set[key]
      })

      AsyncStorage.setItem(this.$reference, this.string(store), () => {
        if (callback && typeof callback === 'function') callback(store)
        resolve(store)
      })
    })
  })
}
