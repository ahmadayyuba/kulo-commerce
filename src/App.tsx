import { use, useState } from "react";
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
import { CartButton } from "./components/ui/CartButton";
import { InputFeild } from "./components/ui/InputFeild";
import { Quantity } from "./components/ui/Quantity";

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(2);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState ('');
  const [quantityVal, setQuantityVal] = useState(2);

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

        {/* SECTION 1: CART BUTTON & BADGE */}
        <section className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h1 className="text-2xl font-bold text-slate-800">Cart Badge UI</h1>
          
          <div className="flex items-center gap-6">
            {/* Tampilan Cart Button dengan Badge */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <CartButton 
                count={cartCount} 
                onClick={() => alert(`Keranjang berisi ${cartCount} item`)} 
              />
            </div>

            {/* Tombol Simulasi Tambah / Kurang Angka Badge */}
            <div className="flex items-center gap-2">
              <Button 
                variant="secondary" 
                onClick={() => setCartCount((prev) => Math.max(0, prev - 1))}
              >
                - Kurangi
              </Button>
              <span className="font-mono font-bold px-3">{cartCount}</span>
              <Button 
                variant="primary" 
                onClick={() => setCartCount((prev) => prev + 1)}
              >
                + Tambah
              </Button>
            </div>
          </div>
        </section>

                {/* SECTION INPUT FIELD */}
        <section className="w-[1120px] p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h1 className="text-2xl font-bold text-slate-800">Input Field UI</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input Biasa */}
            <InputFeild
              label="Email"
              placeholder="Masukkan email kamu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              helperText="Gunakan email aktif."
            />

            {/* Input Password dengan Toggle Eye Icon */}
            <InputFeild
              label="Password"
              type="password"
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </section>

          {/* SECTION QUANTITY */}
        <section className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h1 className="text-2xl font-bold text-slate-800">Quantity UI</h1>

          <div className="flex items-center gap-6">
            <Quantity
              value={quantityVal}
              onChange={(val) => setQuantityVal(val)}
              min={1}
              max={10}
            />

            <span className="text-sm text-slate-600">
              Jumlah terpilih: <strong className="text-slate-900">{quantityVal}</strong>
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}