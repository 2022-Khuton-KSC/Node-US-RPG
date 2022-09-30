const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const contractAlias = "0x64a422ef41c076a204bf2f43e94bdd1465b9442c";
const Authorization = "Basic S0FTS0JSUFlFVkdJTUZQNkpDNFU3VkhGOmJFWFNnRTdjMnZZYjdZRDBwLXZoR01idXFhZkQza0luVW5qR2s4VGc=";

app.get('/checkNFT', function(req, res) {

    const institution = req.body.institution;
    const tokenID = req.body.tokenID;
    console.log(req.body);

    const options = {
        method: "GET",
        url: "https://kip17-api.klaytnapi.com/v2/contract/" + contractAlias + "/token/" + tokenID,
        headers: {
            "Content-Type": "application/json",
            "x-chain-id": "1001",
            "Authorization": Authorization,
        },
    };
      
    request(options, function(error, response, body) {
        if (error) throw new Error(error);

        console.log(JSON.parse(body));
        if (body.indexOf("token not found") == -1) {
            res.send({
                valid: true,
                message: "This NFT is exist.",
            });
        }
        else {
            res.send({
                valid: false,
                message: "There isn't Such NFT.",
            });
        }
    });
})
app.listen(3000, () => console.log('3000번 포트 대기'));
