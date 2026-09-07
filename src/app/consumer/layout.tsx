'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { useI18n } from '@/context/I18nContext';
import { LowBandwidthToggle } from '@/components/common/LowBandwidthToggle';
import {
  LayoutDashboard,
  Store,
  ShoppingCart,
  PackageCheck,
  Truck,
  Menu,
  X,
  Sun,
  Moon,
  LogOut,
  User,
  Settings,
  Languages,
  ChevronDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { consumerService } from '@/services/consumerService';

export default function ConsumerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useI18n();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    consumerService.getCart().then((items) => {
      setCartCount(items.reduce((acc, c) => acc + (c.quantityKg > 0 ? 1 : 0), 0));
    });
  }, [pathname]);

  const navItems = [
    { label: 'Dashboard', href: '/consumer/dashboard', icon: LayoutDashboard },
    { label: 'Marketplace', href: '/consumer/marketplace', icon: Store },
    { label: 'Cart', href: '/consumer/cart', icon: ShoppingCart, badge: cartCount },
    { label: 'Orders', href: '/consumer/orders', icon: PackageCheck },
    { label: 'Tracking', href: '/consumer/tracking/TRK-RD-9021', icon: Truck },
  ];

  // Route protection
  const publicRoutes = ['/consumer', '/consumer/login', '/consumer/register'];
  const isPublicRoute = publicRoutes.includes(pathname);

  if (isPublicRoute) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      
      {/* Top Demo Bar - Exact match to Farmer top bar */}
      <div className="bg-blue-950 text-blue-100 text-[11px] font-semibold py-1.5 px-4 flex items-center justify-between border-b border-blue-900">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          <span>AgriFlow AI • Dedicated Consumer & Bulk Buyer Hub</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" className="hover:text-white flex items-center gap-1 font-bold text-xs">
            Ecosystem Gateway
          </Link>
          <Link href="/farmer" className="hover:text-white text-emerald-300 font-bold text-xs">
            🌾 Farmer Portal
          </Link>
          <Link href="/logistics" className="hover:text-white text-amber-300 font-bold text-xs">
            🚚 Logistics Portal
          </Link>
          <LowBandwidthToggle />
          <button
            onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
            className="hover:text-white flex items-center gap-1 font-bold text-xs"
          >
            <Languages className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'हिन्दी' : 'English'}</span>
          </button>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/consumer/dashboard" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-lg shadow-md shadow-blue-600/30">
              🛒
            </div>
            <div>
              <span className="font-extrabold text-lg text-slate-900 dark:text-white tracking-tight">AgriFlow <span className="text-blue-500">Buyer</span></span>
              <span className="text-[10px] block font-medium text-slate-400">Direct Farm Gate Procurement</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href.startsWith('/consumer/tracking') && pathname.startsWith('/consumer/tracking'));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 relative',
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30 shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  )}
                >
                  <Icon className={cn('w-4 h-4', isActive ? 'text-blue-500' : 'text-slate-400')} />
                  <span>{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center font-bold">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Header Utilities & Profile Menu */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title="Toggle Light/Dark Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-500 border border-blue-500/30 flex items-center justify-center font-bold text-xs">
                  B
                </div>
                <div className="text-left hidden md:block">
                  <span className="text-xs font-bold block text-slate-800 dark:text-slate-200 truncate max-w-[110px]">Buyer Account</span>
                  <span className="text-[10px] text-slate-400 block truncate max-w-[110px]">Commercial Hub</span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 text-xs">
                    <span className="font-bold text-slate-900 dark:text-white block truncate">Authenticated Buyer</span>
                  </div>
                  <Link
                    href="/consumer/marketplace"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  >
                    <Store className="w-4 h-4" />
                    <span>Marketplace</span>
                  </Link>
                  <Link
                    href="/consumer/orders"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  >
                    <PackageCheck className="w-4 h-4" />
                    <span>My Orders</span>
                  </Link>
                  <div className="border-t border-slate-100 dark:border-slate-800 my-1" />
                  <button
                    onClick={() => { setProfileDropdownOpen(false); router.push('/consumer'); }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href.startsWith('/consumer/tracking') && pathname.startsWith('/consumer/tracking'));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition relative',
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-500/30'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  )}
                >
                  <Icon className={cn('w-5 h-5', isActive ? 'text-blue-500' : 'text-slate-400')} />
                  <span>{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center font-bold ml-auto">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
            <div className="border-t border-slate-200 dark:border-slate-800 pt-3 mt-3 space-y-1">
              <button
                onClick={() => { setMobileMenuOpen(false); router.push('/consumer'); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-rose-600"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Page Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900 py-6 text-center text-xs text-slate-500 dark:text-slate-400">
        <p>© 2026 AgriFlow AI — Dedicated Consumer & Bulk Buyer Hub • Direct Farm-Gate Procurement • Verified Traceability</p>
      </footer>
    </div>
  );
}