import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 4000;

let blogholder= [];
let id=0;
// Set EJS as the templating engine
app.set('view engine', 'ejs');

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req,res)=>{
    
    res.render("index.ejs");
        
})

app.get("/blog", (req,res)=>{
    res.render("blogform.ejs");
})

app.post("/submit", (req,res)=>{

    let name = req.body["fname"];
    let title =  req.body["title"];
    let bloginput =  req.body["bloginput"];
    let blogtopic =  req.body["topic"];

    let blogger={
        id: id,
        name: name,
        title: title,
        bloginput: bloginput,
        blogtopic: blogtopic
    };

    //replaces blog using ID
    let replaceId = req.body.replaceId;
    if (replaceId != (-1)){
        for (let n=0; n < blogholder.length; n++){
            if (replaceId == blogholder[n].id){

                blogholder.splice(n,1);
            }
        }
    }

    blogholder.sort((a,b)=> a.id - b.id);
    
    blogholder.push(blogger);
    //console.log(blogholder);
    res.render("index.ejs", 
    {blogarray: blogholder, arraylength: blogholder.length });
    console.log(blogholder);
    id++;
})

app.post("/edit", (req,res) => {
    let editId = req.body.editIt;
    let countIndex= 0;
    //find index
    //console.log("Edit ID is " + editId);

    for (let p=0; p < blogholder.length; p++){

        if (blogholder[p].id == editId){
            //console.log(blogholder[p].id);
            countIndex = p;
            //console.log("Index is " + countIndex);
        }
    }
    res.render("blogform.ejs", {blogarray2: blogholder[countIndex].name, blogarray3: blogholder[countIndex].title, blogarray4: blogholder[countIndex].bloginput,
        blogarray5: blogholder[countIndex].id, blogarray6: blogholder[countIndex].blogtopic });
})

app.post("/delete", (req,res) => {
    let deleteId = req.body.deleteIt;
    let countIndex= 0;
    
    for (let p=0; p < blogholder.length; p++){

        if (blogholder[p].id == deleteId){
            countIndex = p;
            blogholder.splice(p,1);
            //console.log("Index is " + countIndex);
        }
    }

    res.render("index.ejs", {blogarray: blogholder, arraylength: blogholder.length });

})

app.listen(port, (error)=>{
    if (error){throw error}
    console.log(`Port ${port} is running!`);
})