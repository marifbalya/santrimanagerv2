
import React, { useState } from 'react';
import { Transaction, ServerCode, CreditCode, PurchaseOption } from '../types';
import Card from './common/Card';
import Button from './common/Button';

interface HistoryLogProps {
  transactions: Transaction[];
  serverCodes: ServerCode[];
  creditCodes: CreditCode[];
  purchaseOptions: PurchaseOption[];
}

// Icons
const ClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>;
const ServerStackIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>;
const ClipboardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" /></svg>;
const CubeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /></svg>;


const ITEMS_PER_PAGE = 10;

const HistoryLog: React.FC<HistoryLogProps> = ({ 
  transactions, 
  serverCodes, 
  creditCodes, 
  purchaseOptions 
}) => {
  const [currentTransactionPage, setCurrentTransactionPage] = useState(1);
  const [currentServerCodePage, setCurrentServerCodePage] = useState(1);

  const totalTransactionPages = Math.ceil(transactions.length / ITEMS_PER_PAGE);
  const paginatedTransactions = transactions.slice(
    (currentTransactionPage - 1) * ITEMS_PER_PAGE,
    currentTransactionPage * ITEMS_PER_PAGE
  );

  const sortedServerCodes = [...serverCodes].sort((a, b) => b.timesUsed - a.timesUsed);
  const totalServerCodePages = Math.ceil(sortedServerCodes.length / ITEMS_PER_PAGE);
  const paginatedServerCodes = sortedServerCodes.slice(
    (currentServerCodePage - 1) * ITEMS_PER_PAGE,
    currentServerCodePage * ITEMS_PER_PAGE
  );

  const handleCopyMessage = (message: string) => {
    navigator.clipboard.writeText(message).then(() => {
      alert('Pesan berhasil disalin ke clipboard!');
    }).catch(err => console.error('Gagal menyalin: ', err));
  };

  const creditCodeStockDisplay = purchaseOptions
    .map(opt => {
      const count = creditCodes.filter(cc => cc.value === opt.value).length;
      return { ...opt, count };
    })
    .filter(stockItem => stockItem.count > 0);
  
  const totalStockCount = creditCodes.length;

  return (
    <div className="space-y-6 sm:space-y-8">
      <Card title="Stok Kode Kredit Tersedia" icon={<CubeIcon />}>
        {creditCodeStockDisplay.length > 0 ? (
           <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
             {creditCodeStockDisplay.map(stock => (
               <li key={stock.value} className="bg-slate-700 p-3 rounded-lg shadow text-center sm:text-left">
                 <p className="text-xs xxs:text-sm text-slate-300 truncate">{stock.label}</p>
                 <p className="text-xl sm:text-2xl font-bold text-indigo-400">{stock.count}</p>
                 <p className="text-xxs sm:text-xs text-slate-400">Tersedia</p>
               </li>
             ))}
           </ul>
        ) : (
          <p className="text-slate-400 text-center py-4">Tidak ada kode kredit dalam stok atau semua denominasi memiliki stok nol.</p>
        )}
         <p className="text-slate-100 mt-6 text-sm sm:text-base font-semibold">
            Total Kode Kredit Unik dalam Stok: <span className="font-bold text-xl text-indigo-300">{totalStockCount}</span>
         </p>
      </Card>

      <Card title="Penggunaan Kode Server" icon={<ServerStackIcon />}>
        {serverCodes.length === 0 ? (
          <p className="text-slate-400 text-center py-4">Belum ada kode server ditambahkan.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-700">
              <thead className="bg-slate-700/50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Kode Server</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Digunakan</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Ditambahkan Pada</th>
                </tr>
              </thead>
              <tbody className="bg-slate-800 divide-y divide-slate-700">
                {paginatedServerCodes.map((sc) => (
                  <tr key={sc.id} className="hover:bg-slate-700/70 transition-colors duration-150">
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-300 truncate max-w-md">{sc.id}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-indigo-400 font-semibold">{sc.timesUsed} kali</td>
                     <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-400">{new Date(sc.addedAt).toLocaleDateString('id-ID')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {totalServerCodePages > 1 && (
              <div className="mt-4 flex justify-between items-center">
                <Button onClick={() => setCurrentServerCodePage(p => Math.max(1, p - 1))} disabled={currentServerCodePage === 1} variant="secondary">Sebelumnya</Button>
                <span className="text-sm text-slate-400">Halaman {currentServerCodePage} dari {totalServerCodePages}</span>
                <Button onClick={() => setCurrentServerCodePage(p => Math.min(totalServerCodePages, p + 1))} disabled={currentServerCodePage === totalServerCodePages} variant="secondary">Berikutnya</Button>
              </div>
            )}
          </div>
        )}
      </Card>

      <Card title="Riwayat Transaksi" icon={<ClockIcon />}>
        {transactions.length === 0 ? (
          <p className="text-slate-400 text-center py-4">Belum ada transaksi.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-700">
              <thead className="bg-slate-700/50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Tanggal</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Item Utama (Jml Total Token)</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Total Nilai</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Kode Pembelian</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Kode Kredit (Jml)</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Kode Server</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-slate-800 divide-y divide-slate-700">
                {paginatedTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-700/70 transition-colors duration-150">
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-300">{new Date(tx.timestamp).toLocaleString('id-ID')}</td>
                    {/* tx.amount shows value of first item type, tx.quantity is total tokens */}
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-300">
                      Kredit {tx.amount.toLocaleString('id-ID')} ({tx.purchaseCodes[0]}) - Total {tx.quantity} token
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-indigo-300 font-semibold">Kredit {tx.totalValue.toLocaleString('id-ID')}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-300 truncate max-w-xs" title={tx.purchaseCodes.join(', ')}>
                      {tx.purchaseCodes.join(', ')}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-400 truncate max-w-xs" title={tx.creditCodesUsed.join(', ')}>
                      {tx.creditCodesUsed.length} kode (contoh: {tx.creditCodesUsed[0]?.substring(0,10)}...)
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-400 truncate max-w-xs">{tx.serverCodeUsed}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                       <Button size="sm" variant="secondary" onClick={() => handleCopyMessage(tx.formattedMessage)} leftIcon={<ClipboardIcon/>}>
                         Salin Pesan
                       </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {totalTransactionPages > 1 && (
              <div className="mt-4 flex justify-between items-center">
                <Button onClick={() => setCurrentTransactionPage(p => Math.max(1, p - 1))} disabled={currentTransactionPage === 1} variant="secondary">Sebelumnya</Button>
                <span className="text-sm text-slate-400">Halaman {currentTransactionPage} dari {totalTransactionPages}</span>
                <Button onClick={() => setCurrentTransactionPage(p => Math.min(totalTransactionPages, p + 1))} disabled={currentTransactionPage === totalTransactionPages} variant="secondary">Berikutnya</Button>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default HistoryLog;
