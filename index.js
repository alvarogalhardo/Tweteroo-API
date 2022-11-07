import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

const users = [];
const tweets = [];


app.post("/sign-up", (req,res)=>{
    const newUser = req.body;
    users.push(newUser);
    res.send("OK")
});

app.post("/tweets", (req,res)=>{
    const {username,tweet} = req.body;
    const {avatar} = users.find(user => user.username === username )
    const newTweet = {
        username: username,
        avatar: avatar,
        tweet: tweet
    };
    tweets.push(newTweet);
    res.send("OK")
});

app.get("/tweets", (req,res)=>{
    if(tweets.length>10){
        const lastTweets = tweets.slice(-10);
        res.send(lastTweets)
        return;
    }
    res.send(tweets);
})

app.listen(5000, ()=>console.log("On"));