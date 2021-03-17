import * as $ from 'jquery'
function createAnalitics() : object
{
    let counter = 0
    let destroyed :boolean = false
    const listener = (): number => counter ++
    $(document).on('click', listener)

    return {
        getClicks() :number
        {
            return counter
        },
        destroy(){
            $(document).off('click', listener)
            destroyed  = true
        },


    }

}
window['analytics'] = createAnalitics
