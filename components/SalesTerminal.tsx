
import React, { useState, useEffect, useMemo } from 'react';
import { PurchaseOption, CreditCode, ServerCode, CartItem, ProcessedSaleOutput } from '../types';
import Button from './common/Button';
import Select from './common/Select';
import Input from './common/Input';
import Card from './common/Card';
import Textarea from './common/Textarea';
// CodeManagement import removed

// General Icon Props
interface IconProps {
  className?: string;
}

// Icons
const ShoppingBagIcon: React.FC<IconProps> = ({ className: propClassName }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${propClassName || ''}`}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
    </svg>
);

const ClipboardIcon: React.FC<IconProps> = ({ className: propClassName }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-5 h-5 ${propClassName || ''}`}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
    </svg>
);

const PlusCircleIcon: React.FC<IconProps> = ({ className: propClassName }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-5 h-5 ${propClassName || ''}`}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);

const TrashIcon: React.FC<IconProps> = ({ className: propClassName }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-5 h-5 ${propClassName || ''}`}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12.56 0c1.153 0 2.243.09 3.29.255m-3.29-.255A9.76 9.76 0 0 1 9 4.065m0 0a9.76 9.76 0 0 1 6 0m-6 0a9.75 9.75 0 0 0-6 0m6 0a9.75 9.75 0 0 1 6 0m0 0v1.5c0 .621-.504 1.125-1.125 1.125H9.125C8.504 7.5 8 6.979 8 6.25V5.79m14.456 0H4.772" />
    </svg>
);

const CheckBadgeIcon: React.FC<IconProps> = ({ className: propClassName }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-5 h-5 ${propClassName || ''}`}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
    </svg>
);

const DocumentDuplicateIcon: React.FC<IconProps> = ({ className: propClassName }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    className={`w-5 h-5 ${propClassName || ''}`}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
  </svg>
);

const InformationCircleIcon: React.FC<IconProps> = ({ className: propClassName }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${propClassName || ''}`}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
    </svg>
);
// CogIcon removed as it was for toggling CodeManagement

interface SalesTerminalProps {
  purchaseOptions: PurchaseOption[];
  processCartSale: (cartItems: CartItem[]) => ProcessedSaleOutput;
  creditCodes: CreditCode[];
  serverCodes: ServerCode[];
  // Props for CodeManagement are removed
}

const SalesTerminal: React.FC<SalesTerminalProps> = ({ 
    purchaseOptions, 
    processCartSale, 
    creditCodes, 
    serverCodes,
}) => {
  const [selectedCreditTypeValue, setSelectedCreditTypeValue] = useState<string>('');
  const [selectedQuantity, setSelectedQuantity] = useState<string>("1");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  const [processedSaleOutput, setProcessedSaleOutput] = useState<ProcessedSaleOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorState, setErrorState] = useState<string | null>(null);
  // showCodeManagement state removed

  const stockMap = useMemo(() => {
    const map = new Map<number, number>();
    creditCodes.forEach(cc => {
      map.set(cc.value, (map.get(cc.value) || 0) + 1);
    });
    return map;
  }, [creditCodes]);

  const selectOptionsForDropdown = purchaseOptions.map(opt => {
    const stock = stockMap.get(opt.value) || 0;
    return { 
      value: opt.value.toString(),
      label: `${opt.label} (Stok: ${stock})`,
      disabled: stock === 0, 
    };
  }).filter(opt => (stockMap.get(parseInt(opt.value, 10)) || 0) > 0);


  useEffect(() => {
    if (selectOptionsForDropdown.length > 0 && !selectedCreditTypeValue) {
        setSelectedCreditTypeValue(selectOptionsForDropdown[0].value);
    } else if (selectOptionsForDropdown.length === 0 && selectedCreditTypeValue !== '') {
        setSelectedCreditTypeValue(''); // Clear selection if no options available
    }
  }, [selectOptionsForDropdown, selectedCreditTypeValue]);


  const handleAddItemToCart = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorState(null);
    setProcessedSaleOutput(null);

    if (!selectedCreditTypeValue) {
      setErrorState("Harap pilih tipe kredit.");
      return;
    }
    const numQuantity = parseInt(selectedQuantity, 10);
    if (isNaN(numQuantity) || numQuantity <= 0) {
      setErrorState("Harap masukkan jumlah yang valid.");
      return;
    }
    
    const selectedOption = purchaseOptions.find(opt => opt.value.toString() === selectedCreditTypeValue);
    if (!selectedOption) {
      setErrorState("Tipe kredit yang dipilih tidak valid.");
      return;
    }

    const currentStock = stockMap.get(selectedOption.value) || 0;
    const quantityInCart = cartItems
        .filter(item => item.purchaseOption.value === selectedOption.value)
        .reduce((sum, item) => sum + item.quantity, 0);

    if (numQuantity > (currentStock - quantityInCart)) {
        setErrorState(`Stok tidak mencukupi untuk ${selectedOption.label}. Tersedia (setelah dikurangi keranjang): ${currentStock - quantityInCart}, Diminta: ${numQuantity}.`);
        return;
    }

    const newCartItem: CartItem = {
      id: `cartItem-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      purchaseOption: selectedOption,
      quantity: numQuantity,
    };
    setCartItems(prev => [...prev, newCartItem]);
    setSelectedQuantity("1"); // Reset quantity input
  };

  const handleRemoveCartItem = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
    setProcessedSaleOutput(null); 
  };

  const handleProcessSale = async () => {
    setErrorState(null);
    setProcessedSaleOutput(null);
    if (cartItems.length === 0) {
      setErrorState("Keranjang penjualan kosong. Tambahkan item terlebih dahulu.");
      return;
    }
    if (serverCodes.length === 0) {
      setErrorState("Tidak ada kode server tersedia. Harap tambahkan kode server di menu 'Input Kode'.");
      return;
    }

    setIsLoading(true);
    const result = processCartSale(cartItems);
    setIsLoading(false);

    if (result.error) {
      setErrorState(result.error);
    } else {
      setProcessedSaleOutput(result);
      setCartItems([]); 
      alert(`Penjualan berhasil diproses! ID Transaksi: ${result.transactionId}`);
    }
  };

  const handleCopyToClipboard = (content: string, title: string) => {
    navigator.clipboard.writeText(content)
      .then(() => alert(`${title} berhasil disalin!`))
      .catch(err => alert(`Gagal menyalin ${title}: ` + err));
  };
  
  const totalCartValue = cartItems.reduce((sum, item) => sum + (item.purchaseOption.value * item.quantity), 0);

  const isAddToCartDisabled = isLoading || !selectedCreditTypeValue || (parseInt(selectedQuantity,10) || 0) <= 0 || selectOptionsForDropdown.length === 0;
  const isProcessSaleDisabled = isLoading || cartItems.length === 0 || serverCodes.length === 0;

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Sales processing and cart UI */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Tambah Item ke Penjualan" icon={<ShoppingBagIcon />}>
          <form onSubmit={handleAddItemToCart} className="space-y-4">
            <Select
              label="Pilih Tipe Kredit"
              id="creditType"
              value={selectedCreditTypeValue}
              onChange={(e) => setSelectedCreditTypeValue(e.target.value)}
              options={selectOptionsForDropdown}
              placeholder={selectOptionsForDropdown.length === 0 ? "Tidak ada item dalam stok" : "Pilih tipe..."}
              required
              disabled={isLoading || selectOptionsForDropdown.length === 0}
            />
            <Input
              label="Jumlah"
              id="itemQuantity"
              type="number"
              value={selectedQuantity}
              onChange={(e) => setSelectedQuantity(e.target.value)}
              min="1"
              placeholder="contoh: 1"
              required
              disabled={isLoading || !selectedCreditTypeValue || selectOptionsForDropdown.length === 0}
            />
            <Button 
              type="submit" 
              variant="primary" 
              className="w-full" 
              isLoading={isLoading}
              disabled={isAddToCartDisabled}
              leftIcon={<PlusCircleIcon />}
            >
              Tambah ke Penjualan
            </Button>
            {errorState && !processedSaleOutput && !isLoading && ( 
                <p className="text-sm text-red-400 text-center mt-3 p-2 bg-red-900/30 rounded">{errorState}</p>
            )}
          </form>
        </Card>

        <Card title="Rincian Penjualan Saat Ini" icon={<ShoppingBagIcon />}>
          {cartItems.length === 0 ? (
            <p className="text-slate-400 text-center py-4">Keranjang penjualan kosong.</p>
          ) : (
            <div className="space-y-3">
              <ul className="space-y-2 max-h-60 overflow-y-auto pr-2">
                {cartItems.map(item => (
                  <li key={item.id} className="flex justify-between items-center bg-slate-700 p-2 rounded">
                    <div>
                      <span className="text-slate-200">{item.purchaseOption.label}</span>
                      <span className="text-xs text-slate-400 ml-2">x {item.quantity}</span>
                    </div>
                    <Button variant="danger" size="sm" onClick={() => handleRemoveCartItem(item.id)} aria-label={`Hapus ${item.purchaseOption.label}`}>
                      <TrashIcon />
                    </Button>
                  </li>
                ))}
              </ul>
              <div className="border-t border-slate-700 pt-3 mt-3">
                <p className="text-lg font-semibold text-slate-100">
                  Total Nilai Keranjang: <span className="text-indigo-400">Kredit {totalCartValue.toLocaleString('id-ID')}</span>
                </p>
              </div>
            </div>
          )}
          <Button 
            onClick={handleProcessSale}
            variant="success" 
            size="lg" 
            className="w-full mt-6" 
            isLoading={isLoading}
            disabled={isProcessSaleDisabled}
            leftIcon={<CheckBadgeIcon />}
          >
            {isLoading ? 'Memproses...' : 'Proses Penjualan Ini'}
          </Button>
          {serverCodes.length === 0 && cartItems.length > 0 && !isLoading && (
              <p className="text-xs text-yellow-400 text-center mt-2">
                  Tombol proses nonaktif karena tidak ada kode server. Silakan tambah di menu 'Input Kode'.
              </p>
          )}
           {errorState && !processedSaleOutput && !isLoading && (
                <p className="text-sm text-red-400 text-center mt-3 p-2 bg-red-900/30 rounded">{errorState}</p>
            )}
        </Card>
      </div>

      {/* Processed Sale Output */}
      {processedSaleOutput && !processedSaleOutput.error && (
        <Card title={`Rincian Pesan Terkirim (ID Transaksi: ${processedSaleOutput.transactionId})`} className="fade-in mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {processedSaleOutput.customerMessages.map((msg, index) => (
                    <div key={`customer-msg-${index}`} className="bg-slate-700 p-3 rounded-md shadow">
                        <h4 className="font-medium text-slate-300 mb-2 flex items-center">
                            <DocumentDuplicateIcon className="mr-2" /> Pesan untuk Pelanggan #{index + 1}
                        </h4>
                        <Textarea
                            value={msg}
                            readOnly
                            rows={10} 
                            className="text-xs w-full font-mono bg-slate-600 focus:ring-0 focus:border-slate-600"
                        />
                        <Button 
                            onClick={() => handleCopyToClipboard(msg, `Pesan Pelanggan #${index + 1}`)} 
                            size="sm" 
                            variant="secondary" 
                            className="mt-2 w-full no-print"
                            leftIcon={<ClipboardIcon />}
                        >
                            Salin Pesan #{index + 1}
                        </Button>
                    </div>
                ))}
            </div>
            
            {processedSaleOutput.staticInfoMessage && (
                <div className="border-t border-slate-700 pt-6 mt-6">
                     <h3 className="text-lg font-semibold text-slate-200 mb-2 flex items-center">
                        <InformationCircleIcon className="mr-2 text-indigo-400" /> Informasi Penting
                     </h3>
                     <Textarea
                        value={processedSaleOutput.staticInfoMessage}
                        readOnly
                        rows={10}
                        className="text-sm bg-slate-700 focus:ring-0 focus:border-slate-600 w-full"
                      />
                    <Button 
                        onClick={() => handleCopyToClipboard(processedSaleOutput.staticInfoMessage, 'Informasi Penting')} 
                        variant="primary" 
                        className="mt-3 w-full no-print"
                        leftIcon={<ClipboardIcon />}
                    >
                        Salin Informasi Penting
                    </Button>
                </div>
            )}
        </Card>
      )}
      
      {/* Stock Warning (if no items to select from) */}
      {selectOptionsForDropdown.length === 0 && cartItems.length === 0 && !isLoading && (
         <Card title="Peringatan Stok" className="mt-8">
            <p className="text-center text-yellow-400">
                Saat ini tidak ada kode kredit dalam stok untuk dijual. Harap tambahkan kode di menu 'Input Kode'.
            </p>
         </Card>
      )}

      {/* Code Management Section Toggle and Component REMOVED */}
      {/* 
      <div className="mt-8 border-t border-slate-700 pt-8">
        <div className="flex justify-center mb-6">
          <Button 
            variant="secondary" 
            onClick={() => setShowCodeManagement(!showCodeManagement)}
            leftIcon={<CogIcon />}
          >
            {showCodeManagement ? 'Sembunyikan Input Kode' : 'Tampilkan Input Kode'}
          </Button>
        </div>
        {showCodeManagement && (
          <CodeManagement
            serverCodes={serverCodes} // This prop would need to be passed from App.tsx
            addBulkCreditCodes={addBulkCreditCodes} // This prop would need to be passed from App.tsx
            addServerCodes={addServerCodes} // This prop would need to be passed from App.tsx
            purchaseOptions={purchaseOptions} // This prop would need to be passed from App.tsx
          />
        )}
      </div> 
      */}

    </div>
  );
};

export default SalesTerminal;
