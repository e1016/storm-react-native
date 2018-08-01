import { AsyncStorage } from 'react-native'

export default function save (json, callback) {
  AsyncStorage.getItem(this.$reference, (err, res) => {
    // Initialize stored object
    res = !!res ? this.string(res) : []
    res.push(json)
    AsyncStorage.setItem(this.$reference, this.json(res), () => {
      if (callback && typeof callback === 'function') callback(json, res)
      return
    })
  })
}
