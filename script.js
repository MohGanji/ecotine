var blogs = {
    'dereksivers': () => fetchPostFullArchive('https://sive.rs/blog', 'li > a', 'https://sive.rs'),
    'timurban': () => fetchPostWithRandomUrl('https://waitbutwhy.com/random/'),
    'austinkleon': () => fetchPostWithPagination('https://austinkleon.com/page', '.entry-title-link', 100),
    'sethgodin': () => fetchPostWithPagination('https://seths.blog/page', 'div.post > h2 > a', 100),
    'lyndabarry': () => fetchPostWithRandomUrl('https://thenearsightedmonkey.tumblr.com/random'),
    'dereksiversbooks': () => fetchPostFullArchive('https://sive.rs/books', 'div > h2 > a', 'https://sive.rs'),
    'markmanson': () => fetchPostFullArchive('https://markmanson.net/archive', '.archive-table td > a', 'https://markmanson.net'),
    'ryanholiday': () => fetchPostFullArchive('https://ryanholiday.net/archive/', '#smart-archives-list li > a'),
    'stevenpressfield': () => fetchPostWithPagination('https://stevenpressfield.com/blog/page', 'h2 > a', 100),
    // 'annieduke': () => fetchPostWithPagination('https://www.annieduke.com/tag/article/page', 'a.elementor-post__read-more', 5), // Something goes wrong when proxy
    'neilstrauss': () => fetchPostWithPagination('https://www.neilstrauss.com/blog/page', 'a.more-link', 50),
    'timferris': () => fetchPostWithPagination('https://tim.blog/page', 'h3.entry-title > a', 100),
    'ericbarker': () => fetchPostWithPagination('https://bakadesuyo.com/blog/page', 'h4 > a', 7),
    'walkingtheworld': () => fetchPostFullArchive('https://walkingtheworld.substack.com/archive', 'a.post-preview-title'),
    'tannergreer': () => fetchPostFullArchive('https://scholars-stage.org/scholars-stage-read-more/', 'li > a'),
    'smtm': () => fetchPostFullArchive('https://slimemoldtimemold.com/archives/', 'li > a'),
    'paco': () => fetchPostFullArchive('https://thehellyeahgroup.com/archive', 'a.archive-item-link', 'https://thehellyeahgroup.com'),
}
var PROXY = 'http://141.95.19.7:8888/'

function select() {
    if(document.getElementById('go-btn').classList.contains('disabled')) 
        return
    _disableButton()
    
    const DEBUG_BLOG = null
    const blogKey = DEBUG_BLOG || _selectBlog()
    return gtag('event', 'bf_go_click', {
        'event_callback': createFunctionWithTimeout(() => {
            blogs[blogKey]()
        }, 500)
    });

    // utility functions for select:
    function _selectBlog () {
        const keys = Object.keys(blogs)
        const randomKey = keys[Math.floor(Math.random() * keys.length)]
        return randomKey
    }
}

function fetchPostWithPagination(blogUrl, selector, maxPage, prefixUrl = '') {
    const page = Math.floor(Math.random() * maxPage)
    const blogPageUrl = `${blogUrl}/${page}`
    fetchPostFullArchive(blogPageUrl, selector, prefixUrl)
}

function fetchPostWithRandomUrl(randomUrl) {
    _redirectTo(randomUrl)
}

function fetchPostFullArchive(blogUrl, selector, prefixUrl = '') {
    fetch(`${PROXY}${blogUrl}`, {
        method: 'GET'
    })
    .then(response => response.text())
    .then(data => {
        // create an html to parse the data.
        var el = document.createElement('html');
        el.innerHTML = data;

        const posts = el.querySelectorAll(selector)
        postSuffix = posts.item(randUpTo(posts.length)).getAttribute('href')
        
        url = prefixUrl + postSuffix
        _redirectTo(url)
    })
    .catch(error => _handleError(error, blogUrl));
}

function _redirectTo(url) {
    // console.log('url: ', url)
    window.location.href = url;
    setTimeout(() => {
        _enableButton()
    }, 1500)
    
}

function _disableButton() {
    document.getElementById('go-btn').classList.add('disabled')
    document.getElementById('btn-text').innerText = "Wait..."
}
function _enableButton() {
    document.getElementById('go-btn').classList.remove('disabled')
    document.getElementById('btn-text').innerText = "Take Me Somewhere"
}

function _handleError(error, name) {
    console.log(`${name}:error`, error)
    document.getElementById('go-btn').classList.remove('disabled')
    select(); // retry
}

function randUpTo(num) {
    return Math.floor(Math.random() * num)
}

///// ANALYTICS

function handleWebsiteClick() {
    return gtag('event', 'bf_website_click', {
        'event_callback': createFunctionWithTimeout(
            () => { window.location.href = 'http://m.ganji.blog';},
            500
        )
    });
}
function handleContactClick() {
    return gtag('event', 'bf_contact_click', {
        'event_callback': createFunctionWithTimeout(
            () => { window.location.href = 'mailto:mohganji97@gmail.com';},
            500
        )
    });
}

function createFunctionWithTimeout(callback, opt_timeout) {
    var called = false;
    function fn() {
      if (!called) {
        called = true;
        callback();
      }
    }
    setTimeout(fn, opt_timeout || 1000);
    return fn;
  }

///// FOR DEBUGGING
function debugcss() {
    var elements = document.body.getElementsByTagName('*');
    var items = [];
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].innerHTML.indexOf('* { background:#000!important;color:#0f0!important;outline:solid #f00 1px!important; background-color: rgba(255,0,0,.2) !important; }') != -1) {
            items.push(elements[i]);
        }
    }
    if (items.length > 0) {
        for (var i = 0; i < items.length; i++) {
            items[i].innerHTML = '';
        }
    } else {
        document.body.innerHTML +=
            '<style>* { background:#000!important;color:#0f0!important;outline:solid #f00 1px!important; background-color: rgba(255,0,0,.2) !important; }\
            * * { background-color: rgba(0,255,0,.2) !important; }\
            * * * { background-color: rgba(0,0,255,.2) !important; }\
            * * * * { background-color: rgba(255,0,255,.2) !important; }\
            * * * * * { background-color: rgba(0,255,255,.2) !important; }\
            * * * * * * { background-color: rgba(255,255,0,.2) !important; }\
            * * * * * * * { background-color: rgba(255,0,0,.2) !important; }\
            * * * * * * * * { background-color: rgba(0,255,0,.2) !important; }\
            * * * * * * * * * { background-color: rgba(0,0,255,.2) !important; }</style>';
    }
}

// debugcss()