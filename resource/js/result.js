$(document).ready(function(){
  let query = window.location.search
  let param = new URLSearchParams(query)
  const level = param.get('level')
  const score = param.get('s') 

  const lv = level.split('-')[0]

  $(`.tip__container.${level}`).show()
  $(`#${lv}`).show()

  setCurrentClass(lv, score)
})

function setCurrentClass(level, score){
  let cls = ''
  score = Number(score)

  switch(level){
    case 'level4':
      cls = 'level4-1'
    case 'level3':
      if(score > 20 && score <= 22) cls = 'level3-1'
      else if(score > 22 && score <= 25) cls = 'level3-2'
      else if(score > 25 && score <= 27) cls = 'level3-3'
      else cls = 'level3-4'
    case 'level2':
      if(score <= 16) cls = 'level2-1'
      else if(score > 16 && score <= 17) cls = 'level2-2'
      else if(score > 17 && score <= 18) cls = 'level2-3'
      else cls = 'level2-4'
    case 'level1':
      if(score <= 16) cls = 'level1-1'
      else if(score > 16 && score <= 17) cls = 'level1-2'
      else if(score > 17 && score <= 18) cls = 'level1-3'
      else cls = 'level1-4'
  }

  $(`#${level} .current__img`).addClass(cls)
}

function sendData(){
  let keyword1 = ''
  let keyword2 = ''
  
  let query = window.location.search
  let param = new URLSearchParams(query)
  const level = param.get('level')

  const lv = level.split('-')[0]

  console.log(lv)

  switch(lv){
    case 'level4':
      keyword1 = $('#level4Keyword1').val()
      keyword2 = $('#level4Keyword2').val()
      break
    case 'level3':
      keyword1 = $('#level3Keyword1').val()
      keyword2 = $('#level3Keyword2').val()
      break
    case 'level2':
      keyword1 = $('#level2Keyword1').val()
      keyword2 = $('#level2Keyword2').val()
      break
    case 'level1':
      keyword1 = $('#level1Keyword1').val()
      keyword2 = $('#level1Keyword2').val()
      break
  }

  if(keyword1 === '' && keyword2 === ''){
    location.href = '/'
  } else {
    const name = JSON.parse(localStorage.getItem('serveyUser')).name
    $.ajax({
      type: "GET",
      url: "https://script.google.com/macros/s/AKfycbwp1KyYdUe-kDryg0Dole3IcSsH_O8uMUyuhY_80k3JDCbsaMDfvNgNQfDkTU77GgJ-FA/exec",
      data: {
        "이름": name,
        "힘든점": keyword1,
        "더 필요한 것": keyword2,
      },
      success: function(){
        location.href = '/'
      },
      error: function(){
        alert('잠시 후 다시 시도해주세요.')
      }
    })
  }
}