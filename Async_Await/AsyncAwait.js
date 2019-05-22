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

const src1 = 'http://www.w3school.com.cn/ui2017/bg.png';
const src2 = 'http://www.imooc.com/static/img/index/logo_new.png';

async function demo() {
  const img1 = await addImg(src1);
  console.log(img1);
  const img2 = await addImg(src2);
  console.log(img2);
}
demo();