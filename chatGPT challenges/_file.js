import fs from 'fs' ;

const data = fs.readFileSync('message.txt','utf-8') ;

console.log(data.toUpperCase())  ;

fs.writeFileSync('message.txt',data.toUpperCase()) ;
