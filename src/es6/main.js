$( function() {
  $( '#ajax-button' ) .click(
  function() {
      var hostUrl= 'http://localhost:8080/api/v1/tickets/';
      var param1 = 100;
      var param2 = 200;
      $.ajax({
          url: hostUrl,
          type:'POST',
          dataType: 'json',
          data : {parameter1 : param1, parameter2 : param2 },
          timeout:10000,
      }).done(function(data) {
                        alert("ok");
      }).fail(function(XMLHttpRequest, textStatus, errorThrown) {
                       alert("error");
      })
  });
} );

$( function() {
    var version = window.navigator.appVersion.toLowerCase();
    if (version.indexOf("msie 8.") != -1) {
        console.log(version);
    }else{
        console.log(version + 'ok');
    }
} );
//id要素を選択したら、同名のクラスを表示をトグル
//(id要素にはz-indexでclassと要素が隠れるように！)

//IE8以下の場合はこっち//
$( function(){
    let version = window.navigator.appVersion.toLowerCase();
    if (version.indexOf("msie 8.") != -1) {
        document.getElementById('pull_hide').onclick = function(){
            let Class = document.querySelectorAll('.pull_hide');
            for(let i = 0, length = Class.length; i < length; i++){
                Class[i].style.displya = 'none';
            }
            console.log('IE8');
        };
    }
});

window.addEventListener('load', function(){
    let pull = document.getElementById('pull_hide');
    pull.addEventListener('click', test, false);
}, false);

function test(){
    let Id = this.id
    let Class = document.querySelectorAll('.' + Id);
    for(let i = 0, length = Class.length; i < length; i++){
        let loop = function(){
            let width = Class[i].style.marginTop;
            width = width.slice( 0, -2 );
            width--;
            if(width === -60){
                Class[i].classList.add('pull-anime-hide');
                let pull = document.getElementById('pull_hide');
                pull.removeEventListener('click', test, false);
                pull.addEventListener('click', test2, false);
                return;
            }
            width = width + 'px';
            Class[i].style.marginTop = width;
            setTimeout(loop, 0.3);
        };
        Class[i].style.marginTop = '0px';
        setTimeout(loop, 0.3);
    }

}

function test2(){
    let Id = this.id
    let Class = document.querySelectorAll('.' + Id);
    for(let i = 0, length = Class.length; i < length; i++){
        let loop = function(){
            let width = Class[i].style.marginTop;
            width = width.slice( 0, -2 );
            width++;
            Class[i].classList.remove('pull-anime-hide');
            if(width === 0){
                let pull = document.getElementById('pull_hide');
                pull.removeEventListener('click', test2, false);
                pull.addEventListener('click', test, false);
                return;
            }
            width = width + 'px';
            Class[i].style.marginTop = width;
            setTimeout(loop, 0.3);
        };
        setTimeout(loop, 0.3);
    }

}

// 先頭から2文字を削除
// var a = str.slice( 2 ) ;

// 末尾から2文字を削除
// var b = str.slice( 0, -2 ) ;