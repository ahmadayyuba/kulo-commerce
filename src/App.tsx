import { useState } from "react";
import { 
  PlusIcon,
  MinusIcon,
  ShoppingCartIcon,
  GridIcon,
  EyeIcon,
  UserIcon,
  SearchIcon,
  CloseIcon,
  ArrowCircleBrokenRightIcon,
  MenuHamburgerIcon,
  CopyIcon,
  EyeOffIcon,
  TrashIcon,
} from "./assets/icons/icon";
import { Button } from "./components/ui/button";
import { BniLogo, BriLogo, BtnLogo, MandiriLogo, BcaLogo } from "./components/ui/BankLogo";
import { SearchBar } from "./components/ui/SearchBar";

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const iconList = [
    { name: 'Plus', component: <PlusIcon className="w-6 h-6" /> },
    { name: 'Minus', component: <MinusIcon className="w-6 h-6" /> },
    { name: 'Shopping Cart', component: <ShoppingCartIcon className="w-6 h-6" /> },
    { name: 'Grid', component: <GridIcon className="w-6 h-6" /> },
    { name: 'Eye', component: <EyeIcon className="w-6 h-6" /> },
    { name: 'User', component: <UserIcon className="w-6 h-6" /> },
    { name: 'Search', component: <SearchIcon className="w-6 h-6" /> },
    { name: 'Close', component: <CloseIcon className="w-6 h-6" /> },
    { name: 'Arrow Right', component: <ArrowCircleBrokenRightIcon className="w-6 h-6" /> },
    { name: 'Menu Hamburger', component: <MenuHamburgerIcon className="w-6 h-6" /> },
    { name: 'Copy', component: <CopyIcon className="w-6 h-6" /> },
    { name: 'Eye Off', component: <EyeOffIcon className="w-6 h-6" /> },
    { name: 'Trash', component: <TrashIcon className="w-6 h-6" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-8 space-y-10">
      <div className="max-w-[1120px] mx-auto space-y-8">
        
        {/* SECTION 1: SEARCH BAR */}
        <section className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h1 className="text-2xl font-bold text-slate-800">Search Bar</h1>
          <div className="w-full max-w-md">
            <SearchBar
              placeholder="Search..."
              onSearch={(value) => setSearchQuery(value)}
            />
          </div>
        </section>

        {/* SECTION 2: UJI COBA BUTTON UI */}
        <section className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Komponen Button UI</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-4 border border-slate-100 rounded-lg flex flex-col gap-2">
              <span className="text-xs font-semibold text-slate-400 uppercase">Primary</span>
              <Button variant="primary">
                Button Primary
              </Button>
            </div>

            <div className="p-4 border border-slate-100 rounded-lg flex flex-col gap-2">
              <span className="text-xs font-semibold text-slate-400 uppercase">Primary + Icon</span>
              <Button variant="primary" fullWidth>
                <ShoppingCartIcon className="w-5 h-5 mr-2" />
                Tambah Keranjang
              </Button>
            </div>

            <div className="p-4 border border-slate-100 rounded-lg flex flex-col gap-2">
              <span className="text-xs font-semibold text-slate-400 uppercase">Secondary</span>
              <Button variant="secondary">
                Button Secondary
              </Button>
            </div>

            <div className="p-4 border border-slate-100 rounded-lg flex flex-col gap-2">
              <span className="text-xs font-semibold text-slate-400 uppercase">Secondary + Icon</span>
              <Button variant="secondary">
                <PlusIcon className="w-5 h-5 mr-2" />
                Tambah Produk
              </Button>
            </div>
          </div>
        </section>

        {/* SECTION 3: GALERI ICON */}
        <section className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Icon</h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {iconList.map((icon, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow text-slate-700 cursor-pointer"
              >
                <div className="mb-2">{icon.component}</div>
                <span className="text-xs font-medium text-slate-500">{icon.name}</span>
              </div>
            ))}
          </div>
        </section>
        
        {/* SECTION 4: BANKLOGO ICON */}
        <section className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Bank Logo</h2>
          <div className="flex items-center gap-3">
            <BniLogo />
            <BriLogo />
            <BtnLogo />
            <MandiriLogo />
            <BcaLogo />
          </div>
        </section>

      </div>
    </div>
  );
}