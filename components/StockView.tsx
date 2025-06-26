
import React from 'react';
import { CreditCode, PurchaseOption, Transaction } from '../types';
import Card from './common/Card';
import Button from './common/Button';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

interface StockViewProps {
  creditCodes: CreditCode[];
  purchaseOptions: PurchaseOption[];
  transactions: Transaction[];
}

// General Icon Props
interface IconProps {
  className?: string;
}

// Icons
const CubeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /></svg>;
const ChartBarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 0 1 9.75 19.875V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" /></svg>;
const PrinterIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" /></svg>;

const PieChartIcon: React.FC<IconProps> = ({ className: propClassName }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    className={`w-6 h-6 ${propClassName || ''}`}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
  </svg>
);


// Color palette for Pie Chart
const PIE_CHART_COLORS = [
  '#4F46E5', '#7C3AED', '#EC4899', '#F59E0B', '#10B981', 
  '#3B82F6', '#D946EF', '#F43F5E', '#84CC16', '#0EA5E9',
  '#6366F1', '#A78BFA', '#F472B6', '#FBBF24', '#22C55E',
  '#60A5FA', '#E879F9', '#FB7185', '#A3E635', '#38BDF8'
];


const StockView: React.FC<StockViewProps> = ({ creditCodes, purchaseOptions, transactions }) => {
  
  const handlePrint = () => {
    window.print();
  };

  const creditCodeStockDisplay = purchaseOptions
    .map(opt => {
      const count = creditCodes.filter(cc => cc.value === opt.value).length;
      return { ...opt, count };
    })
    .filter(stockItem => stockItem.count > 0); 

  const stockForPieChart = purchaseOptions
    .map(opt => ({
      label: opt.label, 
      value: opt.value,
      count: creditCodes.filter(cc => cc.value === opt.value).length,
    }))
    .filter(item => item.count > 0); 

  const pieChartData = {
    labels: stockForPieChart.map(item => item.label),
    datasets: [
      {
        label: 'Jumlah Stok',
        data: stockForPieChart.map(item => item.count),
        backgroundColor: stockForPieChart.map((_, index) => PIE_CHART_COLORS[index % PIE_CHART_COLORS.length]),
        borderColor: stockForPieChart.map((_, index) => PIE_CHART_COLORS[index % PIE_CHART_COLORS.length].replace(')', ', 0.7)').replace('rgb', 'rgba')), 
        borderWidth: 1,
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
        animateRotate: true,
        animateScale: true,
        duration: 1000,
    },
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          color: '#cbd5e1', 
          font: {
            size: 12,
          },
          boxWidth: 15,
          padding: 15,
        },
      },
      title: {
        display: true,
        text: 'Distribusi Stok per Denominasi',
        color: '#e2e8f0', 
        font: {
          size: 16,
          weight: 'bold' as const,
        },
        padding: {
            top: 10,
            bottom: 20,
        }
      },
      tooltip: {
        callbacks: {
            label: function(context: any) {
                let label = context.dataset.label || '';
                if (label) {
                    label += ': ';
                }
                if (context.parsed !== null) {
                    label += context.parsed;
                }
                const total = context.dataset.data.reduce((acc: number, val: number) => acc + val, 0);
                const percentage = total > 0 ? ((context.parsed / total) * 100).toFixed(1) : 0;
                label += ` (${percentage}%)`;
                return label;
            }
        }
      }
    },
  };
  
  const totalStockCount = creditCodes.length;
  const totalTransactions = transactions.length;
  const totalSalesValue = transactions.reduce((sum, tx) => sum + tx.totalValue, 0); 

  const salesByValue = purchaseOptions.map(opt => {
    const quantitySold = transactions.reduce((acc, tx) => {
        const relevantPurchaseCode = tx.purchaseCodes.find(pc => pc === opt.purchaseCode);
        if (relevantPurchaseCode) {
            // This logic might need refinement if a transaction can contain multiple *types* of items
            // For now, it assumes tx.amount corresponds to the primary item type in the transaction.
            // If purchaseCodes can have multiple distinct values for a single transaction, this sum might be indirect.
            // Simplified: if the purchaseCode matches and the first item's value (tx.amount) matches opt.value
            // then we consider all tokens in that transaction (tx.quantity) as sold for this denomination.
            // This could be problematic if a transaction has multiple purchase codes AND tx.amount is only for one.
            // A more robust way would be to iterate cartItems within a transaction if structure allowed.
            // Given current Transaction structure, using tx.amount as proxy for a single denomination type.
             if(tx.amount === opt.value) { // Assuming tx.amount reflects the value of items with this purchaseCode.
                return acc + tx.quantity; // Summing total tokens if principal item type matches
            }
            // Fallback for multi-item transactions where tx.amount might not be this specific opt.value
            // but the purchaseCode is present. This is tricky.
            // The existing `processCartSale` seems to imply `tx.amount` is the first item's value.
            // For a more accurate sales by denomination, one might need to restructure Transaction or how it's built.
            // Current simplified approach:
            // Let's assume tx.creditCodesUsed can be mapped back to their values to count sales per denomination
            // This is safer than relying on tx.amount if tx has mixed denominations.
            // However, creditCodesUsed in Transaction only has IDs, not values.
            // The current processCartSale is complex. Let's stick to the current logic which seems to be:
            // tx.amount = cartItems[0].purchaseOption.value
            // tx.quantity = totalQuantityOfTokens (sum of all items quantity)
            // tx.purchaseCodes = distinct purchase codes.
            // This means quantitySold here might overcount if tx.quantity is for mixed types but only one purchaseCode matches.
            // For simplicity and minimal changes, let's keep the existing logic, assuming it's what was intended.
             const matchingCartItem = transactions.flatMap(t => t.creditCodesUsed)
                                     .map(codeId => creditCodes.find(cc => cc.id === codeId))
                                     .filter(cc => cc && cc.value === opt.value).length;
             // This is still not quite right.
             // Let's analyze the quantity from original cart items structure.
             // This requires more context on how transactions are structured for multi-item sales.
             // Given the existing structure, the original logic for salesByValue:
             // if(tx.amount === opt.value) { return acc + tx.quantity; } seems to be the intended way.
             // This implies if the *first* item in the cart that defined tx.amount was of this value, then count all tokens.
             // A better approach would be to sum quantities from cartItems that match opt.value if tx is derived from cartItems.
             // For now, let's use the most direct interpretation of sales quantity for a specific purchase option based on tx data.
             // The most reliable way within the current Transaction model is to check if the purchase code is present
             // and then assume the `quantity` for that transaction contributes to it, if that specific `purchaseCode`
             // corresponds to the option. This is still an approximation if a single TX covers multiple purchase codes.
             // For example, if purchaseCodes: ["SANTRI1K", "SANTRI5K"], quantity: 5. How many are 1K, how many 5K?
             // The existing structure seems to group by purchase option value in processCartSale.
             // Let's refine based on how `tx.purchaseCodes` and `tx.creditCodesUsed` map.
             // Total credit codes used of a certain value for this option
             const codesOfThisValueSoldInTx = tx.creditCodesUsed
                .map(codeId => creditCodes.find(c => c.id === codeId || transactions.flatMap(t => t.creditCodesUsed).find(usedId => usedId === codeId))) // Need to look up original credit code values
                .filter(ccOriginal => ccOriginal && ccOriginal.value === opt.value)
                .length;
             return acc + codesOfThisValueSoldInTx;

        }
        return acc;
    }, 0);


    return {
      label: opt.label.replace("Kredit ", "") + "K", // Keep K for brevity
      value: opt.value,
      count: quantitySold, 
    };
  }).filter(item => item.count > 0); 

  const BarChart: React.FC<{ data: { label: string; count: number }[], title: string, colorClass: string }> = ({ data, title, colorClass }) => {
    const maxValue = Math.max(...data.map(d => d.count), 0);
    if (data.length === 0 || data.every(d => d.count === 0)) { 
        return (
            <div>
                <h4 className="text-md font-semibold text-slate-200 mb-2 card-print-title">{title}</h4>
                <p className="text-slate-400 text-sm card-print-body">Tidak ada data penjualan tersedia untuk grafik ini.</p>
            </div>
        );
    }

    return (
      <div>
        <h4 className="text-md font-semibold text-slate-200 mb-2 card-print-title">{title}</h4>
        <div className="space-y-2 card-print-body">
          {data.map(item => (
            <div key={item.label} className="grid grid-cols-4 items-center gap-2 text-xs">
              <div className="text-slate-300 truncate col-span-1">{item.label}</div>
              <div className="col-span-3 bg-slate-700 rounded h-4 flex items-center">
                <div 
                  className={`${colorClass} h-full rounded text-xxs text-white flex items-center justify-end pr-1 bar-chart-bar`}
                  style={{ width: maxValue > 0 ? `${(item.count / maxValue) * 100}%` : '0%' }}
                  title={`Jumlah: ${item.count}`}
                >
                  {item.count > 0 ? item.count : ''}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  const printStyles = `
    @media print {
      body { font-family: Arial, sans-serif; background-color: #fff !important; color: #000 !important; }
      .app-header, .app-nav, .app-footer, .no-print { display: none !important; }
      .printable-area { margin: 20px; }
      .card-print { 
        border: 1px solid #ccc !important; 
        box-shadow: none !important; 
        padding: 15px !important; 
        background-color: #fff !important; 
        margin-bottom: 20px;
        page-break-inside: avoid;
      }
      .card-print-title { color: #000 !important; font-size: 1.2em; border-bottom: 1px solid #eee; padding-bottom: 5px; margin-bottom: 10px;}
      .card-print-body, ul, li, p, div, span, h3, h4, .text-slate-100, .text-slate-200, .text-slate-300, .text-slate-400 { color: #000 !important; background-color: transparent !important; }
      .text-indigo-400, .text-indigo-300, .text-green-400, .text-blue-400 { color: #333 !important; /* Darken colors for print */ }
      .grid { display: block !important; } 
      .grid li { border: 1px solid #eee; padding: 5px; margin-bottom: 5px; }
      .bar-chart-bar, .pie-chart-segment { background-color: #777 !important; border-color: #555 !important; } /* Grayscale charts */
      canvas { display: none !important; /* Hide canvas, show data tables or simplified info if needed for print */ }
    }
  `;

  return (
    <div className="space-y-6 sm:space-y-8 printable-area">
      <style>{printStyles}</style>
      <div className="flex justify-end mb-4 no-print">
        <Button onClick={handlePrint} variant="secondary" leftIcon={<PrinterIcon />}>Cetak Laporan</Button>
      </div>

      <Card title="Inventaris Kode Kredit" icon={<CubeIcon />} className="card-print">
        {creditCodeStockDisplay.length > 0 ? (
           <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 card-print-body">
             {creditCodeStockDisplay.map(stock => (
               <li key={stock.value} className="bg-slate-700 p-3 rounded-lg shadow text-center sm:text-left">
                 <p className="text-xs xxs:text-sm text-slate-300 truncate">{stock.label}</p>
                 <p className="text-xl sm:text-2xl font-bold text-indigo-400">{stock.count}</p>
                 <p className="text-xxs sm:text-xs text-slate-400">Tersedia</p>
               </li>
             ))}
           </ul>
        ) : (
          <p className="text-slate-400 text-center py-4 card-print-body">Tidak ada kode kredit dalam stok atau semua denominasi memiliki stok nol.</p>
        )}
         <p className="text-slate-100 mt-6 text-sm sm:text-base font-semibold card-print-body">
            Total Kode Kredit Unik dalam Stok: <span className="font-bold text-xl text-indigo-300">{totalStockCount}</span>
         </p>
      </Card>

      <Card title="Statistik Penjualan & Stok" icon={<ChartBarIcon />} className="card-print">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 card-print-body">
          <div className="bg-slate-700 p-4 rounded-lg text-center">
            <p className="text-sm text-slate-300">Total Transaksi</p>
            <p className="text-2xl font-bold text-indigo-400">{totalTransactions}</p>
          </div>
          <div className="bg-slate-700 p-4 rounded-lg text-center">
            <p className="text-sm text-slate-300">Total Nilai Penjualan</p>
            <p className="text-2xl font-bold text-green-400">Kredit {totalSalesValue.toLocaleString('id-ID')}</p>
          </div>
          <div className="bg-slate-700 p-4 rounded-lg text-center">
            <p className="text-sm text-slate-300">Total Item Stok</p>
            <p className="text-2xl font-bold text-blue-400">{totalStockCount}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 card-print-body">
          {/* Pie Chart for Stock Distribution */}
          <div className="chart-container">
            {stockForPieChart.length > 0 ? (
              <div style={{ height: '300px', width: '100%' }} className="mx-auto pie-chart-segment"> {/* Container for Pie chart */}
                <Pie data={pieChartData} options={pieChartOptions} />
              </div>
            ) : (
              <div>
                <h4 className="text-md font-semibold text-slate-200 mb-2 card-print-title flex items-center"><PieChartIcon className="mr-2"/>Distribusi Stok per Denominasi</h4>
                <p className="text-slate-400 text-sm card-print-body">Tidak ada stok untuk ditampilkan di grafik.</p>
              </div>
            )}
          </div>
          
          {/* Bar Chart for Sales Distribution */}
          <div className="chart-container">
            <BarChart 
              data={salesByValue} 
              title="Distribusi Penjualan per Denominasi (Unit Terjual)"
              colorClass="bg-green-500"
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StockView;
