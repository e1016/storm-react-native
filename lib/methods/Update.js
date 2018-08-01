import { AsyncStorage } from 'react-native'

export default function update (query, callback) {
  AsyncStorage.getItem(this.$reference, (err, res) => {
    res = !!res ? this.string(res) : []
    const { where, set } = query
    let paramsLength = Object.keys(where).length

    res.forEach(elemt => {
      let counter = 0

      for (let key in elemt) if (elemt[key] === where[key]) counter++
      if (!(counter === paramsLength)) for (let key in set) elemt[key] = set[key]

    })
    AsyncStorage.setItem (
      this.$reference,
      this.string(res),
      () => {
        if (callback && typeof callback === 'function') callback(res)
      }
    )
  })
}
