const R = require('ramda')
const trace = msg => R.tap(x => console.log(msg, x))

// Exercise inspired by https://mostly-adequate.gitbooks.io/mostly-adequate-guide/ch10.html#

const localStorage = {  
  player1: { id:1, name: 'Albert' },
  player2: { id:2, name: 'Theresa' }
}
// Get players from cache
const getFromCache = x => Promise.resolve(localStorage[x])
// game :: User -> User -> String
const game = R.curry((p1, p2) => `${p1.name} vs ${p2.name}`)

getFromCache('player2').then(p => console.log(R.prop('name', p)))

const getBoth = Promise.all([
  getFromCache('player1'),
  getFromCache('player2')
])
getBoth.then(p => {
  const str = R.apply(game, p)
  console.log(str)
})
