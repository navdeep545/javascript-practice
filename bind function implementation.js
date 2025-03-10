const userName = {
    firstName:"Navdeep",
    lastName:"Jajoria"
} ;

function printName(country,state){
    console.log(this.firstName + " " + this.lastName + " " + country + " " + state) ;
}

Function.prototype.myBind = function(...args){
    let obj = this ;
    return function(){
         obj.call(args[0],...args) ;
    }
}

const printName2 = printName.bind(userName) ;
const printName3 = printName.myBind(userName) ;
printName2() ;
printName3("India","Punjab") ;