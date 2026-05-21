"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const filterEvenNumbers = (numArr) => {
    return numArr.filter((num) => num % 2 === 0);
};
const reverseString = (inputString) => {
    const result = inputString.split("").reverse();
    return result.join("");
};
const checkType = (input) => {
    return typeof input === "string" ? "String" : "Number";
};
const getProperty = (obj, key) => {
    return obj[key];
};
const toggleReadStatus = (book) => {
    return {
        ...book,
        isRead: true,
    };
};
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
const getIntersection = (arr1, arr2) => {
    const arr2Set = new Set(arr2);
    const common = arr1.filter((num) => arr2Set.has(num));
    return common;
};
//# sourceMappingURL=solutions.js.map