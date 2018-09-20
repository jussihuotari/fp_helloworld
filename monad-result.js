const R = require('ramda')
const Result = require('folktale/result');
// https://gist.github.com/jaysoo/7b1298bcc98ef9ac71e6dd0383a07dc3#gistcomment-1768971
const trace = msg => R.tap(x => console.log(msg, x))

const users = [
  { name: 'Alison', age: 30, book: 'The Restless Wave' },
  { name: 'Bertie', age: 40, book: 'Playing Piano for Dummies' },
  { name: 'X', age: 50, book: 'Sapiens' },
  { noname: 'Yzzi', age: 60, book: 'Kitchen Confidential' }
]

// A user's name must be >3 chars long
const username = R.propOr('', 'name') // propOr('', 'name')
const namelen = R.compose(R.length, username)
const validateName = user => {
  return namelen(user) > 3 ? Result.Ok(user) : Result.Error('Name length must be > 3')
}
// console.log(users.map(validateName))

const validateUser = R.curry((validator, user) => validator(user).map(_ => user))
console.log(users.map(validateUser(validateName)))

// Greet the valid users
const greet = R.concat('Hello ')
const greetUser = R.compose(greet, username)
const greetValidUser = R.compose(R.map(greetUser), validateName)
// console.log(users.map(greetValidUser))
console.log(R.map(greetValidUser, users))

// How about filtering invalid entries
const greetWithFilter = R.compose(
  trace(''),
  R.map(greetUser),
  R.map(_ => _.merge()),
  trace('filtered'),
  R.filter(_ => _.getOrElse(false)),
  R.map(validateName),
  trace('before')
)
greetWithFilter(users)
