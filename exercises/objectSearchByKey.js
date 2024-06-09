// Should return: {id: 2, name: 'Apple', color: 'Red'}

var fruits = [
  { id: 1, name: "Banana", color: "Yellow" },
  { id: 2, name: "Apple", color: "Red" },
  { id: 3, name: "Orange", color: "Orange" },
  { id: 4, name: "Grapes", color: "Purple" },
  { id: 5, name: "Watermelon", color: "Green" },
];

//method 1: manual loop
// const searchByName = (objArray, keyValue = "") => {
//   for (let entry of objArray) {
//     for (let key in entry) {
//       if (entry[key] == keyValue) {
//         console.log(entry);
//         break;
//       }
//     }
//   }
// };

//method 2:
const searchByName = (objArray, keyValue = "") => {
  for (let entry of objArray) {
    Object.values(entry).includes(keyValue) && console.log(entry);
  }
};


// Search by Key value
const searchByKeyValue = (objArray, key = "", keyValue = "") => {
  for (let entry of objArray) {
    if (entry[key] == keyValue) console.log(entry);
  }
};

// searchByName(fruits, "Apple");
searchByKey(fruits, "name", "Apple");
