//print 
//  function tester(){
//      for(var i=1;i<=5;i++){
//          setTimeout(function (){
//              console.log(i);
//          }, i*1000);
//      }
//  }
//  tester()

//print 
// function tester(){
//     for(var i=1;i<=5;i++){
//         setTimeout(function (){
//             console.log(i++);
//         }, i*1000);
//     }
// }
// tester()


// print 1 to 5
 function timer(){
    for(var i=1;i<=5;i++){
       setTimeout(function (){
             console.log(i++ - 5);
        }, i*1000);
     }
 }
 timer()






