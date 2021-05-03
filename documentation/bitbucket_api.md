# [Home](../README.md)

# Bitbucket API documentation

This API doesn't affect the real repository. I only affects the list on the local database, which is used to know what
repositories to monitor.

# Base URL

    /api/bitbucket/repositories

# Repositories - local database

## Get a list of all repositories stored on the database

`GET /`

#### Response

````
[
    {
        id
        workspace
        repo_slug
        name
        description
    } 
]
````



## Add a new repository to the database

`POST /`

#### Body parameters

Parameter | Description
--- | ---
workspace | The name of the workspace
repo_slug | The name of the repository slug
name |
description (optional) | The description of the repository



## Update information about the repository

`PUT /:workspace/:repo_slug`

#### Path parameters

Parameter | Description
--- | ---
workspace | The name of the workspace
repo_slug | The name of the repository slug

#### Body parameters

Parameter | Description
--- | ---
new_workspace | The new name of the workspace
new_repo_slug | The new name of the repository slug
name |
description (optional) | The description of the repository



## Delete a repository from the database

`DELETE /:workspace/:repo_slug`

#### Path parameters

Parameter | Description
--- | ---
workspace | The name of the workspace
repo_slug | The name of the repository slug (name)



## Get information about the repository from the database, based on the id

`GET /:id`

#### Path parameters

Parameter | Description
--- | ---
id | The id of the repository from the local database

#### Response

````
[
    {
        id
        workspace
        repo_slug
        name
        description
    } 
]
````



# Repositories - Bitbucket API



## Get all information about a specific repository

`GET /:workspace/:repo_slug`

#### Path parameters

Parameter | Description
--- | ---
workspace | The name of the workspace
repo_slug | The name of the repository slug

#### Response

````
{
    TODO
}
````

## Get some information about the repository

`GET /:workspace/:repo_slug/menu`

#### Path parameters

Parameter | Description
--- | ---
workspace | The name of the workspace
repo_slug | The name of the repository slug

#### Response

````
{
    TODO
}
````



## Get the amount of commits from the last 5 weeks

`GET /:workspace/:repo_slug/chart1`

#### Path parameters

Parameter | Description
--- | ---
workspace | The name of the workspace
repo_slug | The name of the repository slug

#### Response

````
{
    TODO
}
````



## Get the information about how often and by whom a commit was made

`GET /:workspace/:repo_slug/chart2`

#### Path parameters

Parameter | Description
--- | ---
workspace | The name of the workspace
repo_slug | The name of the repository slug

#### Response

````
{
    TODO
}
````



## Get all commits in a Repository

`GET /:workspace/:repo_slug/allcommits`

#### Path parameters

Parameter | Description
--- | ---
workspace | The name of the workspace
repo_slug | The name of the repository slug

#### Response

````
{
    TODO
}
````



## Get the last 30 commits in a Repository

`GET /:workspace/:repo_slug/lastcommits`

#### Path parameters

Parameter | Description
--- | ---
workspace | The name of the workspace
repo_slug | The name of the repository slug

#### Response

````
{
    TODO
}
````