const express=require("express");
const app=express();
const got = require('got');
const cheerio = require("cheerio");
const cors = require("cors");
const path = require("path");

app.use(
    cors({
      origin:  ["http://localhost:3000", "http://localhost:5000"]
    })
);

// app.use(express.json());
app.use(express.static(path.join(__dirname, "client/build")));
/////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/myacc",async (req,res)=>{
    console.log("requested");
    try {
        const response = await got('https://auth.geeksforgeeks.org/user/29ravikant2017/practice/');
		// console.log(response.body);
		//=> '<!doctype html> ...'
        const $ = cheerio.load(response.body);
        const litags = $('a');
        console.log(litags);
        const links = [];
        litags.each((i,el)=>{
            let str=''+$(el).attr('href')
            links.push(str);
        }) 
        
        const test="https://practice.geeksforgeeks.org/problems";
        const questions = []; 
        links.find(ele=>{
            if(ele.search(test) !== -1){
                questions.push(ele);
            }
        });
        console.log(questions);
        // console.log(links);
        // console.log(litags);
        res.send({questions});
        
        console.log("succesfully gathered");
        
	} catch (error) {
        console.log(error.response);
		//=> 'Internal server error ...'
	}
    console.log("request ended");
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get("/*",(req,res)=>{
    res.sendFile(path.join(__dirname,"client/build/index.html"));
});




const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});