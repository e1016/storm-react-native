import { AsyncStorage } from 'react-native'

export default function erase (params, callback) {

    if (typeof params === 'function') callback = params, params = false

    if (!params) {
      AsyncStorage.removeItem(this.$reference, () => {
        if (callback && typeof callback === 'function') callback()
      })
    } else {
      let temporalReference = []
      let paramsLength = Object.keys(params).length

      AsyncStorage.getItem(this.$reference, (err, res) => {
        res = !!res ? this.string(res) : []
        res.forEach(elemt => {
          let counter = 0
          for (let key in elemt) if (elemt[key] === params[key]) counter++
          if (!(counter === paramsLength)) temporalReference.push(elemt)
        })
        AsyncStorage.setItem (
          this.$reference,
          this.json(temporalReference),
          () => {
            if (callback && typeof callback === 'function') callback(temporalReference)
          }
        )
      })
    }
  }
