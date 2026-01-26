import React, { useState } from 'react';
import { Home, BarChart3, Calculator, TrendingUp } from 'lucide-react';
import { ExploratoryAnalysis } from './components/ExploratoryAnalysis';
import { PredictionForm } from './components/PredictionForm';
import { VariableImportance } from './components/VariableImportance';
import { ErrorAnalysis } from './components/ErrorAnalysis';

type TabType = 'eda' | 'predict' | 'importance' | 'errors';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('eda');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Home className="w-8 h-8 text-indigo-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Predicción de Precios de Viviendas</h1>
              <p className="text-gray-600">Dataset: House Prices - Ames, Iowa</p>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <nav className="flex gap-1">
            <button
              onClick={() => setActiveTab('eda')}
              className={`flex items-center gap-2 px-6 py-4 font-medium border-b-2 transition-colors ${
                activeTab === 'eda'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              Análisis Exploratorio
            </button>
            <button
              onClick={() => setActiveTab('predict')}
              className={`flex items-center gap-2 px-6 py-4 font-medium border-b-2 transition-colors ${
                activeTab === 'predict'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Calculator className="w-5 h-5" />
              Predictor
            </button>
            <button
              onClick={() => setActiveTab('importance')}
              className={`flex items-center gap-2 px-6 py-4 font-medium border-b-2 transition-colors ${
                activeTab === 'importance'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <TrendingUp className="w-5 h-5" />
              Importancia de Variables
            </button>
            <button
              onClick={() => setActiveTab('errors')}
              className={`flex items-center gap-2 px-6 py-4 font-medium border-b-2 transition-colors ${
                activeTab === 'errors'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              Análisis de Errores
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'eda' && <ExploratoryAnalysis />}
        {activeTab === 'predict' && <PredictionForm />}
        {activeTab === 'importance' && <VariableImportance />}
        {activeTab === 'errors' && <ErrorAnalysis />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Modelo</h3>
              <p className="text-sm text-gray-600">Random Forest Regressor</p>
              <p className="text-sm text-gray-600">200 árboles</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Dataset</h3>
              <p className="text-sm text-gray-600">1460 viviendas</p>
              <p className="text-sm text-gray-600">79 variables</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Métrica</h3>
              <p className="text-sm text-gray-600">RMSE: $28,512.65</p>
              <p className="text-sm text-gray-600">Split: 80/20</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
