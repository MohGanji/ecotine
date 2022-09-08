var blogs = {
    'dereksivers': () => fetchPostWithRandomUrl('https://sive.rs/random'),
    'timurban': () => fetchPostWithRandomUrl('https://waitbutwhy.com/random/'),
    'austinkleon': () => fetchPostWithPagination('https://austinkleon.com/page', '.entry-title-link', 100),
    'sethgodin': () => fetchPostWithPagination('https://seths.blog/page', 'div.post > h2 > a', 100),
    'lyndabarry': () => fetchPostWithRandomUrl('https://thenearsightedmonkey.tumblr.com/random'),
    'markmanson': () => fetchPostFullArchive('https://markmanson.net/archive', '.archive-table td > a', 'https://markmanson.net'),
    'ryanholiday': () => fetchPostFullArchive('https://ryanholiday.net/archive/', '#smart-archives-list li > a'),
    'stevenpressfield': () => fetchPostWithPagination('https://stevenpressfield.com/blog/page', 'h2 > a', 100),
    // 'annieduke': () => fetchPostWithPagination('https://www.annieduke.com/tag/article/page', 'a.elementor-post__read-more', 5), // Something goes wrong when proxy
    'neilstrauss': () => fetchPostWithPagination('https://www.neilstrauss.com/blog/page', 'a.more-link', 50),
    'timferris': () => fetchPostWithPagination('https://tim.blog/page', 'h3.entry-title > a', 100),
    'ericbarker': () => fetchPostWithPagination('https://bakadesuyo.com/blog/page', 'h4 > a', 7),
    // 'walkingtheworld': () => fetchPostFullArchive('https://walkingtheworld.substack.com/archive', 'a.post-preview-title'), // has paid posts
    'tannergreer': () => fetchPostFullArchive('https://scholars-stage.org/scholars-stage-read-more/', 'li > a'),
    'smtm': () => fetchPostFullArchive('https://slimemoldtimemold.com/archives/', 'li > a'),
    'paco': () => fetchPostFullArchive('https://thehellyeahgroup.com/archive', 'a.archive-item-link', 'https://thehellyeahgroup.com'),
    'mrmoneymustache': () => fetchPostWithRandomUrl('https://www.mrmoneymustache.com/?random&post_type=post&post_status=publish'),
    'lawrenceweschler': () => fetchPostFullArchive('https://lawrenceweschler.com/library/archive', 'p > a'),
    'onstartups': () => fetchPostWithPagination('https://www.onstartups.com/page', 'a.post__link', 50),
    'dharmesh': () => fetchPostWithPagination('https://blog.hubspot.com/marketing/author/dharmesh-shah/page', 'h3.blog-card__content-title > a', 6),
    'unsettle': () => fetchPostWithPagination('https://www.unsettle.org/page', 'div.col-inner > a', 19),
    'nofreakingspeaking': () => fetchPostWithPagination('https://nofreakingspeaking.com/blog/page', 'h4 > a', 9),
    // 'paulsmith': () => fetchPostWithPagination('https://leadwithastory.com/blog/page', 'h3.entry-title > a', 12),
    'jnforensics': () => fetchPostWithPagination('https://www.jnforensics.com/blog-1/page', 'div.blog-post-homepage-link-hashtag-hover-color > a', 3),
    'pragmaticengineer': () => fetchPostWithPagination('https://blog.pragmaticengineer.com/page', 'article a', 2, 'https://blog.pragmaticengineer.com'),
    'doyouevenblog': () => fetchPostWithPagination('https://doyouevenblog.com/blog/page', 'a.elementor-post__thumbnail__link', 39),
    'budgetsaresexy': () => fetchPostWithPagination('https://budgetsaresexy.com/page', 'h2 > a', 300),
    // 'neildegrasstyson': () => fetchPostFullArchive('https://www.haydenplanetarium.org/tyson/essays/index.php', 'li > a', 'https://www.haydenplanetarium.org/tyson/essays'), // 403 error, probably .php is different.
    'copyblogger': () => fetchPostWithPagination('https://copyblogger.com/page', 'a.entry-title-link', 240),
    // 'exphistory': () => fetchPostFullArchive('https://experimentalhistory.substack.com/archive', 'TODO: write function for substack API'),
    // 'brianchesky': () => fetchPostFullArchive('https://medium.com/@bchesky', 'TODO: write function for medium API'),
    // 'thefreelancewrtierguide': () => fetchPostFullArchive('https://www.thefreelancewritersguide.com/blog?offset=1606280400632', 'TODO: find a solution for offset(graphQL like) pagination'),
}
var PROXY = 'http://141.95.19.7:8888/'

function select(retry = false) {
    if(document.getElementById('go-btn').classList.contains('disabled')) 
        return
    _disableButton()
    
    const DEBUG_BLOG = null
    const blogKey = DEBUG_BLOG || _selectBlog()
    return gtag('event', 'bf_go_click', {
        'event_callback': createFunctionWithTimeout(() => {
            if(!retry) addReadCount(blogKey)
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
    select(true); // retry
}

function randUpTo(num) {
    return Math.floor(Math.random() * num) + 1
}


///// STATS
var C_BLOGS_KEY = 'BF__BLOGS'
var C_READ_CNT_KEY =  'BF__READ_CNT'

function addReadCount(blogName, postUrl) {
    // increase read count
    let readCntStr = localStorage.getItem(C_READ_CNT_KEY) || '0'
    localStorage.setItem(C_READ_CNT_KEY, `${+readCntStr + 1}`)
    
    // add blog to discovered blogs if not there.
    let blogsStr = localStorage.getItem(C_BLOGS_KEY) || '[]'
    let blogs = new Set(JSON.parse(blogsStr))
    blogs.add(blogName)
    localStorage.setItem(C_BLOGS_KEY, JSON.stringify(Array.from(blogs)))
    // refreshStats()
}

function refreshStats() { 
    // Posts read
    let readCntStr = localStorage.getItem(C_READ_CNT_KEY) || '0'
    document.getElementById('posts-read-cnt').innerText = readCntStr
    let postsReadUrl = generateTwitterShareUrl(`I landed on ${readCntStr} blog posts with blogfrog.xyz so far.\nStart hopping!\n\n`, ['blogfrog'])
    console.log(postsReadUrl)
    document.getElementById('twitter-posts-read').setAttribute('href', postsReadUrl) 
    
    // Blogs discovered
    let blogsStr = localStorage.getItem(C_BLOGS_KEY) || '[]'
    let blogsCnt = JSON.parse(blogsStr).length
    document.getElementById('blogs-discovered-cnt').innerText = blogsCnt
    let blogsDiscoveredUrl = generateTwitterShareUrl(`I discovered ${blogsCnt} new blogs using blogfrog.xyz.\nStart hopping!\n\n`, ['blogfrog'])
    document.getElementById('twitter-blogs-discovered').setAttribute('href', blogsDiscoveredUrl) 
    
}
// Run this once after page load.
document.onload = refreshStats()

function generateTwitterShareUrl(text, hashtags) {
    const BASE_URL = "https://twitter.com/intent/tweet"
    const encodedText = encodeURIComponent(text)
    const hashtagsStr = hashtags.join(',')
    return `${BASE_URL}?text=${encodedText}&hashtags=${hashtagsStr}`
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