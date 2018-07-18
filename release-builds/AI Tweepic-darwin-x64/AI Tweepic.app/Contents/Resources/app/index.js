process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true;

const Clarifai = require('clarifai');
const MAX_KEYS = 5 // Tweets are fetched very slowly hence only using few keywords from the picture

/* const {remote} = require('electron')
console = remote.getGlobal('console') */

const capp = new Clarifai.App({
    apiKey: 'e938b2e017654e16b4a43db424444d89'
});


let input = document.querySelector('input')
let content = document.querySelector('.main-content')

input.addEventListener('change', () => {
    if(input.files.length == 0) {
        // TODO: popup message or something
        console.log('No file found')
    } else {
        console.log('Image picked.')
       let file = input.files[0] 
       let image = document.createElement('img')
       let btn = document.createElement('div')
       btn.innerText =  'Upload'
       btn.className = 'btn'
       btn.id = "submit"
       image.src = window.URL.createObjectURL(file)
        image.file = file
        image.className = 'img'
        content.innerHTML = ''
        content.appendChild(image)
        content.appendChild(btn)
        let upload = document.getElementById('submit')
        upload.addEventListener('click', () => {
            upload.style.display = 'none'
            // encode to base64
            let reader = new FileReader()
            reader.onloadend = function () {
                console.log('Uploading image to Clarifai...')
                start_loading_animation()
                capp.models.predict(Clarifai.GENERAL_MODEL, { base64: reader.result.split(',')[1]}).then(
                    function (response) {
                        if(response["status"]["code"] === 10000) {
                            console.log("Success fetching keywords!")
                            let kwords = response["outputs"][0]["data"]["concepts"]
                            let payload = []
                            for(let i = 0; i < Math.min(MAX_KEYS, kwords.length); i++) {
                                payload = payload.concat(kwords[i]["name"])
                            }
                            console.log('Keywords:', payload)
                            let xhttp = new XMLHttpRequest()
                            xhttp.onreadystatechange = function() {
                                if(this.readyState == 4 && this.status == 200) {
                                    let tweets = JSON.parse(this.responseText)
                                    console.log(tweets)
                                    if(tweets[0] == '-1') {
                                        console.log('TOO FEW TWEETS FETCHED FROM TWITTER')
                                        display_error('TOO_FEW_TWEETS')
                                    } else {
                                        display_tweets(tweets)
                                    }
                                } else if(/* this.status == 0 &&  */this.readyState == 1) {
                                    console.log('Fetching Tweets from Twitter...')
                                } else if(this.status = 200 && this.readyState == 2) {
                                } else if (this.status = 200 && this.readyState == 3) {
                                } else if(this.stausText != 'OK'){
                                    console.log('Error: (status=' + this.staus + ' ' + this.statusText + ')')
                                    display_error('UNKNOWN_ERROR')
                                    console.log('Please try after some time')
                                } else {
                                    console.log('Update:', this.status, this.statusText, this.readyState)
                                }
                            }
                            const base_url = ['http://localhost:5000', 'https://tweepic.herokuapp.com']
                            xhttp.open("POST", base_url[1] + '/keywords', true)
                            xhttp.setRequestHeader("Content-Type", "application/json") 
                            xhttp.send(JSON.stringify(payload))
                        } else {
                            display_error('CLARIFAI_UNREACHABLE')
                            console.log('Error uploading file to Clarifai. ', response["status"])
                        }
                    },
                    function (err) {
                        console.log(error)
                    }
                );
            }
            reader.readAsDataURL(file)

        })
    }
})

function display_error(error) {
    let show_text = 'Unknown error occured. Please try after some time or use a different image.'
    if(error == 'TOO_FEW_TWEETS') {
        show_text = 'Twitter rate limit exceeded for fetching tweets. \
        The number of tweets fetched was too few to train the model. \
        Try after some time if problem persists try with some other image.'
    } else if (error == 'UNKNOWN_ERROR') {
        show_text = `Probable reasons:
                        Twitter rate exceeded. Try after 15 minutes.\
                        Can\'t reach Heroku server.`
    } else if (error == 'CLARIFAI_UNREACHABLE') {
        show_text = 'Keywords for your picture could not be obtained. Probably dev account is deactivated.'
    }
    stop_loading_animation();
    content.innerHTML = '<h3>Oops, there was an error...</h3>' +
        '<div id="list">' +
            '<ul>' +
                '<li><a>' + show_text + '</a></li>' +
            '</ul>' +
        '</div'
 
}

function display_tweets(tweets) {
    stop_loading_animation()
    const len = tweets.length
    t1 = tweets[len-1]
    t2 = tweets[len-2]
    content.innerHTML = '<h3> Here are your AI generated tweets...</h3>' +
        '<div id="list">' + 
            '<ul>' +
                '<li><a>' + t1 + '</a></li>' +
                '<li><a>' + t2 + '</a></li>' +
            '</ul>' +
        '</div'
}

let timer = []

function start_loading_animation() {
    content.innerHTML = generate_text('Setting things up in ...', 'MOTION')
    timer.push(setTimeout(() => {
        content.innerHTML = generate_text('Gathering tweets from the ...', 'COSMOS')
    }, 30000))
    timer.push(setTimeout(() => {
        content.innerHTML = generate_text('Assembling your ...', 'HOTBOX')
    }, 60000))
    timer.push(setTimeout(() => {
        content.innerHTML = '<div class="center-content fill"> <h3>It\'s taking longer than usual.</h3></div>'
    }, 100000))
    timer.push(setTimeout(() => {
        content.innerHTML = '<div class="center-content fill"> <h3>Thank you for your patience we are still trying...</h3></div>'
    }, 150000))
    timer.push(setTimeout(() => {
        content.innerHTML = '<div class="center-content fill"> <h3>You might want to try again in a while. We will keep trying though...</h3></div>'
    }, 300000))
    timer.push(setTimeout(() => {
        content.innerHTML = generate_text('...', ' O  O ')
    }, 600000))
}

function stop_loading_animation() {
    for(let i = 0; i < timer.length; i++) {
        clearTimeout(timer[i])
    }
}


function generate_text(heading, word) {
    return '<div class="center-content fill"> \
                                    <h3>' + heading + '</h3> \
                                    <div class="center-content"> \
                                        <h1> \
                                            <em>' + word[0] + '</em> \
                                            <em class="planet left">O</em> \
                                            <em>' + word[2] + '</em> \
                                            <em>'  + word[3] + '</em> \
                                            <em class="planet right">O</em> \
                                            <em>' + word[5] + '</em> \
                                        </h1> \
                                    </div> \
                                </div>'

}






