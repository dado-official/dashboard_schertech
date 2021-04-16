# Server API documentation


## Base URL
    /server

### Get a list of all servers that are stored on the database
`GET /`


### Add a new server to the database
`POST /`
#### Body parameters
- hostname:


### Get information about a specific server
`GET /:hostname`
#### Path parameters
- hostname:


### Update information about the server
`PUT /:hostname`
#### Path parameters
- hostname:
#### Body parameters
- TODO


### Delete a server from the database
`DELETE /:hostname`
#### Path parameters
- hostname: