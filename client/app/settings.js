'use strict'
import ElectronSettings from 'electron-settings'
import remote from 'remote'

const app = remote.app

module.exports = new ElectronSettings()
