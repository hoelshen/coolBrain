const middleWares = [];

const useCookie = (ctx, next) =>{

}


const useLoadingText = (ctx, next)=>{

}

middleWares.push(useCookie, useLoadingText);


class Scheduler{
  add(promiseCreator){
    // 
  }
}

const timeout = time => new Promise(resovle =>{
  console.log('in time', time);
  setTimeout(resolve, time)
});


const scheduler  = new Scheduler();

const addTask = (time, order) =>{
  scheduler.add(()=> timeout(time))
          .then(()=> console.log(order))
}

addTask(1000, 1)
addTask(500, 2)
addTask(300, 3)
addTask(400, 4)

