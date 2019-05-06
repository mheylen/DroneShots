# drone shots

## frontend

###dependencies
- axios
- react-router-dom (BrowserRouter)
- redux
- react-redux
- redux-promise-middleware

###components

- App.js
    - Header
    - ContentView
        - Products
        - Search
    - Pilot Home
        - Upload
        - VideoStats
        - PostingForm
    - User
        - AdminCard
        - AddPayment
    

### Routes
- ContentView => '/'
    - /content/:id
- Downloads => '/downloads'
- AdminView => '/admin'

### Redux
```js
const initialState = {
admin: null,
downloads: [],
content: []
}
```

## backend

###dependencies
- express
- express-session
- massive
- dotenv
- bcrypt

###endpoint routes

**auth**
- login
- logout



**pilot**
- getAll: => /api/pilot
- getOne: => /api/pilot/:id
- get: => /api/pilot
- post: => /api/pilot
- put: => /api/pilot/:id
- delete: => /api/pilot/:id


***products***

- getAll: => /api/content
- get: => /api/content
- post: => /api/content
- put: => /api/content/:id
- delete: => /api/content/:id


### database Schema
- admin
```sql
create table droner(
    id serial primary key,
    username varchar(20) not null,
    password varchar(64) not null,
    email text
)

create table content(
    content_id serial primary key,
    name varchar(25) not null,
    description text,
    image text,
    pilot_id integer references pilot(id)
)

```

###server file structure

- /server
    - index.js
    - controller/
        - contentController.js
        - pilotController.js
        - userController.js
###dotenv
```text
SESSION_SECRET=
SERVER_PORT=
CONNECTION_STRING= (append => ?ssl=true)
```
###Thoughts
- Buyer - Dashboard will be downloads, request drone footage, and add payment. That's it.

- Pilot - Upload videos, emails.