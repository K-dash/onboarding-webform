import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import BasicInformation from '../components/forms/BasicInformation';
import BasicSettings from '../components/forms/BasicSettings';
import AlertEmailSettings from '../components/forms/EmailSettings';

const FormPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    { title: '基本情報', component: BasicInformation },
    { title: '基本設定', component: BasicSettings },
    { title: 'メール設定', component: AlertEmailSettings },
  ];

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <h1 className="text-3xl font-bold p-6 bg-blue-600 text-white">
          {steps[currentStep].title}
        </h1>
        <div className="p-6">
          <CurrentStepComponent />
        </div>
        <div className="bg-gray-100 px-6 py-4 flex justify-between">
          {currentStep > 0 && (
            <button
              onClick={prevStep}
              className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
            >
              戻る
            </button>
          )}
          {currentStep < steps.length - 1 ? (
            <button
              onClick={nextStep}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
            >
              次へ
            </button>
          ) : (
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-auto">
              送信
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default FormPage;
