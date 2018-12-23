# To create a user

db.createUser(
  {
    user: "dilip",
    pwd: "123456",
    roles: [ { role: "readWrite", db: "yearbook" }]
  }
)

# To auth the db

 db.auth("dilip","123456")


