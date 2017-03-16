'use strict';

const Twit = require('twit');
const config = require('./config');
const chalk = require('chalk');

const connectColor = chalk.cyan.bold;
const eventColor = chalk.magenta.bold;
const successColor = chalk.green.bold;
const errorColor = chalk.red.bold;

const Twitter = new Twit({
  consumer_key: config.twitter.CONSUMER_KEY,
  consumer_secret: config.twitter.CONSUMER_SECRET,
  access_token: config.twitter.ACCESS_TOKEN,
  access_token_secret: config.twitter.ACCESS_TOKEN_SECRET
});

function tweet(name) {
  let content = {
    status: `@${name} Thanks for following! #yeswecode #flyeaglesfly`
  }
  Twitter.post('statuses/update', content, (err, data, response) => {
    if(err) {
      console.log(errorColor('Error:'), err.message);
    } else {
      console.log(successColor('Success'));
    }
  });
}

function followed(event) {
  console.log(eventColor('Follow event is running'));
  let screenName = event.source.screen_name;
  tweet(screenName);
}

const stream = Twitter.stream('user');

stream.on('connect', (req) => {
  console.log(connectColor('Stream is up and running'));
});

stream.on('follow', followed);