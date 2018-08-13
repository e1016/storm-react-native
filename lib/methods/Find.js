import { AsyncStorage } from 'react-native'

export default function find (params, fields, callback) {
  return new Promise((resolve, reject) => {
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
      /*
      * Initialize stored object
      * if data in localStorage contains
      * data is parsed to JSON, else,
      * store is initialized as empty array
      */
      res = !!res ? this.json(res) : []
      /*
      * return nothing if does not
      * exist data in localStorage
      */
      if (res === null && callback) callback(undefined)
      // returns entire collection
      if (res !== null && !params && !fields) {
        if (callback && typeof callback === 'function') callback(res)
        resolve(res)
      }
      // returns a filtered part of collection
      else if (res !== null && (!!params || !!fields)) {
        let response = []
        // save number of conditions
        const keyConditionsLength = Object.keys(params).length
        // params is used for get a part of collection,
        if ( !!params ) {
          res.forEach(resItem => {
            let c = 0, tmp = {}
            for (let p in params) if (params[p] === resItem[p]) c++
            if (c === keyConditionsLength) response.push(resItem)
          })
        }
        // filter specific fields
        if ( !!fields ) {
          // convert fields in array of properties
          fields = fields.split(/ +/g)
          let tmpCollection = []
          res.forEach(resItem => {
            let tmpItem = {}
            /*
            * Iterate fields and asign values to new JSON
            * with values specifieds on fields
            */
            for (let f of fields) tmpItem[f] = resItem[f]
            tmpCollection.push(tmpItem)
          })
          /*
          * This asign correct (with only some fields)
          * collection to response
          */
          response = tmpCollection
        }

        if (callback) callback(response)
        resolve(response)
      }
    })
  })
}
