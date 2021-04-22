# [Home](../README.md)
# Server API documentation

# Base URL
    /api/server



## Get a list of all servers that are stored on the database
`GET /`  
#### Response
````
Array: [
    {
        hostname
        server_name
        db_port
        db_username
        db_password
        location
        description
    }
]
````



## Add a new server to the database
`POST /`
#### Body parameters
Parameter | Description
--- | --- 
hostname | The hostname or IP of the server
server_name (optional) | The descriptive name of the server
db_port (optional) | The port of the database
db_username | The DB username
db_password (optional) | The password of the DB user
location (optional) | The location of the server
description (optional) | The description of the Server


## Check if mysql is online on a specific server
`GET /:hostname`
#### Path parameters
Parameter | Description
--- | ---
hostname | The hostname or IP of the server

#### Response
````
{
    reachable: boolean
}
````


## Update information about the server
`PUT /:hostname`
#### Path parameters
Parameter | Description
--- | ---
hostname | The hostname of IP of the server

#### Body parameters
Parameter | Description
--- | ---
new_hostname | The new hostname of IP of the server
db_port | The new port of the database
db_username | The new DB username
db_password | The new password of the DB user
description | The new description of the Server



## Delete a server from the database
`DELETE /:hostname`
#### Path parameters
Parameter | Description
--- | ---
hostname | The hostname or IP of the server