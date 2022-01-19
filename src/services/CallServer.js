const handleErrors = (response) => {
    if (!response.ok) {
        throw Error(response.status);
    }
    return response;
 }
  
 export class CallServer {
  
    /**
    * @param {*} input
    * @param {*} callback: callback function when server-side returns ok
    * @param {*} errorHandler: callback function to handle error when server-side returns with error
    * @param {*} url: url of the server side end point
    * @param {*} method: takes the values of "get" or "post"
    */ 
    getResultWithCallback = (input = null, callback = null, errorHandler = null, url = "http://localhost:3000/mydata.json", method = "get") => {
  
        let request = null;
        // create the get request object
        if (!method || method === 'get') {
            request = new Request(url, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            });
        }
        // create the post request object
        else {
            request = new Request(url, {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify(input)
            });
        }
        // fetch the result from the server
        let statusCode = 200;
        fetch(request)
        .then(handleErrors)
        .then(res => res.json()) //convert response body into a JSON object
        .then(res =>
            {
                let data = res; //JSON.stringify( res );
                console.log(data);
                if (callback) {
                    callback(statusCode, data); //call the callback function with the JSON object as input
            }
            })
        .catch((error) => {
            console.log("error from server: "+JSON.stringify(error.message));
            if (errorHandler)
                //error.message may not be a number, ie, not thrown from handleErrors in cases, eg, server timed out
                //errorHandler(parseInt(error.message));
                errorHandler(error.message);
        });
    };
 }
  
 export const server = new CallServer();