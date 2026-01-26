import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, Cell } from 'recharts';

// Datos simulados basados en el dataset de Ames
const priceDistribution = [
  { range: '50-100k', count: 180 },
  { range: '100-150k', count: 420 },
  { range: '150-200k', count: 380 },
  { range: '200-250k', count: 240 },
  { range: '250-300k', count: 140 },
  { range: '300-400k', count: 70 },
  { range: '400k+', count: 30 },
];

const surfaceVsPrice = Array.from({ length: 50 }, (_, i) => ({
  surface: 800 + i * 50,
  price: 80000 + i * 4000 + Math.random() * 40000,
}));

const neighborhoodData = [
  { name: 'NoRidge', median: 315000, q1: 280000, q3: 350000 },
  { name: 'NridgHt', median: 310000, q1: 275000, q3: 340000 },
  { name: 'StoneBr', median: 280000, q1: 250000, q3: 320000 },
  { name: 'Timber', median: 240000, q1: 210000, q3: 270000 },
  { name: 'Veenker', median: 230000, q1: 200000, q3: 260000 },
  { name: 'Crawfor', median: 200000, q1: 170000, q3: 230000 },
  { name: 'CollgCr', median: 190000, q1: 165000, q3: 220000 },
  { name: 'Edwards', median: 130000, q1: 110000, q3: 160000 },
  { name: 'OldTown', median: 120000, q1: 100000, q3: 150000 },
  { name: 'IDOTRR', median: 95000, q1: 80000, q3: 115000 },
];

export function ExploratoryAnalysis() {
  return (
    <div className="space-y-8">
      {/* Título y descripción */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Análisis Exploratorio de Datos (EDA)</h2>
        <p className="text-gray-700">
          Análisis del dataset <span className="font-semibold">train.csv</span> con 1460 viviendas,
          79 variables explicativas y la variable objetivo <span className="font-semibold">SalePrice</span>.
        </p>
      </div>

      {/* Distribución del precio de venta */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Distribución del Precio de Venta</h3>
        <p className="text-gray-600 mb-4">
          Concentración de precios en rangos medios con ligera asimetría hacia precios altos.
        </p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={priceDistribution}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="range" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#4f46e5" />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div className="bg-indigo-50 rounded-lg p-3">
            <p className="text-sm text-gray-600">Media</p>
            <p className="text-xl font-bold text-indigo-600">$180,921</p>
          </div>
          <div className="bg-indigo-50 rounded-lg p-3">
            <p className="text-sm text-gray-600">Mediana</p>
            <p className="text-xl font-bold text-indigo-600">$163,000</p>
          </div>
          <div className="bg-indigo-50 rounded-lg p-3">
            <p className="text-sm text-gray-600">Desv. Est.</p>
            <p className="text-xl font-bold text-indigo-600">$79,442</p>
          </div>
        </div>
      </div>

      {/* Superficie vs Precio */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Superficie Habitable vs Precio</h3>
        <p className="text-gray-600 mb-4">
          Fuerte correlación positiva entre la superficie habitable (GrLivArea) y el precio de venta.
        </p>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="surface" name="Superficie (sq ft)" />
            <YAxis dataKey="price" name="Precio ($)" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter data={surfaceVsPrice} fill="#4f46e5" />
          </ScatterChart>
        </ResponsiveContainer>
        <div className="mt-4 bg-blue-50 border-l-4 border-blue-500 p-4">
          <p className="text-sm text-blue-900">
            <span className="font-semibold">Observación:</span> Algunas viviendas muy grandes presentan
            precios más bajos de lo esperado (outliers potenciales).
          </p>
        </div>
      </div>

      {/* Barrio vs Precio */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Barrio vs Precio</h3>
        <p className="text-gray-600 mb-4">
          Los diferentes barrios muestran rangos de precios claramente diferenciados, confirmando la
          importancia de la ubicación.
        </p>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={neighborhoodData} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={80} />
            <Tooltip />
            <Bar dataKey="median" fill="#4f46e5" name="Precio Mediano" />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Barrio más costoso</p>
            <p className="text-lg font-bold text-green-700">NoRidge - $315,000</p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Barrio más económico</p>
            <p className="text-lg font-bold text-amber-700">IDOTRR - $95,000</p>
          </div>
        </div>
      </div>

      {/* Conclusiones del EDA */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-md p-6 text-white">
        <h3 className="text-xl font-bold mb-3">Conclusiones del EDA</h3>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-2xl">✓</span>
            <span>La superficie habitable muestra una fuerte correlación positiva con el precio</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-2xl">✓</span>
            <span>La ubicación (barrio) impacta significativamente en el valor de la vivienda</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-2xl">✓</span>
            <span>Presencia de outliers en viviendas de lujo que requieren atención especial</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
