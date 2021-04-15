# Custom entries API documentation

### Base URL
    /custom


## Entries

### Get a list of all the entries that are stored on the database
`GET /`


### Add a new entry to the database
`POST /`
#### Body parameters
- title:
- description:
- frequency: 
- target_value:


### Update information about the entry
`PUT /:id`
#### Path parameters
- id:
#### Body parameters
- title:
- description:
- frequency:
- target_value:


### Delete an entry and all of its values from the database
`DELETE /:id`
#### Path parameters
- id:


## Values

### Get a list of all values from an entry
`GET /:entry_id`  
#### Path parameters
- entry_id:


### Get a specific value from an entry
`GET /:entry_id/:value_id`
#### Path parameters
- entry_id:
- value_id:


### Add a new value to an entry
`POST /:entry_id`  
#### Path parameters
- entry_id:
#### Body parameters
- value:

### Update a specific value from an entry
`PUT /:entry_id/:value_id`
#### Path parameters
- entry_id:
- value_id:
#### Body parameters
- value:


### Delete a specific value from an entry
`DELETE /:entry_id/:value_id`
#### Path parameters
- entry_id:
- value_id: