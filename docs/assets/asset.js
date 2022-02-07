
const fs =  require('fs');


const dataIn = fs.readFileSync('inventory.json');
let data = JSON.parse(dataIn);
data = data.map((item,index) => ({...item, id: index+1}));

// Write to file
fs.writeFileSync('inventory1.json', JSON.stringify(data))
console.log(data)
