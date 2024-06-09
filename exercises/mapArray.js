var numbers = [1, 2, 3, 4];

// // Method 1:
// function transform(collection, tranFunc) {
//   let temp = collection.map(tranFunc);
//   return temp
// }

// Method 2:
function transform(collection, tranFunc) {
  let stack = [];
  for ( let item of collection){
    stack.push(tranFunc(item))
  }
  return stack
}

var output = transform(numbers, function (num) {
  return num * 2;
});
console.log(output);
// output should be [2, 4, 6, 8]

// console.log(numbers.map((a)=>{return a}));
