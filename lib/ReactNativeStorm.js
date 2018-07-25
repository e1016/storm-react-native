import { AsyncStorage } from 'react-native'

export default class StormCollection {
  constructor(str) {
    this.collection = str
  }

  json (json) {
    return JSON.stringify(json)
  }

  string (string) {
    return JSON.parse(string)
  }

  save (json, callback) {
    AsyncStorage.getItem(this.collection, (err, res) => {
      // Initialize stored object
      res = !!res ? this.string(res) : []
      res.push(json)
      AsyncStorage.setItem(this.collection, this.json(res), () => {
        if (callback && typeof callback === 'function') callback(json, res)
        return
      })
    })
  }

  find (params, fields, callback) {
    /**
    * Reasign arguments
    * - - - - - - - - - - - - - - -
    * for use function with callback
    * as a first or second argument
    */

    if (typeof params === 'function') callback = params, params = false
    if (typeof fields === 'function') callback = fields, fields = false
    if (typeof params === 'string') fields = params, params = false

    AsyncStorage.getItem(this.collection, (err, res) => {
      // Initialize stored object
      res = !!res ? this.string(res) : []

      if (res === null) callback(undefined)
      if (res !== null && !params && !fields) {
        if (callback && typeof callback === 'function') callback(res)
      }

      else {
        let response = []
        if (params) {

          for (let o in object) {
            if (object.hasOwnProperty(o)) {

            }
          }
        }
      }
    })
  }

  erase (params, callback) {

    if (typeof params === 'function') callback = params, params = false

    if (!params) {
      AsyncStorage.removeItem(this.collection, () => {
        if (callback && typeof callback === 'function') callback()
      })
    } else {
      let temporalReference = []
      let paramsLength = Object.keys(params).length

      AsyncStorage.getItem(this.collection, (err, res) => {
        res = !!res ? this.string(res) : []
        res.forEach(elemt => {
          let counter = 0
          for (let key in elemt) if (elemt[key] === params[key]) counter++
          if (!(counter === paramsLength)) temporalReference.push(elemt)
        })
        AsyncStorage.setItem (
          this.collection,
          this.json(temporalReference),
          () => {
            if (callback && typeof callback === 'function') callback(temporalReference)
          }
        )
      })
    }
  }

  update (query, callback) {
    AsyncStorage.getItem(this.collection, (err, res) => {
      res = !!res ? this.string(res) : []
      const { where, set } = query
      let paramsLength = Object.keys(where).length

      res.forEach(elemt => {
        let counter = 0

        for (let key in elemt) if (elemt[key] === where[key]) counter++
        if (!(counter === paramsLength)) for (let key in set) elemt[key] = set[key]

      })
      AsyncStorage.setItem (
        this.collection,
        this.string(res),
        () => {
          if (callback && typeof callback === 'function') callback(res)
        }
      )
    })
  }
}
