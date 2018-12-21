# RESTAPI
My own REST API framework.

First Install the module
```shell
$ npm install rest-api-module 
```

then simply use it.

## Usage
```javascript
const {Server,Router} = require("rest-api-module");

server.port = 3000;

Router.get("/home",(response,request,headerParams,bodyParamas)=>{
    res.write("Hello World");
})

server.runServer();
```


## Options

In the Router you can use:
GET POST DELETE PUT.

AT the callback you dont have to do much you already have the Body Paramaters and the Head paramaters
example:
Lets say we have POST Request:
localhost:3000/test/43?param1=1&param2=2
and in the Body Paramaters we have:
accessToken=blabla 
```javascript

Router.post("/test/:id",(response,request,headerParams,bodyParamas)=>{
    res.write(JSON.stringfy(headerParamas));
    res.write(JSON.stringfy(bodyParamas));
})

```
And in the response we will have:

```json
    {
        "params":{"id":"43"},
        "headerParams":{"param1":"1","param2":"2"}
    }
    {
        "bodyParams":{"accessToken":"blabla"}
    }
```

That way you save time in getting all the parameters were sent.

## Middlewares

All you have to do is to add middlewears as many as you want and just use 
them if you want

# example:

```javascript
 const {Server,Router} = require("rest-api-module");

Server.port = 3000;
//first you add the name of the middleware then you use the callBack function
Server.add("name",(response,request,headerParams,bodyParamas)=>{
    if(headerParams.paramas.name == "I am Cool"){
        return true;
    }
    return false;
});
// Assign the middlware
Router.get("/home",(response,request,headerParams,bodyParamas)=>{
    res.write("Hello World");
},['name']);

Server.runServer();
```

if the middlware passed it will continue else it will throw error that it not passed and tell you in which
middlware


Good Luck and Enjoy.