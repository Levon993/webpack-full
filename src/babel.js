async function start()
{
   const res = await Promise.resolve('async is working')
    console.log(res)
}

start()
class test {
    static id = Date.now()
}
import('lodash').then(l=>{
    console.log('Lodash', l.random(0,42, true))
})
