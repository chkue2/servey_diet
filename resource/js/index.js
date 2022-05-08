$(function(){
  Kakao.init('30762a0cf914694cc45877158ce6ad93');
});

$(document).on('click', '#copy_kakao', function(){
  sendLink();
});

$(document).on('click', '#copy_link', function(){
  var url = window.document.location.href;
  
  var dummy = document.createElement("textarea");
  document.body.appendChild(dummy);
  dummy.value = url;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);

  alert('링크가 복사되었습니다.');
});

function sendLink() {
  var url = window.document.location.href;

  Kakao.Link.createDefaultButton({
    container: '#copy_kakao',
    objectType: 'feed',
    content:{
      title: $('meta[property="og:title"]').attr('content'),
      description: $('meta[property="og:description"]').attr('content'),
      imageUrl: $('meta[property="og:image"]').attr('content'),
      link:{
        mobileWebUrl: url,
        webUrl: url
      }
    },
    buttons: [
      {
        title: '자세히 보기',
        link: {
          mobileWebUrl: url,
          webUrl: url
        }
      }
    ]
  });
}