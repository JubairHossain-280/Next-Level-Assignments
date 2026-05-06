//* Problem 1
const filterEvenNumbers = (numArr: number[]): number[] => {
  return numArr.filter((num) => num % 2 === 0);
};

console.log(filterEvenNumbers([1, 2, 3, 4, 5, 6]));

//* Problem 2
const reverseString = (inputString: string): string => {
  const result = inputString.split("").reverse();
  return result.join("");
};

console.log(reverseString("typescript"));

//* Problem 3
type StringOrNumber = string | number;

const checkType = (input: StringOrNumber): "String" | "Number" => {
  return typeof input === "string" ? "String" : "Number";
};

console.log(checkType("Hello"));

//* Problem 4
const getProperty = <T, K extends keyof T>(obj: T, key: K): T[K] => {
  return obj[key];
};

const user = { id: 1, name: "John Doe", age: 21 };

console.log(getProperty(user, "name"));

//* Problem 5
interface Book {
  title: string;
  author: string;
  publishedYear: number;
}

const toggleReadStatus = (book: Book): Book & { isRead: boolean } => {
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
  constructor(
    public name: string,
    public age: number,
  ) {}
}

class Student extends Person {
  constructor(
    name: string,
    age: number,
    public grade: string,
  ) {
    super(name, age);
  }

  getDetails(): string {
    return `Name: ${this.name}, Age: ${this.age}, Grade: ${this.grade}`;
  }
}

const student = new Student("Alice", 20, "A");
console.log(student.getDetails());

//* Problem 7
const getIntersection = (arr1: number[], arr2: number[]): number[] => {
  const arr2Set = new Set(arr2);

  const common = arr1.filter((num) => arr2Set.has(num));
  return common;
};

console.log(getIntersection([1, 2, 3, 4, 5], [3, 4, 5, 6, 7]));
