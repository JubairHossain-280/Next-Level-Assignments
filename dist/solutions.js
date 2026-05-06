"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//* Problem 1
const filterEvenNumbers = (numArr) => {
    return numArr.filter((num) => num % 2 === 0);
};
console.log(filterEvenNumbers([1, 2, 3, 4, 5, 6]));
//* Problem 2
const reverseString = (inputString) => {
    const result = inputString.split("").reverse();
    return result.join("");
};
console.log(reverseString("typescript"));
const checkType = (input) => {
    return typeof input === "string" ? "String" : "Number";
};
console.log(checkType("Hello"));
//* Problem 4
const getProperty = (obj, key) => {
    return obj[key];
};
const user = { id: 1, name: "John Doe", age: 21 };
console.log(getProperty(user, "id"));
const toggleReadStatus = (book) => {
    return {
        ...book,
        isRead: true,
    };
};
const myBook = {
    title: "TypeScript Guide",
    author: "Jane Doe",
    publishedYear: 2024,
};
console.log(toggleReadStatus(myBook));
//* Problem 6
class Person {
    name;
    age;
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
class Student extends Person {
    grade;
    constructor(name, age, grade) {
        super(name, age);
        this.grade = grade;
    }
    getDetails() {
        return `Name: ${this.name}, Age: ${this.age}, Grade: ${this.grade}`;
    }
}
const student = new Student("Alice", 20, "A");
console.log(student.getDetails());
//* Problem 7
const getIntersection = (arr1, arr2) => {
    const arr2Set = new Set(arr2);
    const common = arr1.filter((num) => arr2Set.has(num));
    return common;
};
console.log(getIntersection([1, 2, 3, 4, 5], [3, 4, 5, 6, 7]));
//# sourceMappingURL=solutions.js.map