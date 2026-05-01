import assert from "node:assert/strict";
import test from "node:test";
import { menuCategories } from "../data/menu.js";
import { filterCategories } from "./filter.js";
import { changeQuantity, getCartCount, getCartTotal } from "./order.js";

const burger = menuCategories[0].items.find((item) => item.name === "Veg Burger (1 pc)");
const paneer = menuCategories[0].items.find(
  (item) => item.name === "Paneer Butter Masala"
);

test("cart item count sums quantities", () => {
  let cart = {};
  cart = changeQuantity(cart, burger, 1);
  cart = changeQuantity(cart, burger, 1);
  cart = changeQuantity(cart, paneer, 1);

  assert.equal(getCartCount(cart), 3);
});

test("cart total multiplies item prices by quantity", () => {
  let cart = {};
  cart = changeQuantity(cart, burger, 2);
  cart = changeQuantity(cart, paneer, 1);

  assert.equal(getCartTotal(cart), 1050);
});

test("search filters by item name, description, and tags", () => {
  const byName = filterCategories(menuCategories, {
    searchTerm: "sabudana",
    activeCategory: "All"
  });
  const byTag = filterCategories(menuCategories, {
    searchTerm: "kids",
    activeCategory: "All"
  });
  const byDescription = filterCategories(menuCategories, {
    searchTerm: "buttery tomato",
    activeCategory: "All"
  });

  assert.ok(byName.some((category) => category.items.some((item) => item.name.includes("Sabudana"))));
  assert.ok(byTag.some((category) => category.items.some((item) => item.name.includes("Burger"))));
  assert.ok(
    byDescription.some((category) =>
      category.items.some((item) => item.name === "Paneer Butter Masala")
    )
  );
});

test("category filtering limits results to the selected category", () => {
  const filtered = filterCategories(menuCategories, {
    searchTerm: "",
    activeCategory: "Pizza & Pasta"
  });

  assert.equal(filtered.length, 1);
  assert.equal(filtered[0].name, "Pizza & Pasta");
  assert.ok(
    filtered[0].items.every(
      (item) =>
        item.tags.includes("pizza") ||
        item.tags.includes("pasta") ||
        item.name === "Extra Cheese"
    )
  );
});

test("search runs across all categories even when a category is selected", () => {
  const filtered = filterCategories(menuCategories, {
    searchTerm: "paneer butter",
    activeCategory: "Pizza & Pasta"
  });

  assert.ok(
    filtered.some((category) =>
      category.items.some((item) => item.name === "Paneer Butter Masala")
    )
  );
});

test("item quantity logic increments, decrements, and removes at zero", () => {
  let cart = {};
  cart = changeQuantity(cart, burger, 1);
  cart = changeQuantity(cart, burger, 1);
  assert.equal(cart[burger.id].quantity, 2);

  cart = changeQuantity(cart, burger, -1);
  assert.equal(cart[burger.id].quantity, 1);

  cart = changeQuantity(cart, burger, -1);
  assert.equal(cart[burger.id], undefined);
});
