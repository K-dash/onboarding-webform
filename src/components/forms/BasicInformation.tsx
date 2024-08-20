import React, { useState } from 'react';
import { TextField, SelectField, DateField } from './FormFields';

interface BasicInformationData {
  companyName: string;
  contactPerson: string;
  email: string;
  plan: 'S' | 'T' | 'J';
  startDate: Date | null;
  endDate: Date | null;
}

const BasicInformation: React.FC = () => {
  const [formData, setFormData] = useState<BasicInformationData>({
    companyName: '',
    contactPerson: '',
    email: '',
    plan: 'S',
    startDate: null,
    endDate: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (date: Date | null, field: 'startDate' | 'endDate') => {
    setFormData(prevData => ({
      ...prevData,
      [field]: date,
    }));
  };

  const renderSection = (title: string, children: React.ReactNode) => (
    <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
      <div className="bg-blue-600 px-6 py-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      <div className="p-6 space-y-4">
        {children}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
    
      {renderSection("顧客情報", (
        <>
          <TextField
            label="会社名"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            placeholder="会社名を入力してください"
          />
          <TextField
            label="担当者名"
            id="contactPerson"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleInputChange}
            placeholder="担当者名を入力してください"
          />
          <TextField
            label="メールアドレス"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="メールアドレスを入力してください"
            type="email"
          />
          <SelectField
            label="プラン"
            id="plan"
            name="plan"
            value={formData.plan}
            onChange={handleInputChange}
            options={[
              { value: 'S', label: 'S' },
              { value: 'T', label: 'T' },
              { value: 'J', label: 'J' },
            ]}
          />
          <DateField
            label="利用開始日"
            id="startDate"
            selected={formData.startDate}
            onChange={(date) => handleDateChange(date, 'startDate')}
            placeholderText="利用開始日を選択してください"
          />
          <DateField
            label="利用終了日"
            id="endDate"
            selected={formData.endDate}
            onChange={(date) => handleDateChange(date, 'endDate')}
            placeholderText="利用終了日を選択してください"
          />
        </>
      ))}
    </div>
  );
};

export default BasicInformation;
