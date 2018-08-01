import { AsyncStorage } from 'react-native'

export default function find (params, fields, callback) {
  /**
  * Reasign arguments
  * - - - - - - - - - - - - - - -
  * for use function with callback
  * as a first or second argument
  */

  if (typeof params === 'function') callback = params, params = false
  if (typeof fields === 'function') callback = fields, fields = false
  if (typeof params === 'string') fields = params, params = false

  AsyncStorage.getItem(this.$reference, (err, res) => {
    // Initialize stored object
    res = !!res ? this.string(res) : []

    if (res === null) callback(undefined)
    if (res !== null && !params && !fields) {
      if (callback && typeof callback === 'function') callback(res)
    }

    else if (res !== null && (!!params || !!fields)) {
      let response = []

      if (params) {
        res.forEach(r => {
          let tmp = {}
          for (let p in params) tmp[p] = r[p]
          response.push(tmp)
        })
      }

      callback(response)
    }
  })
}
