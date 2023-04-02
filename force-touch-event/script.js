setTimeout(() => {

    /*     document.querySelector('#document').style.height = '1500px';
        document.querySelector('#document').style.top = '300px';
    
        console.log('document.documentElement.clientHeight', document.documentElement.clientHeight); 
        console.log('screen.availHeight', screen.availHeight);
        console.log('screen.height', screen.height); 
        console.log('window.outerHeight', window.outerHeight);
        console.log('window.innerHeight', window.innerHeight); */
    const screenHeight = window.screen.height;
    const browserHeight = window.outerHeight;
    const addressBarHeight = browserHeight - window.innerHeight;
    const addressBarHeightInPx = screenHeight - browserHeight + addressBarHeight;
    console.log('Current address bar height:', addressBarHeightInPx, 'px');


    const isFullScreen = window.outerHeight === window.screen.height;
    const addressBarHeightInPx2 = isFullScreen ? 0 : window.screen.height - window.outerHeight;

    console.log('Current address bar height2:', addressBarHeightInPx2, 'px');
}, 2000);



document.documentElement.addEventListener('touchstart', function () {
    console.log('document.documentElement.clientHeight', document.documentElement.clientHeight);
    console.log('screen.availHeight', screen.availHeight);
    console.log('screen.height', screen.height);
    console.log('window.outerHeight', window.outerHeight);
    console.log('window.innerHeight', window.innerHeight);
})


refreshPage();
function refreshPage() {
    const refreshCount = localStorage.getItem('refreshCount') || 0;
    if (refreshCount < 2) {
        localStorage.setItem('refreshCount', parseInt(refreshCount) + 1);
        location.reload();
    } else {
        console.log('Maximum refresh count reached');
    }
}