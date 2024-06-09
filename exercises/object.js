// name', 'address', 'emails', 'interests' and 'education'

let person = {
  name: "Nisan Shrestha",
  address: "Bharatpur, Chitwan",
  emails: ["nisantheman@gmail.com", "nisanshrestha404@gmail.com"],
  interests: ["Photography", "Music", "Design"],
  education: [
    { name: "Little Flower School", enrolledDate: 2004 },
    { name: "Prerana College", enrolledDate: 2017 },
    { name: "Pulchowk Campus,IOE", enrolledDate: 2019 },
  ],
};
// using for each
person.education.forEach((education) => {
  console.log(`Name: ${education.name}, Date: ${education.enrolledDate}`);
});

// using for of
for (let education of person.education) {
  console.log(`Name: ${education.name}, Date: ${education.enrolledDate}`);
}