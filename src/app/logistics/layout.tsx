'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Truck, Navigation, Activity, ArrowLeft, Sun, Moon, RotateCcw, MapPin, ShieldCheck, CheckCircle2, Menu, X, Languages, ChevronDown, LogOut } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useI18n } from '@/context/I18nContext';
import { LowBandwidthToggle } from '@/components/common/LowBandwidthToggle';
import { cn } from '@/lib/utils';

export default function LogisticsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useI18n();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const publicRoutes = ['/logistics', '/logistics/login'];
  const isPublic = publicRoutes.includes(pathname);

  if (isPublic) {
    return <>{children}</>;
  }

  const navItems = [
    { label: 'Fleet & Dispatch', href: '/logistics/dashboard', icon: Truck },
    { label: 'Active Trips', href: '/logistics/trips', icon: Navigation },
    { label: 'Cold-Chain Telemetry', href: '/logistics/telemetry', icon: Activity },
    { label: 'Return Load Matching', href: '/logistics/return-loads', icon: RotateCcw },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      
      {/* Top Demo Bar - Exact match to Farmer and Consumer top bar */}
      <div className="bg-amber-950 text-amber-100 text-[11px] font-semibold py-1.5 px-4 flex items-center justify-between border-b border-amber-900">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>AgriFlow AI • Dedicated Road Freight & Return Load Network</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" className="hover:text-white flex items-center gap-1 font-bold text-xs">
            Ecosystem Gateway
          </Link>
          <Link href="/farmer" className="hover:text-white text-emerald-300 font-bold text-xs">
            🌾 Farmer Portal
          </Link>
          <Link href="/consumer" className="hover:text-white text-blue-300 font-bold text-xs">
            🛒 Buyer Portal
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
          <Link href="/logistics/dashboard" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-black text-lg shadow-md shadow-amber-500/30">
              🚚
            </div>
            <div>
              <span className="font-extrabold text-lg text-slate-900 dark:text-white tracking-tight">AgriFlow <span className="text-amber-500">Logistics</span></span>
              <span className="text-[10px] block font-medium text-slate-400">Road Freight & Return Load AI</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2',
                    isActive
                      ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-500/30 shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  )}
                >
                  <Icon className={cn('w-4 h-4', isActive ? 'text-amber-500' : 'text-slate-400')} />
                  <span>{item.label}</span>
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
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-500 border border-amber-500/30 flex items-center justify-center font-bold text-xs">
                  L
                </div>
                <div className="text-left hidden md:block">
                  <span className="text-xs font-bold block text-slate-800 dark:text-slate-200 truncate max-w-[110px]">Deccan Reefer</span>
                  <span className="text-[10px] text-slate-400 block truncate max-w-[110px]">Hyderabad Depot</span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 text-xs">
                    <span className="font-bold text-slate-900 dark:text-white block truncate">Deccan Reefer Logistics</span>
                    <span className="text-[11px] text-slate-400 block truncate">fleet@deccanlogistics.in</span>
                  </div>
                  <Link
                    href="/logistics/trips"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Active Trips</span>
                  </Link>
                  <Link
                    href="/logistics/return-loads"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Return Load Matching</span>
                  </Link>
                  <div className="border-t border-slate-100 dark:border-slate-800 my-1" />
                  <button
                    onClick={() => { setProfileDropdownOpen(false); router.push('/logistics'); }}
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
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition',
                    isActive
                      ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-400/30'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  )}
                >
                  <Icon className={cn('w-5 h-5', isActive ? 'text-amber-500' : 'text-slate-400')} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            <div className="border-t border-slate-200 dark:border-slate-800 pt-3 mt-3 space-y-1">
              <button
                onClick={() => { setMobileMenuOpen(false); router.push('/logistics'); }}
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
        <p>© 2026 AgriFlow AI — Dedicated Road Freight & Return Load Network • Zero Empty Runs • Active Cold-Chain Telemetry</p>
      </footer>
    </div>
  );
}
