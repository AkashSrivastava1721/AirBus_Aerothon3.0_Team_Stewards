const express = require('express');
const cors = require("cors");
const mongodb = require("mongodb");
const MongodbClient = mongodb.MongoClient;
const app = express();
app.use(cors());
app.use(express.json());
const Database = "DB";
const url = "mongodb+srv://dbWeight:1234567890@cluster0.hngzp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
app.post("/postempdata", async (req,res) =>
{
    try 
    {
        let connection = await MongodbClient.connect(url);
        let db = connection.db(Database);
        await db.collection("employeeDataBase").insertOne(req.body);
        connection.close();
        res.status(200).json({alert:"datastored"});
    } 
    catch (error) 
    {
        console.log(error);
        res.status(500).json(req.body);  
    }
});
app.get("/readempdata/:id", async (req,res) =>
{
    try
    {
        let connection = await MongodbClient.connect(url);
        let db = connection.db(Database);
        let collection = db.collection("employeeDataBase");
        collection.find({}).toArray((error, result) => 
        {
            if(error) 
            {
                return res.status(500).send(error);
            }
            let status =false;
            let message ="If you are a new joinee kindly get access for this app from administration!!";
            var email = req.params.id;
            console.log(email)
            for(var i=0;i<result.length;i++)
            {
                if(result[i].empMail === email)
                {
                    status = true;
                    message = result[i].empId;
                    break;
                }
            }
            var data = 
            {
                status: status,
                message: message
            }
            res.send(data);
        });
        connection.close();
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({alert:"error"});
    }
});
app.post("/posttextdata", async (req,res) =>
{
    try 
    {
        let connection = await MongodbClient.connect(url);
        let db = connection.db(Database);
        await db.collection("textData").insertOne(req.body);
        connection.close();
        res.status(200).json({alert:"data sent"});
    } 
    catch (error) 
    {
        console.log(error);
        res.status(500).json(req.body);  
    }
});
app.get("/readtextdata", async (req,res) =>
{
    try
    {
        let connection = await MongodbClient.connect(url);
        let db = connection.db(Database);
        let collection = db.collection("textData");
        collection.find({}).toArray((error, result) => 
        {
            if(error) 
            {
                return res.status(500).send(error);
            }
            res.send(result);
        });
        connection.close();
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({alert:"error"});
    }
});
app.get("/readtextdata/:id", async (req,res) =>
{
    try
    {
        let connection = await MongodbClient.connect(url);
        let db = connection.db(Database);
        let collection = db.collection("textData");
        collection.find({}).toArray((error, result) => 
        {
            if(error) 
            {
                return res.status(500).send(error);
            }
            let senddata =[];
            let dept = req.params.id;
            for(var i=0;i<result.length;i++)
            {
                if(result[i].dept === dept)
                    senddata.push(result[i]);
            }
            res.send(senddata);
        });
        connection.close();
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({alert:"error"});
    }
});
const port = process.env.PORT || 8080;
app.listen(port);
