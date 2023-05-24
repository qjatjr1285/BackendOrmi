// advance 문제입니다. 오늘은 안배운 내용이 조금 섞여 있습니다. 다만 충분히 여러분이 배우지 않아도 지금까지 배운 것으로 풀 수 있는 문제입니다.
// 아래와 같은 코드를 console창에 입력해보면 데이터를 가지고 옵니다.
// fetch('http://test.api.weniv.co.kr/mall')
//     .then(data=>data.json())
//     .then(data=>console.log(data))
// 다음 중괄호를 완성하여서

// 전체 product의 갯수와
// 전체 가격의 평균을 구해주세요.
// fetch('http://test.api.weniv.co.kr/mall')
//     .then(data=>data.json())
//     .then(data=> {
//     // 여기에만 코딩을 해주셔야 합니다!
//     })
// 문제 확인 되신 분들은 여기 체크 표시 부탁드립니다. 🙂

fetch('http://test.api.weniv.co.kr/mall')
    .then(data=>data.json())
    .then(data => {
        let total_count = data.length;
        let total_price = data.reduce((sum, v) => sum + v.price, 0)
        let avg_price = (total_price / total_count).toFixed(2)

        console.log("Product의 갯수 : ", total_count)
        console.log("전체 가격 : ", total_price)
        console.log("전체 가격의 평균 : ", avg_price)
    })
