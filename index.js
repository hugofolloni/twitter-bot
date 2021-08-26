const Twit = require("twit");
const axios = require('axios');
const cheerio = require('cheerio');


require("dotenv").config();

const theBot = new Twit({

    consumer_key: process.env.CONSUMER_KEY,

    consumer_secret: process.env.CONSUMER_SECRET,

    access_token: process.env.ACCESS_TOKEN,

    access_token_secret: process.env.ACCESS_SECRET,

    timeout_ms: 60 * 1000

});

var i = 1;

function tweetProgress(){

    const getReadMe = async () => {
        if(i < 10){
            stringDate = "00" + i;
        }
        else if (i > 10){
            stringDate = "0" + i;
        }
        try {
            const { data } = await axios.get(
                `https://github.com/hugofolloni/100DaysOfCodeChallenge/tree/main/${stringDate}/forTwitter`
            );
            const $ = cheerio.load(data);
    
            $('.markdown-body.entry-content.container-lg').each((_idx, el) => {
                const newReadMe = $(el).text()
                var postTweet = `Olá, mundo! A atualização de hoje é:\n\n${newReadMe}\n\nAcesse o github na bio para mais.`;
                theBot.post(
            
                    'statuses/update',
                    {status: postTweet},
                    function(err, data, response){
                        if (err){
                            console.log("ERRO: " + err);
                            return false;
                        }
            
                        console.log("Tweet postado com sucesso!\n");
                    }
                )
            });
    
        } catch (error) {
            throw error;
        }
    
    };

    getReadMe();

    i++;
}

tweetProgress();

