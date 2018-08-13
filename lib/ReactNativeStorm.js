import { AsyncStorage } from 'react-native'

import Save from './methods/Save'
import Find from './methods/Find'
import Update from './methods/Update'
import Erase from './methods/Erase'

import {
  json,
  string
} from './src/JsonParser'

export default class StormCollection {
  constructor(ref) {
    /*
    * Getting for text reference
    */
    this.$reference = ref
    /*
    * JSON parsers
    */
    this.json = json
    this.string = string
    /*
    * Binding methods
    */
    this.save = Save.bind(this)
    this.find = Find.bind(this)
    this.update = Update.bind(this)
    this.erase = Erase.bind(this)
  }
}
