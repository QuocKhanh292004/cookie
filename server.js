const express = require("express");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");

// session

const session = {};
app.get("/", (req, res) => {
  res.render("pages/index");
});

// fake database
const db = {
  users: [
    {
      id: 1,
      name: "Nguyen Van A",
      email: "nguyenvana@gmail.com",
      password: "123456",
    },
  ],
};

// get/login
app.get("/login", (req, res) => {
  res.render("pages/login");
});
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = db.users.find(
    (u) => u.email === email && u.password === password
  );
  if (user) {
    sessionId = Date.now().toString();
    console.log(sessionId);
    session[sessionId] = {
      userId: user.id,
      createdAt: Date.now(),
    };
    console.log(session);
    res
      .setHeader("Set-Cookie", `sessionId=${sessionId}; max-age=3600; HttpOnly`)
      .redirect("/dashboard");
    return;
    // để an toàn hơn chỉ cho backend đọc được  cookie thì thêm HttpOnly
    res.json(user);
  } else {
    res.status(401).send("Đăng nhập không thành công");
  }
});

app.get("/dashboard", (req, res) => {
  res.render("pages/dashboard");
});

app.listen(port, () => {
  console.log(` bạn đang chạy trên cổng ${port}`);
});
