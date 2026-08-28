import { useState, useEffect } from 'react';
import banner1 from '../../assets/image/Banner-1.jpeg';
import banner2 from '../../assets/image/Banner-2.jpeg';
import banner3 from '../../assets/image/Banner-3.jpeg';

const BANNER_SLIDES = [
    {
        id: 1,
        image: banner1,
        alt: 'Promo Ramadhan 1',
    },
    {
        id: 2,
        image: banner2,
        alt: 'Promo Ramadhan 2',
    },
    {
        id: 3,
        image: banner3,
        alt: 'Promo Ramadhan 3',
    },
];

export const HeroBanner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % BANNER_SLIDES.length);
        }, 6000);

    return () => clearInterval(timer);
        }, []);

    const handleDotClick = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <div className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-sm bg-slate-100   group">
        {/* WRAPPER SLIDE */}
            <div 
                className="flex transition-transform duration-700 ease-out w-full aspect-[2/1]"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
            {BANNER_SLIDES.map((slide) => (
            <div key={slide.id} className="w-full shrink-0 h-full relative">
                    <img
                        src={slide.image}
                        alt={slide.alt}
                        className="w-full h-full object-contain md:object-cover"
                    />
            </div>
        ))}
        </div>

      {/* INDIKATOR DOTS */}
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10 bg-black/20    backdrop-blur-sm px-3 py-1.5 rounded-full">
        {BANNER_SLIDES.map((_, index) => (
            <button
                key={index}
                onClick={() => handleDotClick(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`transition-all duration-300 rounded-full ${
                currentIndex === index
                    ? 'w-6 h-2 bg-white'
                    : 'w-2 h-2 bg-white/50 hover:bg-white/80'
                }`}
            />
        ))}
    </div>
</div>
);
};