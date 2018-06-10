var asyncAdd=(a,b)=>{
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      if(typeof a==='number' && typeof b==='number'){
        resolve(a+b);
      }
      else{
        reject('not numbers');
      }
    },1500)
  });
};
asyncAdd(5,'7').then((res)=>{
  console.log(res);
  return asyncAdd(res,33);
}).then((res)=>{
  console.log('final',res);
}).catch((err)=>{
  console.log(err);
});
// var somePromise = new Promise((resolve,reject)=>{
//   setTimeout(()=>{
//     //resolve('Worked');
//     reject('error');
//   },2500);
//
// });
//
// somePromise.then((message)=>{
//   console.log('success', message);
// },(errorMessage)=>{
//   console.log('Eoor', errorMessage);
// })
