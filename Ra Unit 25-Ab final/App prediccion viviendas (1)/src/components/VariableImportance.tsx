import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, Info } from 'lucide-react';

const importanceData = [
  { variable: 'OverallQual', importance: 0.52, description: 'Calidad general de la vivienda (1-10)' },
  { variable: 'GrLivArea', importance: 0.48, description: 'Superficie habitable sobre nivel del suelo' },
  { variable: 'TotalBsmtSF', importance: 0.35, description: 'Superficie total del sótano' },
  { variable: 'Neighborhood', importance: 0.32, description: 'Ubicación de la vivienda en Ames' },
  { variable: 'GarageCars', importance: 0.28, description: 'Capacidad del garaje en autos' },
  { variable: 'GarageArea', importance: 0.26, description: 'Área del garaje en pies cuadrados' },
  { variable: 'YearBuilt', importance: 0.22, description: 'Año de construcción original' },
  { variable: '1stFlrSF', importance: 0.19, description: 'Superficie del primer piso' },
  { variable: 'FullBath', importance: 0.16, description: 'Número de baños completos' },
  { variable: 'YearRemodAdd', importance: 0.14, description: 'Año de remodelación' },
];

const COLORS = [
  '#4f46e5', '#6366f1', '#818cf8', '#a5b4fc', '#c7d2fe',
  '#e0e7ff', '#4f46e5', '#6366f1', '#818cf8', '#a5b4fc'
];

export function VariableImportance() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-3 mb-3">
          <TrendingUp className="w-8 h-8 text-indigo-600" />
          <h2 className="text-2xl font-bold text-gray-900">Importancia de Variables</h2>
        </div>
        <p className="text-gray-600">
          El modelo Random Forest permite identificar qué variables tienen mayor influencia en la
          predicción del precio de venta. Los valores representan la importancia relativa de cada
          característica.
        </p>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Top 10 Variables más Influyentes</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={importanceData} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" domain={[0, 0.6]} />
            <YAxis dataKey="variable" type="category" width={120} />
            <Tooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
                      <p className="font-bold text-gray-900">{data.variable}</p>
                      <p className="text-sm text-gray-600 mb-2">{data.description}</p>
                      <p className="text-indigo-600 font-semibold">
                        Importancia: {(data.importance * 100).toFixed(1)}%
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="importance" radius={[0, 8, 8, 0]}>
              {importanceData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Variable Details */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Info className="w-5 h-5 text-indigo-600" />
            Variables Más Importantes
          </h3>
          <div className="space-y-4">
            {importanceData.slice(0, 3).map((item, index) => (
              <div key={item.variable} className="border-l-4 border-indigo-500 pl-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-2 py-1 rounded">
                    #{index + 1}
                  </span>
                  <h4 className="font-bold text-gray-900">{item.variable}</h4>
                </div>
                <p className="text-sm text-gray-600">{item.description}</p>
                <div className="mt-2 bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full"
                    style={{ width: `${item.importance * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-md p-6 text-white">
          <h3 className="text-xl font-bold mb-4">Confirmación de Hipótesis</h3>
          <div className="space-y-3">
            <div className="bg-white/20 rounded-lg p-4">
              <p className="font-semibold mb-1">✓ Hipótesis 1: Confirmada</p>
              <p className="text-sm">
                La superficie habitable (GrLivArea) tiene una influencia positiva significativa
                con importancia de 48%.
              </p>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <p className="font-semibold mb-1">✓ Hipótesis 2: Confirmada</p>
              <p className="text-sm">
                La calidad general (OverallQual) es la variable más determinante con 52% de importancia.
              </p>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <p className="font-semibold mb-1">✓ Hipótesis 3: Confirmada</p>
              <p className="text-sm">
                La ubicación (Neighborhood) impacta significativamente con 32% de importancia.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Insights Clave</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-bold text-blue-900 mb-2">Calidad es Rey</h4>
            <p className="text-sm text-blue-800">
              OverallQual es el predictor más fuerte. Las mejoras en calidad tienen el mayor
              impacto en el valor.
            </p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-bold text-green-900 mb-2">Tamaño Importa</h4>
            <p className="text-sm text-green-800">
              Las tres medidas de superficie (GrLivArea, TotalBsmtSF, GarageArea) están entre
              las top 6.
            </p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h4 className="font-bold text-purple-900 mb-2">Ubicación, Ubicación</h4>
            <p className="text-sm text-purple-800">
              El barrio tiene más impacto que características físicas como el número de baños.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
