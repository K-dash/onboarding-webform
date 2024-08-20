import React, { useState } from 'react';
import { SelectField, TimeField, RangeField, MultiInputField, TextField } from './FormFields';

interface BasicSettingsData {
  adminNames: { id: string; value: string }[];
  userType: 'adminOnly' | 'adminAndOrgManager';
  notificationEmails: { id: string; value: string }[];
  dayChangeTime: Date;
  passwordExpiration: number | 'unlimited';
  alertThreshold: number;
  useCsvDownload: 'yes' | 'no';
  useMasterUploadApi: 'yes' | 'no';
  useAzureAdSso: 'yes' | 'no';
}

const BasicSettings: React.FC = () => {
  const [formData, setFormData] = useState<BasicSettingsData>({
    adminNames: [{ id: '1', value: '' }],
    userType: 'adminOnly',
    notificationEmails: [{ id: '1', value: '' }],
    dayChangeTime: new Date(2000, 0, 1, 5, 0), // AM 5:00
    passwordExpiration: 'unlimited',
    alertThreshold: 30,
    useCsvDownload: 'yes',
    useMasterUploadApi: 'no',
    useAzureAdSso: 'no',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTimeChange = (time: Date | null) => {
    if (time) {
      setFormData((prevData) => ({
        ...prevData,
        dayChangeTime: time,
      }));
    }
  };

  const handlePasswordExpirationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '91' ? 'unlimited' : Number(e.target.value);
    setFormData((prevData) => ({
      ...prevData,
      passwordExpiration: value,
    }));
  };

  const handleMultiInputAdd = (field: 'adminNames' | 'notificationEmails') => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: [...prevData[field], { id: Date.now().toString(), value: '' }],
    }));
  };

  const handleMultiInputChange =
    (field: 'adminNames' | 'notificationEmails') => (id: string, value: string) => {
      setFormData((prevData) => ({
        ...prevData,
        [field]: prevData[field].map((item) => (item.id === id ? { ...item, value } : item)),
      }));
    };

  const handleMultiInputRemove = (field: 'adminNames' | 'notificationEmails') => (id: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: prevData[field].filter((item) => item.id !== id),
    }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: parseInt(value, 10),
    }));
  };

  const renderSection = (title: string, children: React.ReactNode) => (
    <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
      <div className="bg-blue-600 px-6 py-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      <div className="p-6 space-y-4">{children}</div>
    </div>
  );

  return (
    <div className="space-y-6">
      {renderSection(
        '共通設定項目',
        <>
          <MultiInputField
            label="人事権限管理者の氏名"
            inputs={formData.adminNames}
            onAdd={() => handleMultiInputAdd('adminNames')}
            onChange={handleMultiInputChange('adminNames')}
            onRemove={handleMultiInputRemove('adminNames')}
            placeholder="フルネームを入力してください"
            maxInputs={20}
            tooltip="最大20名まで登録可能です"
          />
          <SelectField
            label="ログインユーザー種別"
            id="userType"
            name="userType"
            value={formData.userType}
            onChange={handleInputChange}
            options={[
              { value: 'adminOnly', label: '人事権限管理者のみ' },
              { value: 'adminAndOrgManager', label: '人事権限者＋組織管理者' },
            ]}
          />
          <MultiInputField
            label="メール通知先アドレス"
            inputs={formData.notificationEmails}
            onAdd={() => handleMultiInputAdd('notificationEmails')}
            onChange={handleMultiInputChange('notificationEmails')}
            onRemove={handleMultiInputRemove('notificationEmails')}
            placeholder="メールアドレスを入力してください"
            maxInputs={10}
            tooltip="最大10件まで登録可能です"
          />
          <TimeField
            label="勤務時間の日替わり時刻"
            id="dayChangeTime"
            selected={formData.dayChangeTime}
            onChange={handleTimeChange}
            placeholderText="時刻を選択してください"
            tooltip="1時間単位の設定になります（AM5:30などは指定不可）"
          />
          <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 focus-within:border-blue-500 transition duration-150 ease-in-out">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ログインパスワードの有効期限
            </label>
            <div className="flex items-center">
              <RangeField
                label=""
                id="passwordExpiration"
                name="passwordExpiration"
                value={
                  formData.passwordExpiration === 'unlimited' ? 91 : formData.passwordExpiration
                }
                onChange={handlePasswordExpirationChange}
                min={30}
                max={91}
              />
              <span className="ml-2">
                {formData.passwordExpiration === 'unlimited'
                  ? '無期限'
                  : `${formData.passwordExpiration}日`}
              </span>
            </div>
          </div>
        </>
      )}

      {renderSection(
        'Tプラン専用設定項目',
        <TextField
          label="アラート扱いにする乖離時間のしきい値設定（分）"
          id="alertThreshold"
          name="alertThreshold"
          value={formData.alertThreshold.toString()}
          onChange={handleNumberChange}
          type="number"
          min={0}
          tooltip="0以上の整数を入力してください"
          helpText='例) "5" と入力すると、5分間のアラート扱いになります'
        />
      )}

      {renderSection(
        'Jプラン専用設定項目',
        <SelectField
          label="CSVファイルダウンロード機能を利用しますか？"
          id="useCsvDownload"
          name="useCsvDownload"
          value={formData.useCsvDownload}
          onChange={handleInputChange}
          options={[
            { value: 'yes', label: '利用する' },
            { value: 'no', label: '利用しない' },
          ]}
        />
      )}

      {renderSection(
        'マスタアップロード/取り込みAPI設定項目',
        <SelectField
          label="マスタアップロード/取り込みAPIを利用しますか？"
          id="useMasterUploadApi"
          name="useMasterUploadApi"
          value={formData.useMasterUploadApi}
          onChange={handleInputChange}
          options={[
            { value: 'yes', label: '利用する' },
            { value: 'no', label: '利用しない' },
          ]}
        />
      )}

      {renderSection(
        'シングルサインオン設定項目',
        <SelectField
          label="Azure ADのシングルサインオン機能を利用しますか？"
          id="useAzureAdSso"
          name="useAzureAdSso"
          value={formData.useAzureAdSso}
          onChange={handleInputChange}
          options={[
            { value: 'yes', label: '利用する' },
            { value: 'no', label: '利用しない' },
          ]}
        />
      )}
    </div>
  );
};

export default BasicSettings;
