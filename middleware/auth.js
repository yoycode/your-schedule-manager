const { User } = require("../models/User");

// 인증 처리를 하는 곳
let auth = (req, res, next) => {
  // 1. client의 cookie에서 token을 가져옴 (cookie-parser 이용)
  let token = req.cookies.x_auth;

  // 2. token을 복호화 한 후 유저를 찾는다 (메소드 생성)
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });

    req.token = token;
    req.user = user; // token과 user를 사용할 수 있도록 req에 넣어준 것
    next(); // 미들웨어 이후에 계속 진행될 수 있도록
  });

  // 3. 유저가 있으면 인증 완료

  // 4. 유저가 없으면 인증 X
};

module.exports = { auth };
