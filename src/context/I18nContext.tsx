'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
type Language = 'en' | 'hi';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    dashboard: 'Dashboard',
    marketplace: 'Marketplace',
    cart: 'Cart',
    orders: 'Orders',
    tracking: 'Tracking',
    profile: 'Profile',
    settings: 'Settings',
    logout: 'Logout',
    login: 'Login',
    register: 'Register',
    myProduce: 'My Produce',
    mandiPrices: 'Mandi Prices',
    demandMap: 'Demand Map',
    aiRecommendations: 'AI Recommendations',
    ordersAndDelivery: 'Orders & Delivery',
    addProduce: '+ Add Produce',
    todaysOpportunities: "Today's Opportunities",
    marketSnapshot: 'Market Snapshot',
    bestTimeToSell: 'Best Time to Sell',
    groupSelling: 'Group Selling / Produce Pooling',
    roadLogistics: 'Road Logistics',
    viewTracking: 'View Tracking',
    browseMarketplace: 'Browse Marketplace',
    knowYourFarmer: 'Know Your Farmer',
    priceTransparency: 'Price Transparency',
    impactReceipt: 'Impact Receipt',
    coldChainTelemetry: 'Cold-Chain Telemetry',
    freshness: 'Harvest Freshness',
    farmerReceives: 'Farmer Receives',
    consumerPrice: 'Consumer Price',
    roadLogisticsFee: 'Road Logistics',
    platformFee: 'Platform Fee',
    bulkDemand: 'Create Bulk Demand',
    multiFarmerFulfillment: 'Multi-Farmer Fulfillment',
    viewDetails: 'View Details',
    addToCart: 'Add to Cart',
    checkout: 'Proceed to Checkout',
    activeDeliveries: 'Active Deliveries',
    recommendedForYou: 'AI Recommended Produce',
    lowBandwidth: 'Low Bandwidth',
    perishableRisk: 'Perishable Risk',
    returnLoad: 'Return Load Matching',
    farmerBenefit: 'Farmer Impact & Realization',
    conventional: 'Conventional Mandi',
    agriflowRealization: 'AgriFlow Direct Realization',
  },
  hi: {
    dashboard: 'डैशबोर्ड (Dashboard)',
    marketplace: 'मंडी बाजार (Marketplace)',
    cart: 'टोकरी (Cart)',
    orders: 'ऑर्डर (Orders)',
    tracking: 'लाइव ट्रैकिंग (Tracking)',
    profile: 'प्रोफाइल (Profile)',
    settings: 'सेटिंग्स (Settings)',
    logout: 'लॉग आउट (Logout)',
    login: 'लॉग इन (Login)',
    register: 'पंजीकरण (Register)',
    myProduce: 'मेरी उपज (My Produce)',
    mandiPrices: 'मंडी भाव (Mandi Prices)',
    demandMap: 'मांग नक्शा (Demand Map)',
    aiRecommendations: 'एआई सिफारिशें (AI Recommendations)',
    ordersAndDelivery: 'ऑर्डर और डिलीवरी',
    addProduce: '+ उपज जोड़ें',
    todaysOpportunities: 'आज के अवसर',
    marketSnapshot: 'बाजार भाव विवरण',
    bestTimeToSell: 'बेचने का सही समय',
    groupSelling: 'समूह बिक्री / उपज पूलिंग',
    roadLogistics: 'सड़क परिवहन लॉजिस्टिक्स',
    viewTracking: 'ट्रैकिंग देखें',
    browseMarketplace: 'उत्पाद देखें (Marketplace)',
    knowYourFarmer: 'किसान को जानें (Know Your Farmer)',
    priceTransparency: 'मूल्य पारदर्शिता (Price Breakdown)',
    impactReceipt: 'खरीद प्रभाव रसीद (Impact Receipt)',
    coldChainTelemetry: 'कोल्ड-चेन तापमान (Cold-Chain)',
    freshness: 'कटाई की ताजगी (Freshness)',
    farmerReceives: 'किसान को मिला',
    consumerPrice: 'उपभोक्ता मूल्य',
    roadLogisticsFee: 'सड़क परिवहन भाड़ा',
    platformFee: 'प्लेटफॉर्म शुल्क',
    bulkDemand: 'थोक मांग दर्ज करें (Bulk Demand)',
    multiFarmerFulfillment: 'बहु-किसान समेकन',
    viewDetails: 'विवरण देखें',
    addToCart: 'कार्ट में जोड़ें (Add to Cart)',
    checkout: 'भुगतान करें (Checkout)',
    activeDeliveries: 'सक्रिय डिलीवरी',
    recommendedForYou: 'एआई अनुशंसित उपज',
    lowBandwidth: 'कम बैंडविड्थ मोड',
    perishableRisk: 'खराब होने का जोखिम',
    returnLoad: 'वापसी भाड़ा मैचिंग',
    farmerBenefit: 'किसान लाभ व आमदनी',
    conventional: 'पारंपरिक मंडी भाव',
    agriflowRealization: 'एग्रीफ्लो सीधी आमदनी',
  },
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('agriflow_lang') as Language;
    if (saved === 'en' || saved === 'hi') setLanguageState(saved);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('agriflow_lang', lang);
  };

  const t = (key: string): string => {
    const currentMap = translations[language] || translations['en'];
    return (currentMap as Record<string, string>)[key] || (translations['en'] as Record<string, string>)[key] || key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used within an I18nProvider');
  return context;
}
