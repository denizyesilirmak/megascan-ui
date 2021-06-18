const strings = require('./Contexts/_Strings.json')

for (const language in strings) {
  console.log(language, Object.keys(strings[language]).length)
}