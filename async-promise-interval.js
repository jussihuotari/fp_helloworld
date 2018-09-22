// Create a promise loop that gets called every n millisecs.

const delayedTask = n => Promise.resolve(`${n/1000} seconds timer passed.`)

const promiseInterval = n => new Promise((resolve, reject) => {
  setInterval(_ => delayedTask(n).then(val => console.log(val)), n)
})

promiseInterval(1500).then(val => console.log('Promise resolved')) // never resolved
