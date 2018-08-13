import { AsyncStorage } from 'react-native'

const tokenId = () => String(new Date() - new Date(0))

export default function save (item, callback) {
  return new Promise((resolve, reject) => {
    // Creating new register ID
    item._id = tokenId()
    AsyncStorage.getItem(this.$reference, (err, store) => {
      /*
      * Initialize stored object
      * if data in localStorage contains
      * data is parsed to JSON, else,
      * store is initialized as empty array
      */
      store = !!store ? this.json(store) : []
      /*
      * pushing new element together
      * with old data
      */
      store.push(item)
      AsyncStorage.setItem(this.$reference, this.string(store), () => {
        // if callback is defiend, run it
        if (callback && typeof callback === 'function') {
          callback(item, store)
        }
        resolve({ item, store })
      })
    })
  })
}
