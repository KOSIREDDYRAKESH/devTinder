# DevTinder api's

## authRouter
- POST /singup
- POST /Login
- POST /Logout

## profileRouter
- GET /Profile/view
- PATCH /profile/edit
- PATCH /profile/password

## connectionsRequestRouter
- POST request/send/intrested/:userId
- POST request/send/igonred/:userId
- POST request/review/accepetd/:requestId
- POST request/review/rejected/:requestId

## userRouter
- GET /user/connections
- GET /user/request/recieved
- GET /user/feed - gets u the feed of others profile

Status : ignored/intrested/accepted/rejected/pending
