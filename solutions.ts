// Problem 1
const filterEvenNumbers = (numArr: number[]): number[] => {
  return numArr.filter((num) => num % 2 === 0);
};

// Problem 2
const reverseString = (inputString: string): string => {
  const result = inputString.split("").reverse();
  return result.join("");
};

// Problem 3
type StringOrNumber = string | number;

const checkType = (input: StringOrNumber): "String" | "Number" => {
  return typeof input === "string" ? "String" : "Number";
};

// Problem 4
const getProperty = <T, K extends keyof T>(obj: T, key: K): T[K] => {
  return obj[key];
};

// Problem 5
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

// Problem 6
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

// Problem 7
const getIntersection = (arr1: number[], arr2: number[]): number[] => {
  const arr2Set = new Set(arr2);

  const common = arr1.filter((num) => arr2Set.has(num));
  return common;
};
