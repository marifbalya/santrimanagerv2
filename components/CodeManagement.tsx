
import React, { useState } from 'react';
import { PurchaseOption, ServerCode } from '../types'; 
import Button from './common/Button';
// Input and Select for single add are removed as that form is gone
import Select from './common/Select';
import Textarea from './common/Textarea';
import Card from './common/Card';

// Icons
// CreditCardIcon removed as single add form is gone
const ServerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0V6a2.25 2.25 0 0 1 2.25-2.25h9A2.25 2.25 0 0 1 19.5 6v8.25m-13.5 0V18a2.25 2.25 0 0 0 2.25 2.25h9A2.25 2.25 0 0 0 19.5 18v-3.75m-13.5 0h13.5" /></svg>;
const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>;
const InboxStackIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10.5 11.25h3M12 15h.008M17.25 7.5H6.75c.621 0 1.247.042 1.854.123a2.256 2.256 0 0 1 1.435.636L12 11.25l1.961-2.243a2.256 2.256 0 0 1 1.435-.636A25.903 25.903 0 0 1 17.25 7.5Z" /></svg>;


interface CodeManagementProps {
  serverCodes: ServerCode[]; 
  addBulkCreditCodes: (codes: string[], value: number) => { addedCount: number, duplicateCount: number, ignoredCount: number, message: string };
  addServerCodes: (codes: string[]) => boolean;
  purchaseOptions: PurchaseOption[];
}

const CodeManagement: React.FC<CodeManagementProps> = ({ 
  serverCodes,
  addBulkCreditCodes,
  addServerCodes, 
  purchaseOptions 
}) => {
  const [bulkCreditCodeInput, setBulkCreditCodeInput] = useState('');
  const [bulkCreditCodeValue, setBulkCreditCodeValue] = useState<string>(purchaseOptions[0]?.value.toString() || '');
  const [bulkServerCodes, setBulkServerCodes] = useState('');

  const handleAddBulkCreditCodes = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bulkCreditCodeInput.trim() || !bulkCreditCodeValue) {
        alert("Harap tempel kode kredit dan pilih nilainya.");
        return;
    }
    const codesArray = bulkCreditCodeInput.split('\n').map(code => code.trim()).filter(code => code !== '');
    if (codesArray.length === 0) {
        alert("Tidak ada kode valid yang dimasukkan.");
        return;
    }
    const result = addBulkCreditCodes(codesArray, parseInt(bulkCreditCodeValue, 10));
    alert(result.message);
    if (result.addedCount > 0) {
      setBulkCreditCodeInput('');
    }
  };

  const handleAddServerCodes = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bulkServerCodes.trim()) {
        alert("Harap tempel kode server.");
        return;
    }
    const codesArray = bulkServerCodes.split('\n').map(code => code.trim()).filter(code => code !== '');
    if (codesArray.length === 0) {
        alert("Tidak ada kode valid yang dimasukkan.");
        return;
    }
    const success = addServerCodes(codesArray); 
    if (success) {
      setBulkServerCodes('');
    }
  };

  const selectOptions = purchaseOptions.map(opt => ({ value: opt.value.toString(), label: opt.label }));

  return (
    <div className="space-y-6 sm:space-y-8"> {/* Restored top-level spacing */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8"> 
        <Card title="Tambah Kode Kredit (Massal)" icon={<InboxStackIcon />}>
          <form onSubmit={handleAddBulkCreditCodes} className="space-y-4">
            <Textarea
              label="Kode Kredit (satu per baris)"
              id="bulkCreditCodeInput"
              value={bulkCreditCodeInput}
              onChange={(e) => setBulkCreditCodeInput(e.target.value)}
              placeholder="Tempel kode kredit di sini, satu per baris"
              rows={5}
              required
            />
            <Select
              label="Nilai untuk semua kode di atas"
              id="bulkCreditCodeValue"
              value={bulkCreditCodeValue}
              onChange={(e) => setBulkCreditCodeValue(e.target.value)}
              options={selectOptions}
              placeholder="Pilih nilai..."
              required
            />
            <Button type="submit" variant="primary" leftIcon={<PlusIcon/>}>Tambah Kode Kredit Massal</Button>
          </form>
        </Card>

        <Card title="Tambah Kode Server (Massal)" icon={<ServerIcon />}>
          <form onSubmit={handleAddServerCodes} className="space-y-4">
            <Textarea
              label="Kode Server (satu per baris)"
              id="bulkServerCodes"
              value={bulkServerCodes}
              onChange={(e) => setBulkServerCodes(e.target.value)}
              placeholder="Tempel kode server di sini, satu per baris"
              rows={5}
              required
            />
            <Button type="submit" variant="primary" leftIcon={<PlusIcon/>}>Tambah Kode Server Massal</Button>
            <p className="text-slate-300 mt-4 text-sm sm:text-base">Total Kode Server Unik: <span className="font-bold text-indigo-400">{serverCodes.length}</span></p>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default CodeManagement;