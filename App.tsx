
import React, { useState, useCallback } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import { AppView, CreditCode, ServerCode, Transaction, PurchaseOption, CartItem, ProcessedSaleOutput } from './types';
import { PURCHASE_OPTIONS, APP_LINK } from './constants';
import CodeManagement from './components/CodeManagement';
import SalesTerminal from './components/SalesTerminal';
import HistoryLog from './components/HistoryLog';
// import StockView from './components/StockView'; // Removed StockView

// Placeholder Icons for Tabs
const ShoppingCartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-0 sm:mr-2"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" /></svg>;
const ClockHistoryIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-0 sm:mr-2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>;
// const CubeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-0 sm:mr-2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /></svg>; // Removed CubeIcon
const InboxStackIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-0 sm:mr-2"><path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10.5 11.25h3M12 15h.008M17.25 7.5H6.75c.621 0 1.247.042 1.854.123a2.256 2.256 0 0 1 1.435.636L12 11.25l1.961-2.243a2.256 2.256 0 0 1 1.435-.636A25.903 25.903 0 0 1 17.25 7.5Z" /></svg>;

const STATIC_SALES_INFO = `Cara Setting & Pakai KreatorAi - Pembuat Gambar & Video Bebas Watermark

Bantu Like, Komen dan Subscribe Ya ☺💕

Link Aplikasi
${APP_LINK}

Cara Setting
https://youtu.be/0VDKo1FjtoE?si=QQmLPxye3NmZ1S9d

Fitur-fitur KreatorAI
https://youtu.be/Ix-kl4AvDgY?si=oMUVMqIGyY3h9gcH`;

interface ModuleTabButtonProps {
  view: AppView;
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const ModuleTabButton = ({
  view,
  label,
  icon,
  isActive,
  onClick,
}: ModuleTabButtonProps) => (
  <button
    onClick={onClick}
    role="tab"
    aria-selected={isActive}
    aria-controls={`panel-${view}`}
    id={`tab-${view}`}
    className={`tab-button flex-1 sm:flex-none flex items-center justify-center sm:justify-start text-xs xxs:text-sm sm:text-base px-2 py-2 sm:px-4 sm:py-3 font-medium rounded-md border-2
      ${isActive
        ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg'
        : 'bg-slate-700 text-slate-300 border-transparent hover:bg-slate-600 hover:text-indigo-300'
      }
      focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-150 ease-in-out`}
  >
    {icon}
    <span className="hidden sm:inline ml-2">{label}</span>
  </button>
);

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.SALES_TERMINAL);
  const [creditCodes, setCreditCodes] = useLocalStorage<CreditCode[]>('santriManager_creditCodes', []);
  const [serverCodes, setServerCodes] = useLocalStorage<ServerCode[]>('santriManager_serverCodes', []);
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>('santriManager_transactions', []);

  const addBulkCreditCodes = useCallback((codes: string[], value: number): { addedCount: number, duplicateCount: number, ignoredCount: number, message: string } => {
    let addedCount = 0;
    let duplicateCount = 0;
    let ignoredCount = 0;
    const codesToAdd: CreditCode[] = [];
    const existingCodeIds = new Set(creditCodes.map(cc => cc.id.toLowerCase()));

    const uniqueTrimmedCodes = Array.from(new Set(codes.map(c => c.trim())));

    for (const code of uniqueTrimmedCodes) {
      if (!code) {
        ignoredCount++;
        continue;
      }
      if (existingCodeIds.has(code.toLowerCase())) {
        duplicateCount++;
      } else {
        codesToAdd.push({ id: code, value, addedAt: Date.now() });
        existingCodeIds.add(code.toLowerCase());
        addedCount++;
      }
    }

    if (addedCount > 0) {
      setCreditCodes(prev => [...prev, ...codesToAdd].sort((a,b) => a.value - b.value || a.id.localeCompare(b.id)));
    }

    let message = `${addedCount} kode kredit baru untuk Kredit ${value.toLocaleString()} berhasil ditambahkan.`;
    if (duplicateCount > 0) message += ` ${duplicateCount} duplikat diabaikan.`;
    if (ignoredCount > 0) message += ` ${ignoredCount} kode kosong/tidak valid diabaikan.`;
    if (addedCount === 0 && duplicateCount === 0 && ignoredCount === 0 && codes.length > 0) message = "Tidak ada kode baru yang valid untuk ditambahkan.";
    else if (codes.length === 0) message = "Tidak ada kode yang dimasukkan.";

    return { addedCount, duplicateCount, ignoredCount, message };
  }, [creditCodes, setCreditCodes]);


  const addServerCodes = useCallback((newCodes: string[]): boolean => {
    let addedCount = 0;
    const uniqueNewCodes = Array.from(new Set(newCodes.map(c => c.trim()).filter(c => c)));

    setServerCodes(prev => {
      const existingCodeIds = new Set(prev.map(sc => sc.id.toLowerCase()));
      const codesToAdd: ServerCode[] = [];
      uniqueNewCodes.forEach(code => {
        if (!existingCodeIds.has(code.toLowerCase())) {
          codesToAdd.push({ id: code, timesUsed: 0, addedAt: Date.now() });
          addedCount++;
        }
      });

      if (addedCount === 0) {
        alert("Semua kode server yang dimasukkan sudah ada atau input kosong.");
        return prev;
      }
      alert(`${addedCount} kode server baru berhasil ditambahkan. ${uniqueNewCodes.length - addedCount} duplikat/kosong diabaikan.`);
      return [...prev, ...codesToAdd].sort((a,b) => a.id.localeCompare(b.id));
    });
    return addedCount > 0;
  }, [setServerCodes, serverCodes]);


  const processCartSale = useCallback((cartItems: CartItem[]): ProcessedSaleOutput => {
    if (cartItems.length === 0) {
      return { transactionId: '', customerMessages: [], staticInfoMessage: '', error: "Keranjang penjualan kosong." };
    }
    if (serverCodes.length === 0) {
      return { transactionId: '', customerMessages: [], staticInfoMessage: '', error: "Tidak ada kode server tersedia. Harap tambahkan kode server." };
    }

    let tempCreditCodes = [...creditCodes];
    const serverCodeToUse = serverCodes[Math.floor(Math.random() * serverCodes.length)];

    const finalCustomerMessages: string[] = [];
    const allCreditCodesUsedInTransaction: CreditCode[] = [];

    const groupedCartItems = new Map<number, { option: PurchaseOption, quantity: number, items: CartItem[] }>();
    for (const item of cartItems) {
      if (!groupedCartItems.has(item.purchaseOption.value)) {
        groupedCartItems.set(item.purchaseOption.value, { option: item.purchaseOption, quantity: 0, items: [] });
      }
      const group = groupedCartItems.get(item.purchaseOption.value)!;
      group.quantity += item.quantity;
      group.items.push(item);
    }

    let isFirstMessageGroup = true;

    for (const [value, groupData] of groupedCartItems) {
      const { option, quantity } = groupData;
      const availableForOption = tempCreditCodes.filter(cc => cc.value === option.value);

      if (availableForOption.length < quantity) {
        return {
          transactionId: '',
          customerMessages: [],
          staticInfoMessage: '',
          error: `Stok tidak mencukupi untuk ${option.label}. Tersedia: ${availableForOption.length}, Diminta: ${quantity}.`
        };
      }

      const selectedCodesForThisGroup = availableForOption.slice(0, quantity);
      allCreditCodesUsedInTransaction.push(...selectedCodesForThisGroup);

      const idsToRemoveFromTemp = new Set(selectedCodesForThisGroup.map(sc => sc.id));
      tempCreditCodes = tempCreditCodes.filter(tc => !idsToRemoveFromTemp.has(tc.id));

      let messageForGroup = `*Kode Kredit (${option.label})*\n\n`;
      messageForGroup += selectedCodesForThisGroup.map((codeObj, index) =>
        `*Kode ${index + 1}*\n${codeObj.id}`
      ).join('\n\n');

      messageForGroup += `\n\n*Kode Pembelian*\n${option.purchaseCode}\n\n`;

      if (isFirstMessageGroup) {
        messageForGroup += `*Kode Server*\n${serverCodeToUse.id}`;
        isFirstMessageGroup = false;
      } else {
        messageForGroup += `*Kode Server*\nSama Dengan Sebelumnya`;
      }
      finalCustomerMessages.push(messageForGroup);
    }

    const allUsedCreditCodeIds = new Set(allCreditCodesUsedInTransaction.map(cc => cc.id));
    setCreditCodes(prev => prev.filter(cc => !allUsedCreditCodeIds.has(cc.id)));

    setServerCodes(prev =>
      prev.map(sc =>
        sc.id === serverCodeToUse.id ? { ...sc, timesUsed: sc.timesUsed + 1 } : sc
      ).sort((a,b) => a.id.localeCompare(b.id))
    );

    const transactionId = `TXN-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const totalValue = cartItems.reduce((sum, item) => sum + (item.purchaseOption.value * item.quantity), 0);
    const totalQuantityOfTokens = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const distinctPurchaseCodesInvolved = Array.from(new Set(cartItems.map(item => item.purchaseOption.purchaseCode)));

    const newTransaction: Transaction = {
      id: transactionId,
      timestamp: Date.now(),
      amount: cartItems.length > 0 ? cartItems[0].purchaseOption.value : 0,
      quantity: totalQuantityOfTokens,
      totalValue: totalValue,
      purchaseCodes: distinctPurchaseCodesInvolved,
      creditCodesUsed: allCreditCodesUsedInTransaction.map(cc => cc.id),
      serverCodeUsed: serverCodeToUse.id,
      formattedMessage: finalCustomerMessages.join("\n\n==== BATAS PESAN ====\n\n"),
    };
    setTransactions(prev => [newTransaction, ...prev]);

    return {
      transactionId,
      customerMessages: finalCustomerMessages,
      staticInfoMessage: STATIC_SALES_INFO,
    };
  }, [creditCodes, serverCodes, setCreditCodes, setServerCodes, setTransactions]);

  const renderView = () => {
    switch (currentView) {
      case AppView.SALES_TERMINAL:
        return <SalesTerminal
                  purchaseOptions={PURCHASE_OPTIONS}
                  processCartSale={processCartSale}
                  creditCodes={creditCodes}
                  serverCodes={serverCodes}
                />;
      case AppView.MANAGE_CODES:
        return <CodeManagement
                  serverCodes={serverCodes}
                  addBulkCreditCodes={addBulkCreditCodes}
                  addServerCodes={addServerCodes}
                  purchaseOptions={PURCHASE_OPTIONS}
                />;
      case AppView.HISTORY:
        return <HistoryLog 
                  transactions={transactions} 
                  serverCodes={serverCodes} 
                  creditCodes={creditCodes}
                  purchaseOptions={PURCHASE_OPTIONS}
                />;
      // Case for AppView.STOCK_VIEW removed
      default:
        return <p className="text-center text-red-400">Error: Tampilan tidak dikenal.</p>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center p-2 xs:p-3 sm:p-4 md:p-6 selection:bg-indigo-500 selection:text-white">
      <header className="app-header w-full max-w-5xl mb-4 sm:mb-6">
        <div className="flex flex-col items-center py-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 mb-1 sm:mb-2 text-center">
              SantriManager
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 text-center px-2">
              Kelola inventaris token game/AI Anda dan transaksi penjualan secara efisien. Semua data disimpan secara lokal.
            </p>
        </div>

        <nav className="app-nav mt-2 sm:mt-4" role="tablist" aria-label="Tampilan Aplikasi">
          <div className="flex justify-center space-x-1 xxs:space-x-2 bg-slate-800 p-1 sm:p-1.5 rounded-lg shadow-md max-w-md mx-auto">
            <ModuleTabButton
              view={AppView.SALES_TERMINAL}
              label="Penjualan"
              icon={<ShoppingCartIcon />}
              isActive={currentView === AppView.SALES_TERMINAL}
              onClick={() => setCurrentView(AppView.SALES_TERMINAL)}
            />
            <ModuleTabButton
              view={AppView.MANAGE_CODES}
              label="Input Kode"
              icon={<InboxStackIcon />}
              isActive={currentView === AppView.MANAGE_CODES}
              onClick={() => setCurrentView(AppView.MANAGE_CODES)}
            />
             {/* ModuleTabButton for STOCK_VIEW removed */}
            <ModuleTabButton
              view={AppView.HISTORY}
              label="Riwayat"
              icon={<ClockHistoryIcon />}
              isActive={currentView === AppView.HISTORY}
              onClick={() => setCurrentView(AppView.HISTORY)}
            />
          </div>
        </nav>
      </header>

      <main id={`panel-${currentView}`} role="tabpanel" aria-labelledby={`tab-${currentView}`} className="app-main-content w-full max-w-5xl flex-grow">
        <div className="bg-slate-800 p-3 sm:p-4 md:p-6 rounded-xl shadow-2xl">
         {renderView()}
        </div>
      </main>

      <footer className="app-footer w-full max-w-5xl mt-6 sm:mt-8 text-center pb-4">
        <p className="text-xs text-slate-500">&copy; {new Date().getFullYear()} SantriManager.
          <a href="https://kreatorai.netlify.app/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 underline ml-1">
            KreatorAI
          </a>
        </p>
      </footer>
    </div>
  );
};

export default App;
