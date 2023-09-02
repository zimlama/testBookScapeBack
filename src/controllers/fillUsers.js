const axios = require("axios");

const users = [
  {
    username: "ejemplo1",
    email: "ejemplo1@example.com",
    password: "ejemplo1pass",
  },
  {
    username: "ejemplo2",
    email: "ejemplo2@example.com",
    password: "ejemplo2pass",
  },
  {
    username: "ejemplo3",
    email: "ejemplo3@example.com",
    password: "ejemplo3pass",
  },
  {
    username: "ejemplo4",
    email: "ejemplo4@example.com",
    password: "ejemplo4pass",
  },
  {
    username: "ejemplo5",
    email: "ejemplo5@example.com",
    password: "ejemplo5pass",
  },
  {
    username: "ejemplo6",
    email: "ejemplo6@example.com",
    password: "ejemplo6pass",
  },
  {
    username: "ejemplo7",
    email: "ejemplo7@example.com",
    password: "ejemplo7pass",
  },
  {
    username: "ejemplo8",
    email: "ejemplo8@example.com",
    password: "ejemplo8pass",
  },
  {
    username: "ejemplo9",
    email: "ejemplo9@example.com",
    password: "ejemplo9pass",
  },
];
const fillUsers = async () => {
  for (const user of users) {
    console.log("se intento crear user: ", user);
    await axios.post("http://localhost:3001/users/", user);
  }
};

module.exports = fillUsers;
