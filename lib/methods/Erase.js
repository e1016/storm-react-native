import { AsyncStorage } from 'react-native'

export default function erase (params, callback) {
  return new Promise((resolve, reject) => {
    /**
    * Reasign arguments
    * - - - - - - - - - - - - - - -
    * for use function with callback
    * as a first or second argument
    */
    if (typeof params === 'function') callback = params, params = false
    if (!params) {
      AsyncStorage.getItem(this.$reference, (err, store) => {
        store = !!store ? this.json(store) : []
        AsyncStorage.removeItem(this.$reference, () => {
          if (callback && typeof callback === 'function') {
            callback({ keeped: [], erased: [] })
          }
          resolve({ keeped: [], erased: store })
        })
      })
    } else {
      let keeped = []
      let erased = []
      let paramsLength = Object.keys(params).length

      AsyncStorage.getItem(this.$reference, (err, res) => {
        res = !!res ? this.json(res) : []
        res.forEach(elemt => {
          let counter = 0
          for (let key in elemt) if (elemt[key] === params[key]) counter++
          if (!(counter === paramsLength)) keeped.push(elemt)
          else erased.push(elemt)
        })
        AsyncStorage.setItem (
          this.$reference,
          this.string(keeped),
          () => {
            if (callback && typeof callback === 'function') {
              callback(keeped, erased)
            }
            resolve({ keeped, erased })
          }
        )
      })
    }
  })
}

/*
* Pending to comments
*/
