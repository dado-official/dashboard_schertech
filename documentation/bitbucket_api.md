# [Home](../README.md)
# Bitbucket API documentation

This API doesn't affect the real repository. I only affects the list on the local database, 
which is used to know what repositories to monitor.

# Base URL
    /api/bitbucket/repositories



# Repositories

## Get a list of all repositories stored on the database
`GET /`

#### Response
````
TODO: not finished
````



## Add a new repository to the database
`POST /`
#### Body parameters
Parameter | Description
--- | ---
workspace | The name of the workspace
repo_slug | The name of the repository slug (name)



## Update information about the repository
`PUT /:workspace/:repo_slug`
#### Path parameters
Parameter | Description
--- | ---
workspace | The name of the workspace
repo_slug | The name of the repository slug (name)

#### Body parameters
Parameter | Description
--- | ---
new_workspace | The new name of the workspace
new_repo_slug | The new name of the repository slug (name)



## Delete a repository from the database
`DELETE /:workspace/:repo_slug`  
#### Path parameters
Parameter | Description
--- | ---
workspace | The name of the workspace
repo_slug | The name of the repository slug (name)



## Get information about a specific repository
`GET /:workspace/:repo_slug`
#### Path parameters
Parameter | Description
--- | ---
workspace | The name of the workspace
repo_slug | The name of the repository slug (name)



## Get the changed lines TODO



# Commits

## Get a list with the last 30 commits from the repository
`GET /:workspace/:repo_slug/commits`  
#### Path parameters
Parameter | Description
--- | ---
workspace | The name of the workspace
repo_slug | The name of the repository slug (name)



## Get weekly commits TODO



## Get all commits TODO