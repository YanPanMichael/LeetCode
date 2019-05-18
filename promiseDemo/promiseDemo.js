function addImg(src) {
  return new Promise(function(resolve, reject) {
    const img = document.createElement('img');
    img.onload = function() {
      resolve(img);
    }
    img.onerror = function() {
      reject()
    }
    img.src = src;
  })
}

const src = 'http://www.w3school.com.cn/ui2017/bg.png';
// const src = 'http://www.imooc.com/static/img/index/logo_new.png';
addImg(src).then(
  function(img) {console.log('img onload', img.width)},
  function() {console.log('img error')}
);
