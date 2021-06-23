const strings = require('./Contexts/_Strings.json')

for (const language in strings) {
  console.log(language, Object.keys(strings[language]).length)
}

Object.keys(strings.en).forEach(key => {
  const exist = Object.keys(strings.tr).includes(key)
  if (!exist) {
    console.log(key, strings.fa[key])
  }
})