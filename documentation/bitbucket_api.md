# Bitbucket API documentation

## Repositories
This API doesn't affect the real repository. I only affects the list on the local database, 
which is used to know what repositories to monitor.

### Base URL
    /bitbucket/repositories

### Get a list of all repositories stored on the database
`GET /`


### Add a new repository to the database
`POST /`
#### Body parameters
- workspace:
- repo_slug:


### Update information about the repository
`PUT /:workspace/:repo_slug`
#### Path parameters
- workspace: 
- repo_slug: 
#### Body parameters
- TODO


### Delete a repository from the database
`DELETE /:workspace/:repo_slug`  
- workspace:
- repo_slug:


### Get information about a specific repository
`GET /:workspace/:repo_slug`
- workspace:
- repo_slug:


### Get a list with the last 30 commits from the repository
`GET /:workspace/:repo_slug/commits`  
- workspace:
- repo_slug: 