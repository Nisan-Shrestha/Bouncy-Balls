// Write a program to sort an array of object by a target key. The original array should remain unchanged.
let arr = [
  {
    id: 4,
    name: "Doe",
  },
  {
    id: 1,
    name: "John",
  },
  {
    id: 2,
    name: "Mary",
  },
  {
    id: 3,
    name: "Andrew",
  },
];

//todo: FIX ME!
function sortBy(arr, key) {
  let array = [...arr];
  if (typeof array[0][key] == "string") {
    sorter(array, (x, y) => x[key].localeCompare(y[key]));
  } else {
    sorter(array, (x, y) => x[key] - y[key]);
  }
  return array;
}

const sorter = (array, compareFN) => {
  for (let i = 0; i < array.length; i++) {
    for (let j = 1; j < array.length; j++) {
      // console.log(compareFN(array[i][key], array[j][key])>0,array[i][key],array[j][key])
      if (compareFN(array[i], array[j]) > 0 ) {
        let t = array[i];
        array[i] = array[j];
        array[j] = t;
      }
    }
  }
};

let sortedName = sortBy(arr, "name");
let sortedID = sortBy(arr, "id");

console.log(arr, sortedName, sortedID);
// console.log(typeof arr[0]["name"]);
// console.log(sortedName);
