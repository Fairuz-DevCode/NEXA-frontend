import featureRunning from "../assets/img/feature-running.jpg";
import featureLifestyle from "../assets/img/feature-lifestyle.jpg";
import featureTraining from "../assets/img/feature-training.jpg";
import featureBasket from "../assets/img/feature-basket.jpg";

import categoryRunning from "../assets/img/categories-running.jpg";
import categoryTraining from "../assets/img/categories-training.jpg";
import categoryLifestyle from "../assets/img/categories-lifestyle.jpg";

export const PRODUCTS_DATA = [
  {
    id: 1,
    name: "Classic Over-sized Hoodie",
    price: 349000,
    category: "Hoodie",
    image:
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 2,
    name: "Streetwear Cargo Pants Black",
    price: 420000,
    category: "Pants",
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 3,
    name: "Retro Sneakers V1",
    price: 899000,
    category: "Shoes",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 4,
    name: "Retro Sneakers",
    price: 899000,
    category: "Shoes",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60",
  },
];

export const FEATURED = [
  {
    id: 1,
    title: "Running",
    subtitle: "Built for speed",
    image: featureRunning,
  },
  {
    id: 2,
    title: "Lifestyle",
    subtitle: "Made for everyday",
    image: featureLifestyle,
  },
  {
    id: 3,
    title: "Training",
    subtitle: "Push your limits",
    image: featureTraining,
  },
  {
    id: 4,
    title: "Basketball",
    subtitle: "Own the game",
    image: featureBasket,
  },
];

export const CATEGORIES = [
  {
    id: 1,
    name: "Running",
    image: categoryRunning,
  },
  {
    id: 2,
    name: "Lifestyle",
    image: categoryLifestyle,
  },
  {
    id: 3,
    name: "Training",
    image: categoryTraining,
  },
  {
    id: 4,
    name: "Basketball",
    image:
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=300",
  },
];
