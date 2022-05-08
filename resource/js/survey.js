const MAX_SECTION = 4
let section = 1
const question = [
    { uid:'0', step: '1', text: '현재 내 몸 상태에 대한 책임은 나에게 있다.'},
    { uid:'1', step: '1', text: '내 몸의 변화를 위해서는 나 스스로 노력해야 한다.'},
    { uid:'2', step: '1', text: '자기관리가 잘되면 어떤 (긍정적인) 삶을 살게 될지 생생하게 떠올릴 수 있다.'},
    { uid:'3', step: '1', text: '내가 원하는 몸매를 갖게 되는 것은 가치 있는 일이다.'},
    { uid:'4', step: '2', text: '내가 원하는 몸매를 만들 자신이 있다.'},
    { uid:'5', step: '2', text: '나에게는 자기관리를 더 잘할 수 있는 능력이 있다.'},
    { uid:'6', step: '2', text: '다이어트 중에 좌절하더라도 마음을 굳게 다잡을 자신이 있다.'},
    { uid:'7', step: '2', text: '부정적인 감정이 생기더라도 운동과 식단관리를 이어나갈 자신이 있다.'},
    { uid:'8', step: '2', text: '강한 유혹을 이겨내고 운동과 식단관리를 계속해나갈 자신이 있다.'},
    { uid:'9', step: '2', text: '자기관리에 방해가 되는 감정과 생각을 조절할 수 있다.'},
    { uid:'10', step: '3', text: '나는 무언가를 ‘성취하는 것’을 중요시한다.',},
    { uid:'11', step: '3', text: '새로운 운동 방법/비법을 익히는 것이 재미있다.',},
    { uid:'12', step: '3', text: '나 자신의 한계를 뛰어넘을 때 희열을 느낀다.',},
    { uid:'13', step: '3', text: '더 큰 성과를 얻을 수 있다면 기꺼이 도전을 감행한다.',},
    { uid:'14', step: '3', text: '자기관리를 통해 이룰 수 있는 것들을 상상하곤 한다.',},
    { uid:'15', step: '3', text: '내가 원하는 ‘이상적인 몸매’를 떠올리면 변화에 대한 욕구가 강해진다.',},
    { uid:'16', step: '4', text: '나는 ‘안정적인 것’을 중요시한다.'},
    { uid:'17', step: '4', text: '실험적인 운동 방법보다는 익숙한 운동 방법을 더 선호한다.'},
    { uid:'18', step: '4', text: '식단관리를 할 때는 익숙한 종류/맛의 음식 위주로 해야 한다.'},
    { uid:'19', step: '4', text: '성과가 적더라도 위험을 감수하기보다는 안전한 길을 택한다.'}
]
let user = {
  name: '',
  gender: '1'
}
let score = {
  step1: 0,
  step2: 0,
  step3: 0,
  step4: 0
}

$(document).ready(() => {
  $(`#section0${section}`).show()
  setQuestion(question.slice(0, 5), 'section01')
  setQuestion(question.slice(5, 10), 'section02')
  setQuestion(question.slice(10, 15), 'section03')
  setQuestion(question.slice(15, 20), 'section04')
})

const setQuestion = (arr, id) => {
  let html = ''
  arr.forEach(x => {
    html += `
      <div class="q__box">
        <div class="wrapper">
          <p class="q__title">${x.text}</p>
          <div class="q__val">
            <input class="big" type="radio" name="servey${x.uid}" value="1">
            <input type="radio" name="servey${x.uid}" value="2">
            <input type="radio" name="servey${x.uid}" value="3">
            <input type="radio" name="servey${x.uid}" value="4">
            <input class="big" type="radio" name="servey${x.uid}" value="5">
          </div>
          <div class="q__info">
            <span>전혀 동의하지 않는다</span>
            <span>전적으로 동의한다</span>
          </div>
        </div>
      </div>
    `
  })
  html += (id === 'section04') ? `  
    <div class="button">
      <p onclick="moveToResult()">테스트 결과 보기</p>
    </div>` : `  
    <div class="button">
      <p onclick="nextStep()">다음</p>
    </div>`

  $(`#${id}`).html(html)
}

const getRadioValidate = (uid) => {
  return $(`input[name=servey${uid}]:checked`).val() !== undefined && $(`input[name=servey${uid}]:checked`).val() !== 0
}

const getSectionRadio = (arr) => {
  let res = true
  arr.forEach(x => {
    if(getRadioValidate(x.uid) === false){
      res = false
    }
  })
  return res
}

const setScore = (arr) => {
  arr.forEach(x => {
    const s = $(`input[name=servey${x.uid}]:checked`).val()

    score[`step${x.step}`] += Number(s)
  })
}

function startTest(){
  user.name = $('#name').val()
  user.gender = $('#gender').val()

  if(user.name === '') {
    alert('당신의 닉네임을 입력해주세요.')
    $('#name').focus()
    return false
  }

  $('#main').hide()
  $('#survey').show()
}

function nextStep(){
  let res = false
  switch(section){
    case 1:
      res = getSectionRadio(question.slice(0, 5))
      setScore(question.slice(0, 5))
      break
    case 2:
      res = getSectionRadio(question.slice(5, 10))
      setScore(question.slice(5, 10))
      break
    case 3:
      res = getSectionRadio(question.slice(10, 15))
      setScore(question.slice(10, 15))
      break
  }
  if(res === false) return false

  section++
  $('.survey').hide()
  $(`#section0${section}`).show()

  $('html, body').stop().animate({
    scrollTop: 360
  }, 500)
}

function getAverage(s, range){
  return parseFloat(s / range)
}

function moveToResult(){
  const res = getSectionRadio(question.slice(15, 20))
  if(res === false) return false

  setScore(question.slice(15, 20))

  let level = ''
  if(score.step1 > 18 && score.step2 > 20){
    if(getAverage(score.step3, 6) - getAverage(score.step4, 4) >= 0){
      level = 'level4-1'
    } else {
      level = 'level4-2'
    }
  } else if(score.step1 > 18 && score.step2 <= 20){
    if(getAverage(score.step3, 6) - getAverage(score.step4, 4) >= 0){
      level = 'level3-1'
    } else {
      level = 'level3-2'
    }
  } else if(score.step1 <= 18 && score.step2 > 20){
    if(getAverage(score.step3, 6) - getAverage(score.step4, 4) >= 0){
      level = 'level2-1'
    } else {
      level = 'level2-2'
    }
  } else if(score.step1 <= 18 && score.step2 <= 20){
    if(getAverage(score.step3, 6) - getAverage(score.step4, 4) >= 0){
      level = 'level1-1'
    } else {
      level = 'level1-2'
    }
  }

  localStorage.setItem('serveyUser', JSON.stringify({
    name: user.name,
    gender: user.gender
  }))

  $.ajax({
    type: "GET",
    url: "https://script.google.com/macros/s/AKfycbzsKYsj--9ls_IqU6of0avATFRrSq_qa0PAgSpa52_SXIoFn57h-TsyyW-De_lYZsguaQ/exec",
    data: {
      "이름": user.name,
      "성별": user.gender,
      "요인1": score.step1,
      "요인2": score.step2,
      "요인3": score.step3,
      "요인4": score.step4
    },
    success: function(){
      location.href = `/result/?level=${level}&s=${score.step2}`
    },
    error: function(){
      alert('잠시 후 다시 시도해주세요.')
    }
  });
}