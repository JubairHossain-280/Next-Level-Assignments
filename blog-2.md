# `Pick` & `Omit` - Technique to keep code DRY in TypeScript

## DRY Principle

**DRY = Don't Repeat Yourself**

Software engineering-এর একটি মূলনীতি: একই logic বা definition একাধিক জায়গায় না লিখে একটি single source of truth রাখো। যখন পরিবর্তন দরকার হয়, শুধু এক জায়গায় করলেই হবে।

`Pick` এবং `Omit` এই নীতিকে type level-এ enforce করে।

---

## Single Source of Truth

```typescript
interface ProductData {
  id: number;
  name: string;
  price: number;
  stock: number;
  color?: string;
}
```

এটাই আমাদের সব তথ্যের উৎস। এখন এই একটি interface থেকে আমরা বিভিন্ন "slice" তৈরি করব।

---

## `Pick`

`Pick<T, K>` একটি type থেকে নির্দিষ্ট কিছু field **বেছে নেয়**।

```
Pick<Type, "field1" | "field2" | "field3">
```

### Product Overview - এর জন্য

ProductData থেকে শুধু `id`, `name`, এবং `price` দরকার:

```typescript
type ProductOverview = Pick<ProductData, "id" | "name" | "price">;
```

---

## `Omit`

`Omit<T, K>` একটি type থেকে নির্দিষ্ট কিছু field **বাদ দেয়**, বাকি সব রাখে।

```
Omit<Type, "field1" | "field2">
```

### Product Data — stock ছাড়া

ProductWithoutStock-এ `stock` দেখানো উচিত নয়:

```typescript
type ProductWithoutStock = Omit<ProductData, "stock">;
```
