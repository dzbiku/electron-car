const remote = require('electron').remote
const url = require('url')
const path = require('path')

//home
btn_one.addEventListener('click',function(event)
{
    var main =remote.getCurrentWindow();    
    var pathToVideo = path.join('file://',__dirname,'index.html')
    main.loadURL(pathToVideo)   
})
// Video recorder
btn_two.addEventListener('click',function(event)
{
    var main =remote.getCurrentWindow();
    var pathToVideo = path.join('file://',__dirname,'video.html')
    main.loadURL(pathToVideo)   
})
// Media
btn_four.addEventListener('click',function(event)
{
    var main =remote.getCurrentWindow();
    var pathToVideo = path.join('file://',__dirname,'media.html')
    main.loadURL(pathToVideo)   
})
// Media
btn_five.addEventListener('click',function(event)
{
    var main =remote.getCurrentWindow();
    var pathToVideo = path.join('file://',__dirname,'car.html')
    main.loadURL(pathToVideo)   
})
