import React from 'react';
import categoryRunning from "../../../assets/img/categories-running.jpg";
import categoryTraining from "../../../assets/img/categories-training.jpg";
import categoryLifestyle from "../../../assets/img/categories-lifestyle.jpg";

const categories = [
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
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=300",
  },
];

export const CategorySection: React.FC = () => {
  return (
    <div className='mt-5 mr-5'>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold tracking-wide text-parchment-100 font-headline">Kategori Pilihan</h2>
        <a href="/product" className="text-xs text-desert_sand-600 hover:underline">Lihat Semua &rarr;</a>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="p-3 rounded-2xl bg-white border border-linen-500 hover:border-desert_sand-400 cursor-pointer transition-all duration-300 text-center group flex flex-col items-center shadow-xs hover:shadow-md"
          >
            <div className="w-full h-24 mb-2 rounded-xl overflow-hidden flex items-center justify-center p-1 bg-gray-50">
              <img
                src={cat.image || 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=300&q=80'}
                alt={cat.name}
                className="object-cover w-full h-full rounded-lg group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="text-xs font-bold text-parchment-100 font-label">{cat.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
