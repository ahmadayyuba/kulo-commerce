import { motion } from 'framer-motion';

interface AllCategoriesPageProps {
    onSelectCategory: (category: string) => void;
    onGoHome: () => void;
}

const CATEGORY_CARDS = [
    {
        name: "men's clothing",
        label: "Men's Clothing",
        image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png',
    },
    {
        name: 'jewelery',
        label: 'Jewelery',
        image: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_t.png',
    },
    {
        name: 'electronics',
        label: 'Electronics',
        image: 'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_t.png',
    },
    {
        name: "women's clothing",
        label: "Women's Clothing",
        image: 'https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_t.png',
    },
];

export const AllCategoriesPage = ({
    onSelectCategory,
    onGoHome,
}: AllCategoriesPageProps) => {
    return (
        <main className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 space-y-8">
            <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500">
                <button
                onClick={onGoHome}
                className="hover:text-blue-600 transition-colors"
                >
                Home
                </button>
                <span>&gt;</span>
                <span className="font-semibold text-slate-800">All Categories</span>
            </nav>

                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                All Categories
                </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {CATEGORY_CARDS.map((cat, index) => (
            <motion.button
            key={cat.name}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            onClick={() => onSelectCategory(cat.name)}
            className="group bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 hover:border-blue-500 hover:shadow-md transition-all text-center"
            >
            <div className="w-24 h-24 flex items-center justify-center">
                <img
                src={cat.image}
                alt={cat.label}
                className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
            />
            </div>
            <span className="font-semibold text-slate-800 text-sm sm:text-base group-hover:text-blue-600">
                {cat.label}
            </span>
            </motion.button>
            ))}
        </div>
    </main>
    );
};