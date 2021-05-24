// ==UserScript==
// @name         Startpage.com - Hide Ads
// @namespace    https://phatbl.at/
// @version      1.0.1
// @description  Hides the ads section above results.
// @author       Ben Chatelain
// @updateURL    https://greasyfork.org/en/scripts/425678-startpage-com-hide-ads
// @source       https://github.com/phatblat/Startpage-HideAds
// @match        https://*.startpage.com/*/search*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict'

    // Watches the DOM and removes the div containing the ads iframe.
    // It is added asynchronously via the following two lines:
    //
    //<link rel="preload" href="/sp/adsense/search/async-ads.js" as="script">
    //<script async="" src="/sp/adsense/search/async-ads.js" onerror="csadead=1"></script>

    new MutationObserver(function(mutations) {
        // Array of MutationRecord
        // https://developer.mozilla.org/en-US/docs/Web/API/MutationRecord
        mutations.forEach( (mutation) => {
             if (mutation.type == 'childList') {
                 // One or more children have been added to and/or removed from the tree.
                 mutation.addedNodes.forEach( (node) => {
                     // 1 = ELEMENT_NODE
                     if (node.nodeType == 1) {
                         if (node.nodeName == 'DIV') {
                             if (node.id == 'gcsa-top') {
                                 node.remove()
                                 this.disconnect() // disconnect the observ
                             }
                         }
                     }
                 })
             }
        })

    }).observe(document, {childList: true, subtree: true})
    // the above observes added/removed nodes on all descendants recursively

})();
