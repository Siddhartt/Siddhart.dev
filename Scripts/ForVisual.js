document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        console.log(document.getElementById('ztc'))
        console.log(document.getElementById('zti'))
        document.getElementById('ztc').style.cssText  = 'z-index:-10000; position:absolute; left:100000px'
        document.getElementById('zti').style.cssText  = 'z-index:-10000; position:absolute; left:100000px'
    }, 3000);
})
