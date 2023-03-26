function makeItemTransparent() {
    var items = document.querySelectorAll('.grid-item');
    var opaqueItems = document.querySelectorAll('.grid-item:not([style*="opacity: 0"])');
    if (opaqueItems.length > 0) {
        var randomItemIndex = Math.floor(Math.random() * opaqueItems.length);
        var randomItem = opaqueItems[randomItemIndex];
        randomItem.style.opacity = '0';
        setTimeout(makeItemTransparent, 2000 / items.length);
    }
}

makeItemTransparent();