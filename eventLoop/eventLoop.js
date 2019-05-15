console.log('1');

setTimeout(function() {
    console.log('2');
    process.nextTick(function() {
        console.log('3');
    })
    new Promise(function(resolve) {
        console.log('4');
        resolve();
    }).then(function() {
        console.log('5')
    })
})

process.nextTick(function() {
    console.log('6');
})
new Promise(function(resolve) {
    console.log('7');
    resolve();
}).then(function() {
    console.log('8')
})

setTimeout(function() {
    console.log('9');
    process.nextTick(function() {
        console.log('10');
    })
    new Promise(function(resolve) {
        console.log('11');
        resolve();
    }).then(function() {
        console.log('12')
    })
})


// 1,7,6,8,2,4,3,5,9,11,10,12

// 我们来分析一下

// 首先先执行console.log(1) 然后将setTimeout放到宏任务event queue里面 记作 setTimeout 1 ，接着 看到 process.nextTick ，将其放到微任务里面 ，记作 process 1，然后 看到new promise 立即执行输出9 ，将里面的then 放到 微任务里面 记作 then 2, 继续，遇到 setTimeout 放到宏任务里面记作 setTimeout  2 。目前输出的是：1,7，

// OK, 接下来，开始判断是否有微任务，刚刚放入到微任务event queue的进入到主程序开始执行，process 1  ， then 2 目前输出的是：6,8、
// 接下来，微任务的event queue 空了，进行下一轮事件，将刚刚放到宏任务的 setTimeout 1 进入到主线程
// 遇到 console 立即执行， 遇到  process.nextTick 放到微任务 event queue 里面 记作  process1， 接着遇到  new Promise 立即执行， 将 then 放到event queue 里面 记作  then 2，OK，当前宏任务里的任务执行完了，判断是否有微任务，发现有 process1，  then 2 两个微任务 ， 一次执行  目前输出的是：2,4,3,5、
// 目前主线程里的任务都执行结束了,又开始第三轮事件循环，同上（字太多，省略。。。。） 目前输出的是：9,11,10,12、