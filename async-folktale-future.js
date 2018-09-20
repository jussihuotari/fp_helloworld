const R = require('ramda')
const trace = msg => R.tap(x => console.log(msg, x))
const { task } = require('folktale/concurrency/task');

// Exercise inspired by https://mostly-adequate.gitbooks.io/mostly-adequate-guide/ch10.html#

// https://folktale.origamitower.com/api/v2.3.0/en/folktale.concurrency.task.html

const localStorage = {  
  player1: { id:1, name: 'Albert' },
  player2: { id:2, name: 'Theresa' }
}
// getFromCache :: String -> Task User
const getFromCache = (x) => task(resolver => resolver.resolve(localStorage[x]))
// game :: User -> User -> String
const game = R.curry((p1, p2) => `${p1.name} vs ${p2.name}`)

// See also https://github.com/origamitower/folktale/issues/200#issuecomment-404221224

const getBoth = getFromCache('player1').and(getFromCache('player2')).run().future()
getBoth.map(val => {
  str = R.apply(game, val)
  console.log(str)
})
