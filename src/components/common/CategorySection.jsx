import React from 'react';
import { CATEGORIES } from '../../services/productData';

const CategorySection = () => {
  return (
    <div className='mt-5 mr-5'>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold tracking-wide text-parchment-100">Shop By Category</h2>
        <a href="#catalog" className="text-xs text-desert-sand-300 hover:underline xl:text-xl">View All &rarr;</a>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            className="p-3 xl:h-40 rounded-2xl bg-white border border-linen-500 hover:border-desert-sand-400 cursor-pointer transition-all duration-300 text-center group flex flex-col items-center"
          >
            <div className="w-full h-40 mb-2 rounded-xl overflow-hidden flex items-center justify-center p-2">
              <img
                src={cat.image}
                alt={cat.name}
                className="object-cover w-full group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <h3 className="text-xs font-bold text-parchment-100">{cat.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;