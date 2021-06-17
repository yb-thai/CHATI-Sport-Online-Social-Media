# Example Login, and GET with auth token

1.
```
curl -X POST -H "Content-Type: application/json" -d '{"username":"admin", "password":"admin"}' http://localhost:8000/api/auth/login/

{"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImFkbWluIiwiZXhwIjoxNjIxNTQ3MTAyLCJlbWFpbCI6IiJ9.2-UtFquNAWetLKXwkBCffE7vEoy_jdjbyjZYP3rN58A","user":{"pk":1,"username":"admin","email":"","first_name":"","last_name":""}}%
```

2.
```
curl -H "Authorization: JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImFkbWluIiwiZXhwIjoxNjIxNTQ3MTAyLCJlbWFpbCI6IiJ9.2-UtFquNAWetLKXwkBCffE7vEoy_jdjbyjZYP3rN58A" http://localhost:8000/api/events/

{"count":0,"next":null,"previous":null,"results":[]}
```

3.
```
curl http://localhost:8000/api/events/

{"detail":"Authentication credentials were not provided."}
```

# After some work ...

This is a user looking for all events that are visible to them:

```
{"count":1,"next":null,"previous":null,"results":[{"id":4,"owner":"admin","location":"NOTSECRET","start":"2020-05-20T12:00:00Z","members":[1,2]}]}
```