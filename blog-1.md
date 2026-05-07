# `any` vs. `unknown`

## `any` — The Type Safety Hole

`any` টাইপ ব্যবহার করলে TypeScript তার সব চেকিং বন্ধ করে দেয়। তুমি যা খুশি করো — কোনো আপত্তি নেই।

```typescript
let name: any = "jubair";

name = 20;
name = { name: "jubair" };
name.toUpperCase();
```

এখানে সমস্যাটা স্পষ্ট — `name` যখন `20` বা একটা object, তখন `.toUpperCase()` call করা সম্পূর্ণ ভুল। কিন্তু TypeScript `any` দেখে চুপ থাকে। Error টা আসে production-এ, runtime-এ — যখন অনেক দেরি হয়ে গেছে।

---

## `unknown` — The Safer Alternative

`unknown` হলো `any`-এর type-safe version। এটাও যেকোনো ধরনের মান receive করে, কিন্তু পার্থক্য হলো — **`unknown` টাইপের উপর কোনো operation করার আগে সেটার type নিশ্চিত করতে হবে।**

```typescript
let name: unknown = "jubair";

if (typeof name === "string") {
  console.log(name.toUpperCase());
}
```

---

## Type Narrowing

**Type Narrowing** হলো সেই প্রক্রিয়া যেখানে আমরা একটি অনিশ্চিত type কে (যেমন `unknown`, `string | number`, ইত্যাদি) একটি নির্দিষ্ট type-এ narrow করি — এবং TypeScript সেটা বুঝে নেয়।

### 1. `typeof` Guard

```typescript
const getDiscount = (price: unknown) => {
  if (typeof price === "number") {
    const discountPrice = price - price * (10 / 100);

    console.log(`After Discount Only ${discountPrice}tk`);
  } else if (typeof price === "string") {
    const [purePrice] = price.split(" ");

    const numberPrice = Number(purePrice);

    const discountPrice = numberPrice - numberPrice * (10 / 100);

    console.log(`After Discount Only ${discountPrice}tk`);
  } else {
    console.log("Invalid Price!");
  }
};
```

### 2. `instanceof` Guard

```typescript
function handleError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return "An unknown error occurred";
}
```

### 3. `in` Operator

```typescript
type NormalUser = {
  id: number;
  name: string;
};

type AdminUser = {
  id: number;
  name: string;
  role: "admin";
};

function checkUser(user: NormalUser | AdminUser) {
  if ("role" in user) {
    console.log(`Welcome back admin ${user.name}`);
  } else {
    console.log(`Welcome back user ${user.name}`);
  }
}
```
