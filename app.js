const express = require("express");
const app = express();
const nunjucks = require("nunjucks");

const path = require("path")

const bp = require("body-parser");
const mainRouter = require("./routes/mainRouter");
const userRouter = require("./routes/userRouter");
const session = require("express-session");
const fileStore = require('session-file-store')(session);

// css 출력
app.use(express.static(path.join(__dirname, 'public')));


// post 데이터 처리 등록
app.use(bp.urlencoded({extended : true}));

// 세션 설정
app.use(session({
    httpOnly : true,
    resave : false,
    secret : "secret",
    store : new fileStore(),
    saveUninitialized : false
}))

// 라우터 등록
app.use("/", mainRouter);
app.use("/user", userRouter);

// 넌적스 셋팅
app.set("view engine", "html")
nunjucks.configure("views", {
    express : app,
    watch : true
});


// 일식 음식점 데이터
const restaurants = [
    { id: 1, name: '규슈', cuisine: '일식', review: 3528 },
    { id: 2, name: '목하식당', cuisine: '일식', review: 2688 },
    { id: 3, name: '캬베츠', cuisine: '일식', review: 1971 },
    { id: 4, name: '동백카츠', cuisine: '일식', review: 1051 },
    { id: 5, name: '구미구미', cuisine: '일식', review: 721 },
    { id: 6, name: '돈부리바쇼 유메노덴', cuisine: '일식', review: 811 },
    { id: 7, name: '연어쁘다', cuisine: '일식', review: 3749 },
    { id: 8, name: '포카포카', cuisine: '일식', review: 556 },
    { id: 9, name: '달곰식당', cuisine: '일식', review: 608 },
    { id: 10, name: '스시야스라기', cuisine: '일식', review: 1024 },
    { id: 11, name: '이츠모', cuisine: '일식', review: 1335 },
    { id: 12, name: '지은초밥', cuisine: '일식', review: 1175 },
    { id: 13, name: '윤끼', cuisine: '일식', review:475 },
    { id: 14, name: '소보쿠', cuisine: '일식', review: 419 },
    { id: 15, name: '천지라멘', cuisine: '일식', review: 566 },
    { id: 16, name: '소바 쿄다이', cuisine: '일식', review: 796 },
    { id: 17, name: '미노라멘', cuisine: '일식', review: 571 },
    { id: 18, name: '멘지', cuisine: '일식', review: 650 },
    { id: 19, name: '송경솥밥', cuisine: '일식', review: 430 },
    { id: 20, name: '아라타', cuisine: '일식', review: 401 }
];

// 사용자 선호도 예시 (cuisine: 음식 종류)
const userPreferences = {
    cuisine: '일식',// 사용자가 선호하는 음식 종류
    minReview: 400 // 사용자가 원하는 최소 리뷰 수
};

// 추천 알고리즘
function recommendRestaurants(preferences) {
    return restaurants
        .filter(restaurant => 
            restaurant.cuisine === preferences.cuisine &&
            restaurant.review >= preferences.minReview
        )
        .sort((a, b) => b.review - a.review); // 리뷰 수 기준으로 내림차순 정렬
}


// 추천 결과
const recommended = recommendRestaurants(userPreferences);
console.log(recommended);

// API 엔드포인트
//app.get('/recommend', (req, res) => {
   // const recommendations = recommendRestaurants(userPreferences);
   // res.json(recommendations);
//});


app.listen(3000);


