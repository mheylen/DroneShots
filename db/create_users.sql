insert into users
(email, password)
VALUES($1, $2)
RETURNING *;