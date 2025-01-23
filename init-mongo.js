db = db.getSiblingDB('food90');
db.createUser({
  user: "food90_user",
  pwd: "food90_user_password",
  roles: ["readWrite"]
});

// Create collections
db.createCollection('users');
db.createCollection('carts');

// Create indexes
db.users.createIndex({ username: 1 }, { unique: true });
db.carts.createIndex({ userId: 1 }, { unique: true });