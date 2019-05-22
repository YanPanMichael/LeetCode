function addImg(src) {
  return new Promise(function(resolve, reject) {
    const img = document.createElement('img');
    // throw new Error('asdfasdf')
    img.onload = function() {
      resolve(img);
    }
    img.onerror = function() {
      reject('加载失败');
    }
    img.src = src;
  })
}

// const src = 'http://www.w3school.com.cn/ui2017/bg.png';
// // const src = 'http://www.imooc.com/static/img/index/logo_new.png';
// addImg(src).then(
//   function(img) {console.log('img onload', img.width)},
//   function() {console.log('img error')}
// );

const src1 = 'http://www.w3school.com.cn/ui2017/bg.png';
const img1 = addImg(src1);
const src2 = 'http://www.imooc.com/static/img/index/logo_new.png';
const img2 = addImg(src2);
// img1.then(function(img) {
//   console.log('img onload', img.width)
//   // return img
//   return img2
// }).then(function(img) {
//   console.log('img onload', img.width)
// }).catch(function(err) {
//   console.log(err);
// })

Promise.all([img1, img2]).then(function(datas) {
  console.log('all', datas[0])
  console.log('all', datas[1])
})
Promise.race([img1, img2]).then(function(data) {
  console.log('race', data)
}) 
