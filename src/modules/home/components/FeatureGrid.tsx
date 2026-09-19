import React from 'react';
import featureRunning from "../../../assets/img/feature-running.jpg";
import featureLifestyle from "../../../assets/img/feature-lifestyle.jpg";
import featureTraining from "../../../assets/img/feature-training.jpg";
import featureBasket from "../../../assets/img/feature-basket.jpg";

const FEATURED = [
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

export const FeatureGrid: React.FC = () => {
  return (
    <div className='w-full'>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold tracking-wide text-parchment-100">Featured Collections</h2>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-4">
        {FEATURED.map((item) => (
          <div key={item.id} className="relative rounded-2xl overflow-hidden h-80 sm:h-90 md:h-80 lg:h-100 xl:h-80 group cursor-pointer shadow-md">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-3">
              <h3 className="font-bold text-white text-sm md:text-base">{item.title}</h3>
              <p className="text-[10px] md:text-xs text-gray-300">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureGrid;
