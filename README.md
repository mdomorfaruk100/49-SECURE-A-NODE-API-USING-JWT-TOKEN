# 49-6 introduce JWT token and get jwt token on client side

## JWT token is used to make secure api. JWT token is unique key / id generate when a user is logged in. if we use firebase for login then firebase automatic generate the unique key or token on currentUser object on accessToken key. 
## After that we need to send the jwt token on backend server under headers.

### EXAMPLE:
```
fetch("api", {
    method: "GET",
    headers: {
        authorization: currentUser.accessToken
    }
}).then(res => res.json())
.then(data => {
    console.log(data);
})
```

## For receiving headers data from backend/express we need to use headers obj of req object on express route.

### EXAMPLE:
```
    app.get('/', (req, res) => {
        console.log(req.headers);
    })
```
