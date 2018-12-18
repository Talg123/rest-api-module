module.exports = {
     /**
     * return true if any route of the routes are the same, and have the same method
     * @param route - the first route
     * @param url - the routes
     */
    findRoute:(route,url)=>{
        //first check if the route methods are the same
        if(route.method == url.method){
            //split the route url and the current route sent
            let routeUrl = route.url.url.split("/");
            let routeUrl2 = url.newUrl.url.split("/");
            //check if the route are the same if they are the same return true
            //else return false and go to the next route
            if(routeUrl.length == routeUrl2.length){
                for(let i = 1; i<routeUrl.length;i++){
                    if(routeUrl[i] == routeUrl2[i]){
                        if(i == routeUrl.length-1){
                            return true;
                        }
                    }else if(routeUrl[i][0] == ":" && routeUrl2[i][0] == ":"){
                        if(i == routeUrl.length-1){
                            return true;
                        }
                    }else{
                        return false
                    }
                }
            }
        }
        return false;
    },

    /**
     * finding the right route to serve to the user
     * @param route - the route from the routes list
     * @param currentRoute - the current route we served
     */
    findRouteToServe:(route,currentRoute) =>{
        //first check if the route and the url methods are the same
        if(route.method == currentRoute.method){
            //split the route and the url
            let route1 = route.url.url.split("?")[0].split("/");
            let route2 = currentRoute.url.split("?")[0].split("/");
            //check routes are the same
            if(route1.length == route2.length){
                for(let i = 1; i<route1.length;i++){
                    if(route1[i] == route2[i] || route1[i][0] == ":"){
                        if(i == route1.length - 1){
                            return true;
                        }
                    }else{
                        return false;
                    }
                }
            }
        }else{
            return false;
        }
    },

    /**
     * return all the paramaters from the current route
     */
    getParamas:(route,currentRoute) => {
        let params = {};
        let headerParams = {};

        let route1 = route.url.url.split("/");
        let route2 = currentRoute.url.split("?");
        
        let firstParamas = route2[0].split("/");
        
        for(let i = 1; i<route1.length;i++){
            if(route1[i][0] == ":"){
                let param = route1[i].slice(1);
                params[param] = firstParamas[i];
            }
        }
        let param;
        if(route2.length > 1){
            let secoundParamas = route2[1].split("&");
        
            secoundParamas.forEach(val=>{
                param = val.split("=");
                headerParams[param[0]] = param[1];
            })
        }
        if(param){
            return {params,headerParams};
        }
        return headerParams;
        
    },


    /**
     * return the body parameters that were sent
     */
    getBodyParams:async (req) =>{
        let bodyParams="";
        let parsedParamas={};
        await req.on("data",data=>{
            bodyParams+=data.toString();
        });
        if(bodyParams != ""){
            let arr = bodyParams.split("&");
            arr.forEach(val=>{
                let param = val.split("=");
                parsedParamas[param[0]] = param[1];
            })
        }


        return parsedParamas;
    },

    /**
     * @param arr - the middlewards to check
     * @param middlewards - the middlewares
     */
    checkAllMiddlewares:(arr,middlewares,response,request,params,bodyParamas)=>{
        let resault = true;
        for(let i=0;i<arr.length;i++){
            let res = middlewares[arr[i]](response,request,params,bodyParamas);
            if(!res){
                resault = {error:true,message:"Fall at "+arr[i]+" middleware"}
                break;
            }
        }
        if(resault && !resault.error){
            resault = {error:false,message:""}
        }
        return resault;
    }
}