//@@@@ライブラリ(最初に読み込み!!)@@@@//
//addEventlisnerをIE8に対応//
    (function() {
    if (!Event.prototype.preventDefault) {
    Event.prototype.preventDefault=function() {
        this.returnValue=false;
    };
    }
    if (!Event.prototype.stopPropagation) {
    Event.prototype.stopPropagation=function() {
        this.cancelBubble=true;
    };
    }
    if (!Element.prototype.addEventListener) {
    var eventListeners=[];
    
    var addEventListener=function(type,listener /*, useCapture (will be ignored) */) {
        var self=this;
        var wrapper=function(e) {
        e.target=e.srcElement;
        e.currentTarget=self;
        if (typeof listener.handleEvent != 'undefined') {
            listener.handleEvent(e);
        } else {
            listener.call(self,e);
        }
        };
        if (type=="DOMContentLoaded") {
        var wrapper2=function(e) {
            if (document.readyState=="complete") {
            wrapper(e);
            }
        };
        document.attachEvent("onreadystatechange",wrapper2);
        eventListeners.push({object:this,type:type,listener:listener,wrapper:wrapper2});
        
        if (document.readyState=="complete") {
            var e=new Event();
            e.srcElement=window;
            wrapper2(e);
        }
        } else {
        this.attachEvent("on"+type,wrapper);
        eventListeners.push({object:this,type:type,listener:listener,wrapper:wrapper});
        }
    };
    var removeEventListener=function(type,listener /*, useCapture (will be ignored) */) {
        var counter=0;
        while (counter<eventListeners.length) {
        var eventListener=eventListeners[counter];
        if (eventListener.object==this && eventListener.type==type && eventListener.listener==listener) {
            if (type=="DOMContentLoaded") {
            this.detachEvent("onreadystatechange",eventListener.wrapper);
            } else {
            this.detachEvent("on"+type,eventListener.wrapper);
            }
            eventListeners.splice(counter, 1);
            break;
        }
        ++counter;
        }
    };
    Element.prototype.addEventListener=addEventListener;
    Element.prototype.removeEventListener=removeEventListener;
    if (HTMLDocument) {
        HTMLDocument.prototype.addEventListener=addEventListener;
        HTMLDocument.prototype.removeEventListener=removeEventListener;
    }
    if (Window) {
        Window.prototype.addEventListener=addEventListener;
        Window.prototype.removeEventListener=removeEventListener;
    }
    }
    })();
//--

//テスト実行用コード(window.load)//
//計算関数
    window.addEventListener('load', Calc, false);
//ajax関数
    window.addEventListener('load', function(){
    AjaxQuery('str=1', function(data){
        document.getElementById('ajax_output').innerHTML = data;
    });
    }, false);
//プルダウン関数
    window.addEventListener('load', function(){
        let pulldown = document.querySelectorAll('.pulldown-anime');
        for(let i = 0, length = pulldown.length; i < length; i++){
            pulldown[i].addEventListener('click', PullDown, false);
        }
    }, false);
///////////////////////////////////////////////////////////
// name: 計算関数
// desc: selectとradio type="radio"要素の数値の合計を出力
//       一度でも実行すれば、イベント登録
///////////////////////////////////////////////////////////
function Calc(){
let Result = 0; //価格の合計
let Num; //DOMから取得した数値をnumber型に変換する際に一時格納する変数
let RadioName = []; //class=Calcが付与されたradioのnameを取得
let count = -1; //RadioName取得でループをする際に使用するカウント変数
let CalcList = document.querySelectorAll('.Calc');
for(let i = 0, length = CalcList.length; i < length; i++){
  CalcList[i].addEventListener('click', function(){
      for(let i = 0, length = CalcList.length; i < length; i++){
          if(CalcList[i].getAttribute('type') === null){
              Num = CalcList[i].value;
              Num = Number(Num);
              Result = Result + Num;
          }else{
              if(CalcList[i].checked){
                  Num = CalcList[i].value;
                  Num = Number(Num);
                  Result = Result + Num;
              }
          }
      }
      //この部分で表示したい場所を指定
      document.getElementById('calc_output').innerHTML = Result;
      Result = 0;
  }, false);
}
}
//End
///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
// name: Ajax関数
// desc: 引数queryにPOSTしたい数値, funcに実行したい関数を入力 
//       *xhr.readyStateの数値で進行状態やエラーを判断可能(1,2,3,4)
///////////////////////////////////////////////////////////
function AjaxQuery(query, func){
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
if( xhr.status == 200 || xhr.status == 304 ) {
  var data = xhr.responseText; // responseXML もあり
  console.log(data);
  func(data);
} else {
  console.log( 'Failed. HttpStatus: '+xhr.statusText );
}
};
xhr.open( 'POST', 'ajax/ajax.php', false );
xhr.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
console.log(query);
xhr.send(query);
xhr.abort(); 
};
//End
///////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////
// name: ブラウザ判定関数
// desc: 現状はIE8以下か判定する機能
//       追加したい場合は自由に可能
///////////////////////////////////////////////////////////
window.addEventListener('load', function(){
var version = window.navigator.appVersion.toLowerCase();
if (version.indexOf("msie 8.") != -1) {
  console.log(version);
}else{
  console.log(version + 'ok');
}
}, false);
//End
///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
// name: プルダウン関数
// desc: 0を基準に、クリックするたびにmargin-topの数値を切り替え
// *親要素にoverflow: hidden;が必要
///////////////////////////////////////////////////////////
function PullDown(){
    let pulldown = this.id;
    pulldown = document.getElementById(pulldown + 'e');
    let margin = pulldown.style.marginTop;
    //▼ func関数はカウント関数の引数となる
    let func = function x(i){ 
        pulldown.style.marginTop = i + 'px';
    }
    if(margin === '0px'){
        CountA(func, 0, 10, -400, true);
    }else{
        CountA(func, -400, -10, 0, false);
    }
}
//End
///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
// name: カウント関数A
// desc: プルダウン関数で使用中
//       ['i'を'i2(-で足し算、プラスで引き算なので注意)'事に'max'まで、
//        5ms間隔でFuncに出力。終了は'operator'で判断]
///////////////////////////////////////////////////////////
function CountA(Func, i, i2, max, operator){
let loop = function(){
  i = i - i2;
  Func(i);
  if(operator === true){
      if(i <= max){
          return;
      }
  }else{
      if(i >= max){
          return;
      }
  }
  int = int - 1;
  setTimeout(loop, int);
};
let int = 5;
setTimeout(loop, int);
}
//End
///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
// name: Flex-header関数
// desc:
///////////////////////////////////////////////////////////
window.addEventListener('scroll', FixHeader, false );
function FixHeader(){
let StartPoint = 500; //処理開始位置(num型)
let StartID = document.getElementById('fixed-header'); //表示したい要素のID
let StartID2 = document.getElementById('header_title'); //表示したい要素のID2
clearTimeout(scroll)
scroll = setTimeout(function(){
if( this.scrollY > StartPoint){
StartID.classList.remove('dis-none');
StartID2.classList.add('dis-none');
}else{
StartID.classList.add('dis-none');
StartID2.classList.remove('dis-none');
}
}, 5)
}
//End
///////////////////////////////////////////////////////////