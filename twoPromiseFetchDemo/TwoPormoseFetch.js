// function ajax(url, method, body, headers) {
function ajax(url, method, body) {
  return new Promise(function(resolve, reject) {
    var xhr;
    if (window.XMLHttpRequest) {
      // Mozilla, Safari...
      xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      // IE
      try {
        xhr = new ActiveXObject("Msxml2.XMLHTTP");
      } catch (e) {
        try {
          xhr = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {
          console.log("create error!");
        }
      }
    }
    // for (let key in headers) {
    //   let value = headers[key];
    //   xhr.setRequestHeader(key, value);
    // }
    if (xhr) {
      xhr.open(method, url); // method: GET, POST ...
      // 设置 Content-Type 为 application/x-www-form-urlencoded
      // 以表单的形式传递数据
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send(body ? body : null); // POST data is in here, GET is in url so no need have body
      // // 设置 Content-Type 为 application/json
      // xhr.setRequestHeader('Content-Type', 'application/json');
      // // 传递 JSON 字符串
      // xhr.send(JSON.stringify({ username:'admin', password:'root' }));
      xhr.onreadtstatechange = function() {
        // readyState的取值如下
        // 0 (未初始化)
        // 1 (正在装载)
        // 2 (装载完毕)
        // 3 (交互中)
        // 4 (完成)
        if (xhr.readystate === 4) {
          if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
            resolve.call(undefined, xhr.responseText);
          } else if (request.status >= 400) {
            reject.call(uncefined, xhr);
          }
        }
      };
      // 当然我们可以用onload来代替onreadystatechange等于4的情况，因为onload只在状态为4的时候才被调用
      // xhr.onload = function () {    // 调用onload
      //   if (xhr.status === 200) {    // status为200表示请求成功
      //       console.log('执行成功');
      //   } else {
      //       console.log('执行出错');
      //   }
      // }
    }
  });
}

function fetchIteratorArray(inputIdArray) {
  return Promise.all(inputIdArray.reduce((sum, cur) => {
    return [...sum, ajax(`bbb.ccc?id=${cur}`)];
    // return sum.concat(ajax(`bbb.ccc?id=${cur}`));
  }, []));
}

function fetchIteratorPromise(inputIdArray) {
  return inputIdArray.reduce((promiseChain, currentId) => {
    return promiseChain.then(chainResults => {
      let currentTaskPromise = ajax(`bbb.ccc?id=${currentId}`);
      chainResults.push(currentTaskPromise);
      return chainResults;
    });
  }, Promise.resolve([]));
}

// const tasks = getTaskArray();
// return tasks
//   .reduce((promiseChain, currentTask) => {
//     return promiseChain.then(chainResults =>
//       currentTask.then(currentResult => [...chainResults, currentResult])
//     );
//   }, Promise.resolve([]))
//   .then(arrayOfResults => {
//     // Do something with all results
//   });

function getId() {
  ajax("http://sss.bbb.ccc", "GET")
    .then(
      function(resIdArray) {
        fetchIteratorArray(resIdArray).then(resTableArray => {
          let resuls = resTableArray.join("");
          return resuls;
        });
        // fetchIteratorPromise(resIdArray).then(resTableArray => {
        //   let resuls = resTableArray.join("");
        //   return resuls;
        // });
      },
      function() {
        console.log("reject call");
      }
    )
    .catch(error => console.log(error));
}