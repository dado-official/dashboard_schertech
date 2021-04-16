# Server API documentation

# Base URL
    /api/server



## Get a list of all servers that are stored on the database
`GET /`



## Add a new server to the database
`POST /`
#### Body parameters
Parameter | Description
--- | --- 
hostname | The hostname or IP of the server



## Get information about a specific server
`GET /:hostname`
#### Path parameters
Parameter | Description
--- | ---
hostname | The hostname or IP of the server



## Update information about the server
`PUT /:hostname`
#### Path parameters
Parameter | Description
--- | ---
hostname | The hostname of IP of the server

#### Body parameters
Parameter | Description
--- | ---
TODO | 



## Delete a server from the database
`DELETE /:hostname`
#### Path parameters
Parameter | Description
--- | ---
hostname | The hostname or IP of the server