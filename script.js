const blogs = {
    'dereksivers': 'https://sive.rs',
    'timurban': 'https://waitbutwhy.com',
    'austinkleon': 'https://austinkleon.com',
    'sethgodin': 'https://seths.blog',
    'lyndabarry': 'https://thenearsightedmonkey.tumblr.com',
    'dereksiversbooks': 'https://sive.rs/books',
    'markmanson': 'https://markmanson.net',
    'ryanholiday': 'https://ryanholiday.net',
    'stevenpressfield': 'https://stevenpressfield.com',
    // 'annieduke': 'https://www.annieduke.com/', something goes wrong when Proxy.
    'neilstrauss': 'https://www.neilstrauss.com',
    'timferris': 'https://tim.blog',
    'ericbarker': 'https://bakadesuyo.com',

}
const PROXY = 'http://141.95.19.7:8888/'

function select() {
    if(document.getElementById('btn').classList.contains('disabled')) 
        return
    _disableButton()
    
    const DEBUG_BLOG = null
    const blogKey = DEBUG_BLOG || _selectBlog()
    _selectPostFromBlog(blogKey)

    // utility functions for select:
    function _selectBlog () {
        let keys = Object.keys(blogs)
        let randomKey = keys[Math.floor(Math.random() * keys.length)]
        return randomKey
    }
    
    function _selectPostFromBlog(blogKey) {
        let url = 'http://m.ganji.blog'
        
        if(blogKey === 'dereksivers') {
            fetch(`${PROXY}https://sive.rs/blog`, {
                method: 'GET'
            })
            .then(response => response.text())
            .then(data => {
                // create an html to parse the data.
                var el = document.createElement('html');
                el.innerHTML = data;

                const posts = el.querySelectorAll('li > a')
                postSuffix = posts.item(randUpTo(posts.length)).getAttribute('href')
                
                url = blogs.dereksivers + postSuffix
                _redirectTo(url)
            })
            .catch(error => _handleError(error, blogKey));
        
        }  else if(blogKey === 'timurban') {
            url = 'https://waitbutwhy.com/random/'
            _redirectTo(url)

        } else if(blogKey === 'austinkleon') {
            const page = Math.floor(Math.random() * 100)

            fetch(`${PROXY}https://austinkleon.com/page/${page}`, {
                "body": null,
                "method": "GET"
            })
            .then(response => response.text())
            .then(data => {
                // create an html to parse the data.
                var el = document.createElement('html');
                el.innerHTML = data;
                const posts = el.querySelectorAll('.entry-title-link')
                url = posts.item(randUpTo(posts.length)).getAttribute('href')
                _redirectTo(url)
            })
            .catch(error => _handleError(error, blogKey));
        
        } else if (blogKey === 'sethgodin') {
            const page = Math.floor(Math.random() * 100)
              
            fetch(`${PROXY}https://seths.blog/page/${page}`, {
                method: 'POST',
                redirect: 'follow',
            })
            .then(response => response.text())
            .then(data => {
                // create an html to parse the data.
                var el = document.createElement('html');
                el.innerHTML = data;
                
                const posts = el.querySelectorAll('div.post > h2 > a')
                url = posts.item(randUpTo(posts.length)).getAttribute('href')
                _redirectTo(url)

            })
            .catch(error => _handleError(error, blogKey));
        } else if(blogKey === 'lyndabarry') {
            url = 'https://thenearsightedmonkey.tumblr.com/random'
            _redirectTo(url)
        } else if(blogKey === 'dereksiversbooks') {
            fetch(`${PROXY}https://sive.rs/books`, {
                method: 'GET'
            })
            .then(response => response.text())
            .then(data => {
                // create an html to parse the data.
                var el = document.createElement('html');
                el.innerHTML = data;

                const posts = el.querySelectorAll('div > h2 > a')
                postSuffix = posts.item(randUpTo(posts.length)).getAttribute('href')
                
                url = blogs.dereksivers + postSuffix
                _redirectTo(url)
            })
            .catch(error => _handleError(error, blogKey));
        } else if(blogKey === 'markmanson') {
            fetch(`${PROXY}https://markmanson.net/archive`, {
                method: 'GET'
            })
            .then(response => response.text())
            .then(data => {
                // create an html to parse the data.
                var el = document.createElement('html');
                el.innerHTML = data;

                const posts = el.querySelectorAll('.archive-table td > a')
                postSuffix = posts.item(randUpTo(posts.length)).getAttribute('href')
                
                url = blogs.markmanson + postSuffix
                _redirectTo(url)
            })
            .catch(error => _handleError(error, blogKey));
        } else if(blogKey === 'ryanholiday') {
            fetch(`${PROXY}https://ryanholiday.net/archive/`, {
                method: 'GET'
            })
            .then(response => response.text())
            .then(data => {
                // create an html to parse the data.
                var el = document.createElement('html');
                el.innerHTML = data;

                const posts = el.querySelectorAll('#smart-archives-list li > a')
                const postUrl = posts.item(randUpTo(posts.length)).getAttribute('href')
                
                _redirectTo(postUrl)
            })
            .catch(error => _handleError(error, blogKey));
        } else if(blogKey === 'stevenpressfield') {
            const page = Math.floor(Math.random() * 100)

            fetch(`${PROXY}https://stevenpressfield.com/blog/page/${page}`, {
                "body": null,
                "method": "GET"
            })
            .then(response => response.text())
            .then(data => {
                // create an html to parse the data.
                var el = document.createElement('html');
                el.innerHTML = data;
                const posts = el.querySelectorAll('h2 > a')
                url = posts.item(randUpTo(posts.length)).getAttribute('href')
                _redirectTo(url)
            })
            .catch(error => _handleError(error, blogKey));
        
        } else if(blogKey === 'annieduke') {
            const page = Math.floor(Math.random() * 5)
            fetch(`${PROXY}https://www.annieduke.com/tag/article/page/${page}`, {
                "body": null,
                "method": "GET"
            })
            .then(response => response.text())
            .then(data => {
                // create an html to parse the data.
                var el = document.createElement('html');
                el.innerHTML = data;
                const posts = el.querySelectorAll('a.elementor-post__read-more')
                url = posts.item(randUpTo(posts.length)).getAttribute('href')
                _redirectTo(url)
            })
            .catch(error => _handleError(error, blogKey));
        
        } else if(blogKey === 'neilstrauss') {
            const page = Math.floor(Math.random() * 50)
            fetch(`${PROXY}https://www.neilstrauss.com/blog/page/${page}`, {
                "body": null,
                "method": "GET"
            })
            .then(response => response.text())
            .then(data => {
                // create an html to parse the data.
                var el = document.createElement('html');
                el.innerHTML = data;
                const posts = el.querySelectorAll('a.more-link')
                url = posts.item(randUpTo(posts.length)).getAttribute('href')
                _redirectTo(url)
            })
            .catch(error => _handleError(error, blogKey));
        
        } else if(blogKey === 'timferris') {
            const page = Math.floor(Math.random() * 100)
            fetch(`${PROXY}https://tim.blog/page/${page}`, {
                "body": null,
                "method": "GET"
            })
            .then(response => response.text())
            .then(data => {
                // create an html to parse the data.
                var el = document.createElement('html');
                el.innerHTML = data;
                const posts = el.querySelectorAll('h3.entry-title > a')
                url = posts.item(randUpTo(posts.length)).getAttribute('href')
                _redirectTo(url)
            })
            .catch(error => _handleError(error, blogKey));
        
        } else if(blogKey === 'ericbarker') {
            const page = Math.floor(Math.random() * 7)
            fetch(`${PROXY}https://bakadesuyo.com/blog/page/${page}`, {
                "body": null,
                "method": "GET"
            })
            .then(response => response.text())
            .then(data => {
                // create an html to parse the data.
                var el = document.createElement('html');
                el.innerHTML = data;
                const posts = el.querySelectorAll('h4 > a')
                url = posts.item(randUpTo(posts.length)).getAttribute('href')
                _redirectTo(url)
            })
            .catch(error => _handleError(error, blogKey));
        
        } 
        return
    }

    function _redirectTo(url) {
        // console.log('url: ', url)
        window.location.href = url;
        setTimeout(() => {
            _enableButton()
        }, 1500)
        
    }

    function _disableButton() {
        document.getElementById('btn').classList.add('disabled')
        document.getElementById('btn-text').innerText = "Wait..."
    }
    function _enableButton() {
        document.getElementById('btn').classList.remove('disabled')
        document.getElementById('btn-text').innerText = "Take Me Somewhere"
    }

    function _handleError(error, name) {
        console.log(`${name}:error`, error)
        document.getElementById('btn').classList.remove('disabled')
        select(); // retry
    }
}

function randUpTo(num) {
    return Math.floor(Math.random() * num)
}

function debugcss() {
    console.log('shit ps')
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