const keys = [
  'apiKey', 'authDomain', 'databaseURL', 'projectId', 'storageBucket',
  'messagingSenderId', 'appId'
]

const config = {}
for (let key of keys) {
  config[key] = process.env['VUE_APP_FIREBASE_' + key]
}
export default config
