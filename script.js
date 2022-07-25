const blogs = {
    'dereksivers': 'https://sive.rs',
    'timurban': 'https://waitbutwhy.com',
    'austinkleon': 'https://austinkleon.com',
    'sethgodin': 'https://seths.blog',
}
const PROXY = 'http://141.95.19.7:8888/'

function select() {
    if(document.getElementById('btn').classList.contains('disabled')) 
        return
    _disableButton()
    
    const blogKey = _selectBlog()
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
            .catch(error => _handleError(error, 'dereksivers'));
        
        } else if(blogKey === 'timurban') {
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
            .catch(error => _handleError(error, 'austinkleon'));
        
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
            .catch(error => _handleError(error, 'sethgodin'));
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
        // console.log(`${name}:error`, error)
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