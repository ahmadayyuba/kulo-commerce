import { useState, useEffect, useRef } from 'react';
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

    const touchStartX = useRef<number>(0);
    const touchEndX = useRef<number>(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % BANNER_SLIDES.length);
        }, 6000);

    return () => clearInterval(timer);
        }, []);

    const handleDotClick = (index: number) => {
        setCurrentIndex(index);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? BANNER_SLIDES.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === BANNER_SLIDES.length - 1 ? 0 : prev + 1));
    };

    const handleImageClick = () => {
        handleNext();
    };


    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.targetTouches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.targetTouches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (!touchStartX.current || !touchEndX.current) return;
        const distance = touchStartX.current - touchEndX.current;
        const minSwipeDistance = 50; 

    if (distance > minSwipeDistance) {
        handleNext();
    } else if (distance < -minSwipeDistance) {
        handlePrev();
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
    };

    return (
        <div className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-sm bg-slate-100   group">
        {/* WRAPPER SLIDE */}
            <div 
                className="flex transition-transform duration-700 ease-out w-full aspect-[2/1] cursor-pointer select-none"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
            {BANNER_SLIDES.map((slide) => (
            <div 
            key={slide.id} 
            className="w-full shrink-0 h-full relative"
            onClick={handleImageClick}
            >
                    <img
                        src={slide.image}
                        alt={slide.alt}
                        className="w-full h-full object-contain md:object-cover pointer-events-none"
                    />
            </div>
        ))}
        </div>


        {/* ARROW BUTTON LEFT */}
        <button
            type="button"
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 text-slate-800 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-white transition-all duration-200 z-10 cursor-pointer"
            aria-label="Previous slide"
        >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
        </button>

      {/* ARROW BUTTON RIGHT  */}
        <button
            type="button"
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 text-slate-800 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-white transition-all duration-200 z-10 cursor-pointer"
            aria-label="Next slide"
        >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
        </button>
        
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