# [Home](../README.md)
# Custom entries API documentation

# Base URL
    /api/custom



# Entries

## Get a list of all the entries that are stored on the database
`GET /`



## Add a new entry to the database
`POST /`
#### Body parameters
Parameter | Description
--- | ---
title | The title of the entry.
description | The description of the entry.
frequency | How often you enter new values (d=daily, w=weekly, m=monthly, y=yearly). 
target_value | The value you want to reach.



## Update information about the entry
`PUT /:id`
#### Path parameters
Parameter | Description
--- | ---
id | The id of the entry

#### Body parameters (Use at least one of them)
Parameter | Description
--- | ---
title | The new title of the entry.
description | The new description of the entry.
frequency | How often you enter new values (d=daily, w=weekly, m=monthly, y=yearly).
target_value | The new value you want to reach.



## Delete an entry and all of its values from the database
`DELETE /:id`
#### Path parameters
Parameter | Description
--- | ---
id | The id of the entry



# Values

## Get a list of all values from an entry
`GET /:entry_id`  
#### Path parameters
Parameter | Description
--- | ---
entry_id | The id of the entry



## Get a specific value from an entry
`GET /:entry_id/:value_id`
#### Path parameters
Parameter | Description
--- | ---
entry_id | The id of the entry
value_id | The id of the value



## Add a new value to an entry
`POST /:entry_id`  
#### Path parameters
Parameter | Description
--- | ---
entry_id | The id of the entry

#### Body parameters
Parameter | Description
--- | ---
value | The value you want to store



## Update a specific value from an entry
`PUT /:entry_id/:value_id`
#### Path parameters
Parameter | Description
--- | ---
entry_id | The id of the entry
value_id | The id of the value

#### Body parameters
Parameter | Description
--- | ---
value | The new value you want to store



## Delete a specific value from an entry
`DELETE /:entry_id/:value_id`
#### Path parameters
Parameter | Description
--- | ---
entry_id | The id of the entry
value_id | The id of the value