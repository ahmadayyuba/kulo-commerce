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
  InstagramIcon,
  GitHubIcon,
  FacebookIcon,
  LinkedinIcon,
  GmailIcon,
} from "./assets/icons/icon";
import { Button } from "./components/ui/button";
import { BniLogo, BriLogo, BtnLogo, MandiriLogo, BcaLogo } from "./components/ui/BankLogo";
import { SearchBar } from "./components/ui/SearchBar";
import { CartButton } from "./components/ui/CartButton";
import { InputFeild } from "./components/ui/InputFeild";
import { Quantity } from "./components/ui/Quantity";
import { RadioButton } from "./components/ui/RadioButton";
import { Checkbox } from "./components/ui/Checkbox";
import { EmptyCartIllustration } from "./components/illustrations/EmptyIllustrations";
import { EmptySearchIllustration } from "./components/illustrations/EmptyIllustrations";
import { EmptyState } from "./components/ui/EmptyState";
import { Logo } from "./components/ui/Logo";
import { ProductCard } from "./components/ui/ProductCard";
import { CartItem } from "./components/ui/CartItem";
import { CartItemType } from "./types/product";
import { Header } from "./components/layout/Header";

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(2);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [quantityVal, setQuantityVal] = useState(2);
  const [selectedRadio, setSelectRadio] = useState("option1");
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isChecked, setIsChecked] = useState(true);
  const dummyProduct = {
  id: "1",
  name: "Product Name",
  price: 100000,
  rating: 5.0,
  image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", // Contoh gambar headphone
};

  const [cartList, setCartList] = useState<CartItemType[]>([
    {
      product: {
        id: "1",
        name: "product Name",
        price: 100000,
        rating: 5.0,
        category: "Category",
        image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
      },
      quantity: 2,
      selected: true,
    },
  ]);

  const handleQuantityChange = (index: number, newQty: number) => {
    const updated = [...cartList];
    updated[index].quantity = newQty;
    setCartList(updated);
  };

  const handleSelectChange = (index: number, selected: boolean) => {
    const updated = [...cartList];
    updated[index].selected = selected;
    setCartList(updated);
  };

  const handleRemove = (index: number) => {
    setCartList((prev) => prev.filter((_, i) => i !== index));
  };


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
    { name: 'Instagram', component: <InstagramIcon className="w-6 h-6 text-pink-600" /> },
    { name: 'GitHub', component: <GitHubIcon className="w-6 h-6 text-slate-800" /> },
    { name: 'Facebook', component: <FacebookIcon className="w-6 h-6 text-blue-600" /> },
    { name: 'LinkedIn', component: <LinkedinIcon className="w-6 h-6 text-blue-700" /> },
    { name: 'Gmail', component: <GmailIcon className="w-6 h-6 text-red-500" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-8 space-y-10">
      {/* HEADER LIVE PREVIEW */}
      <Header
        cartCount={6}
        isLoggedIn={isLoggedIn}
        userName="John Doe"
        onSearch={(val) => console.log("Search:", val)}
        onCartClick={() => alert("Cart diklik")}
      />

      <div className="max-w-[1120px] mx-auto space-y-8">

        {/* CONTROLLER TOGGLE STATE HEADER */}
        <section className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h1 className="text-xl font-bold text-slate-800">Uji Coba Header State</h1>
          <div className="flex items-center gap-4">
            <Button 
              variant={!isLoggedIn ? "primary" : "secondary"}
              onClick={() => setIsLoggedIn(false)}
            >
              Mode Guest (Belum Login)
            </Button>
            <Button 
              variant={isLoggedIn ? "primary" : "secondary"}
              onClick={() => setIsLoggedIn(true)}
            >
              Mode Logged In (John Doe)
            </Button>
          </div>
        </section>

        
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

        {/* SECTION 3: GALERI ICON & SOCIAL MEDIA */}
        <section className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Galeri Icon & Social Media</h1>
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

        {/* SECTION 5: CART BUTTON & BADGE */}
        <section className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h1 className="text-2xl font-bold text-slate-800">Cart Badge UI</h1>
          <div className="flex items-center gap-6">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <CartButton 
                count={cartCount} 
                onClick={() => alert(`Keranjang berisi ${cartCount} item`)} 
              />
            </div>
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

        {/* SECTION 6: INPUT FIELD */}
        <section className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h1 className="text-2xl font-bold text-slate-800">Input Field UI</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputFeild
              label="Email"
              placeholder="Masukkan email kamu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              helperText="Gunakan email aktif."
            />
            <InputFeild
              label="Password"
              type="password"
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </section>

        {/* SECTION 7: QUANTITY */}
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

        {/* SECTION RADIO BUTTON & CHECKBOX */}
        <section className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h1 className="text-2xl font-bold text-slate-800">Radio Button & Checkbox UI</h1>
          <div className="gird grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-slate-500 ">Radio Buttons</h3>
              <div className=" flex flex-wrap items-center gap-6">
                <RadioButton
                  name="demo-audio"
                  label="Default"
                  value="option1"
                  checked={selectedRadio === "option1"}
                  onChange={(e) => setSelectRadio(e.target.value)}
                />
                <RadioButton
                  name="demo-radio"
                  label="Error State"
                  value="option2"
                  error
                  checked={selectedRadio === "option2"}
                  onChange={(e) => setSelectRadio(e.target.value)}
                />
                <RadioButton
                  name="demo-radio"
                  label="Active State"
                  value="option3"
                  checked={selectedRadio === "option3"}
                  onChange={(e) => setSelectRadio(e.target.value)}
                />
                <RadioButton
                  name="demo-radio"
                  label="Disabled"
                  value="option4"
                  disabled
                />
              </div>
            </div>

          {/* Demo Checkboxes */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-500 ">Checkboxes</h3>
            <div className="flex flex-wrap items-center gap-6">
              <Checkbox
                label="Checked Default"
                defaultChecked
              />
              <Checkbox
                label="Disabled State"
                disabled
              />
            </div>
          </div>
          </div>
        </section>

        <section className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h1 className="text-2xl font-bold text-slate-800">Empty State UI</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-slate-100 pt-6">
            {/* State 1: Cart Empty */}
                  <div className="p-4 border border-slate-100 rounded-xl bg-slate-50">
                    <EmptyState
                      icon={<EmptyCartIllustration className="w-40 h-40" />}
                      title="Your cart is empty"
                      description="Please search for the product first"
                      actionLabel="Search Product"
                      onAction={() => alert('Mencari produk...')}
                      />
                  </div>

      {/* State 2: Product Not Found */}
          <div className="p-4 border border-slate-100 rounded-xl bg-slate-50">
      <       EmptyState
                icon={<EmptySearchIllustration className="w-40 h-40" />}
                title="Product Not Found"
                description="Change Your Keywords"
              />
          </div>
      </div>
    </section>


     {/* SECTION LOGO */}
    <section className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
      <h1 className="text-2xl font-bold text-slate-800">Logo UI</h1>
  
      <div className="flex items-center gap-8 p-4 bg-slate-50 rounded-xl border border-slate-200">
      {/* Logo Lengkap (Icon + Text) */}
      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold text-slate-400 uppercase">Logo + Text</span>
      <Logo />
      </div>

      {/* Logo Icon Saja */}
      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold text-slate-400 uppercase">Icon Only</span>
      <Logo showText={false} />
    </div>
  </div>
    </section>

    <section className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Product Card UI</h1>
        <div className="flex flex-wrap items-start gap-8 bg-slate-50 p-6 rounded-xl border border-slate-200">
    {/* Varian Default (Ukuran Standar) */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-slate-400 uppercase">Default Size</span>
          <ProductCard product={dummyProduct} />
        </div>
    {/* Varian Compact (Ukuran Kecil) */}
    <div className="space-y-2">
      <span className="text-xs font-semibold text-slate-400 uppercase">Compact Size</span>
      <ProductCard product={dummyProduct} variant="compact" />
    </div>
  </div>
  </section>  


    {/* SECTION CART LIST */}
        <section className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h1 className="text-2xl font-bold text-slate-800">Cart List UI</h1>

          {cartList.length > 0 ? (
            <div className="space-y-4">
              {cartList.map((item, idx) => (
                <CartItem
                  key={item.product.id}
                  item={item}
                  onSelectChange={(selected) => handleSelectChange(idx, selected)}
                  onQuantityChange={(qty) => handleQuantityChange(idx, qty)}
                  onRemove={() => handleRemove(idx)}
                />
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-400 italic">Keranjang kosong (Semua item dihapus)</p>
          )}
        </section>
      </div>
    </div>
  );
}