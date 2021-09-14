const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("../../config/key");
const { auth } = require("../../middleware/auth");
const { User } = require("../../models/User");

// application/x-www-form-urlencoded 이렇게 된 데이터를 분석해서 가져옴
app.use(bodyParser.urlencoded({ extended: true }));
// application/json 타입으로 된 데이터를 분석해서 가져옴
app.use(bodyParser.json());

app.use(cookieParser());

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then(() => console.log("MongoDB connected...."))
  .catch((err) => console.log(err));

app.post("/", (req, res) => {
  console.log(req);
  console.table(req.body);
  res.send("Hello World!yoy2");
});

// 회원가입을 위한 라우트 (endpoint, (callback function))
app.post("/user/register", (req, res) => {
  // 회원가입할 때 필요한 정보들을 client 에서 가져오면
  // 그것들을 데이터베이스에 넣어준다.

  // req.body에 이런식으로 데이터가 들어있음 (bodyParser 덕분에)
  // {
  //     id:"hello",
  //     password:"123"
  // }
  console.log(req.body);
  const user = new User(req.body); // 인스턴스 생성 (모든정보들을 user에 넣어줌)


  //mongoDB method .save()
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
      msg: "hi"
    });
  });
});

// 로그인을 위한 라우트
app.post("/api/user/login", (req, res) => {
  // 로그인 라우트에서 해야할일
  // 1. 요청된 이메일을 데이터베이스에 있는지 찾음 (모델을 가져온 후 찾으려면 mongoDB method .fondOne())
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "해당 이메일이 존재하지 않습니다",
      });
    }
    // 2. 요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는지 확인 User모델에서 method생성
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });

      // 3. 비밀번호까지 같다면 해당 유저를 위한 token 생성 (User모델에서 method 생성)
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        // 토큰 저장 ( 쿠키 or 로컬스토리지 or 세션...) 쿠키에 저장하려면 cookie parser
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

// auth: 미드웨어
// callback function하기 전에 중간에 뭔가 해줌
app.get("/api/users/auth", auth, (req, res) => {
  // 여기까지 auth 미들웨어를 통과해왔다면 authentication이 True라는 말
  res.status(200).json({
    _id: req.user._id, // auth에서 user를 req에 넣었기때문에 가능한 것
    isAdmin: req.user.role === 0 ? false : true, // 0이면 false, 아니면 true
    isAuth: true,
    email: req.secure.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
    // 이런식으로 만들어놓으면 어떤 페이지에서든지 유저 정보를 이용할 수 있음
  });
});

//req, res 순서 바뀌면 안됨
app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
    });
  }); // 미들웨어 auth에서 req.user._id가져옴
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});