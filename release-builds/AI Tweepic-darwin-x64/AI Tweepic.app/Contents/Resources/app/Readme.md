# AI-TWEEPIC

<p align="center"><a href="https://github.com/armag-pro/ai-tweepic" target="_blank" rel="noopener noreferrer"><img width="100" src="https://github.com/armag-pro/ai-tweepic/blob/master/assets/logo.png" alt="AI-Tweepic logo"></a></p>


<p align="center">
<a href="https://github.com/armag-pro/ai-tweepic/">
    <img src="https://img.shields.io/badge/version-1.1-blue.svg" alt="version 1.1">
</a>
<a href="https://github.com/armag-pro/ai-tweepic/pulls">
    <img src="https://img.shields.io/badge/PRs-Welome-brightgreen.svg" alt="PRs Welcome">
</a>
<a href="https://github.com/armag-pro/ai-tweepic">
    <img src="https://img.shields.io/apm/l/vim-mode.svg" alt="License MIT">
</a>
<a href="https://github.com/armag-pro/ai-tweepic">
    <img src="https://img.shields.io/github/size/armag-pro/ai-tweepic/index.js.svg" alt="Github file size">
</a>
</p>

<p align="center">
<a href="https://github.com/ellerbrock/open-source-badge/">
    <img src="https://badges.frapsoft.com/os/v1/open-source.svg?v=103" alt="Open Source Love">
</a>
</p>

<p align="center">
<a href="https://twitter.com/intent/tweet?screen_name=mynameistsp">
    <img src="https://img.shields.io/twitter/url/http/shields.io.svg?style=social" alt="Twitter Tweet">
</a>

<a href="https://twitter.com/mynameistsp">
    <img src="https://img.shields.io/twitter/follow/mynameistsp.svg?style=social&label=Follow" alt="Twitter Follow">
</a>
</p>


> The AI tweet generator based on images for the creatively lazy folks.


AI-Tweepic is a native desktop app (available for Windows, Mac & Linux) that generates tweets (Twitter status updates) based on a given input image. The app does not use any text generator for pictures (currently developed by only few premium AI agents).

    NOTE: 
    * Almost all opertaional errors encountered till now are due to slow fetching of tweets in bulk. If you are having some trouble, just try after some time and you won't be disappointed.
    * The results obtained are very graphic and uses strong language as I ended up training it on raw twitter data. If you are offended by violence or slangs then please step back.
    * The output is definitely not very impressive at this stage. In fact the model hardly generates meaningful words let alone sentences. But with more compute power or longer training or more impressive algorithms much more meaningful results can be obtained. Check [Ryan Kiros'](https://github.com/ryankiros) magnificient [work](https://github.com/ryankiros/neural-storyteller) for a demo. (This work is not it's fork in anyway)

## Get Started

    * Download build for your respective OS from release-builds/ (No need to clone whole repo.)
    * Double-click & run!
    * Upload an image
    * Hit upload
    * Voila!

## HowTo's & Scope for Improvement:
* The LSTM model is pretrained on my GPU-less local machine for about an hour. The results can be drastically improved by training on free cloud engines. [FloydHub](https://www.floydhub.com/) is the easiest to get started.

* The transfer learning for new tweets is done by my [Flask app](https://tweepic.herokuapp.com/) deployed on [Heroku](https://www.heroku.com/). The compute power provided by a free heroku account is pretty low to obtain decent results quickly. Hence the results don't seem very "customized". Some limitations include: 

    - The compute power of heroku [dynos](https://devcenter.heroku.com/articles/dyno-types) varies according to a lot of factors as Heroku runs on top of [AWS](https://aws.amazon.com/ec2/).
    - Dynos sleep after some time of inactivity.
    - Requests time out easily. Can't train for long.


## Credits & Sources:
* The LSTM model was pretrained with a corpus of tweets downloaded 
from [this webpage](http://thinknook.com/twitter-sentiment-analysis-training-corpus-dataset-2012-09-22/). It contains a csv file for training of sentiment analysis of tweets.

* A very "quick and dirty" implementation of LSTM was inspired from [this blog](https://chunml.github.io/ChunML.github.io/project/Creating-Text-Generator-Using-Recurrent-Neural-Network/) by Trung Tran. It uses the Keras builtin LSTM model.

## License
[MIT](http://opensource.org/licenses/MIT)

Certain resources(icons, images, etc) require attribution.


Copyright (c) 2018-present, [armag-pro](https://armag-pro.github.io/)
