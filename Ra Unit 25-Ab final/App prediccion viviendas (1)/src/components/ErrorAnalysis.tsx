import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import {
  AlertCircle,
  CheckCircle,
  TrendingUp,
} from "lucide-react";

// Datos simulados de predicciones vs valores reales
const predictionVsActual = Array.from(
  { length: 40 },
  (_, i) => {
    const actual = 100000 + i * 10000 + Math.random() * 20000;
    const error = (Math.random() - 0.5) * 60000;
    return {
      actual,
      predicted: actual + error,
      error: Math.abs(error),
    };
  },
);

// Distribución de errores por rango de precio
const errorByPriceRange = [
  { range: "50-100k", avgError: 15000, count: 45 },
  { range: "100-150k", avgError: 18000, count: 85 },
  { range: "150-200k", avgError: 22000, count: 72 },
  { range: "200-250k", avgError: 28000, count: 48 },
  { range: "250-300k", avgError: 35000, count: 28 },
  { range: "300-400k", avgError: 48000, count: 15 },
  { range: "400k+", avgError: 72000, count: 7 },
];

// Errores residuales
const residuals = Array.from({ length: 50 }, (_, i) => ({
  index: i,
  residual: (Math.random() - 0.5) * 80000,
}));

export function ErrorAnalysis() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Análisis de Errores del Modelo
        </h2>
        <p className="text-gray-600">
          Evaluación del rendimiento del modelo Random Forest y
          análisis de los patrones de error para identificar
          áreas de mejora.
        </p>
      </div>

      {/* Métricas principales */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-600">RMSE</h3>
            <AlertCircle className="w-5 h-5 text-indigo-600" />
          </div>
          <p className="text-3xl font-bold text-indigo-600">
            $28,513
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Root Mean Squared Error
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-600">MAE</h3>
            <AlertCircle className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-green-600">
            $19,845
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Mean Absolute Error
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-600">R² Score</h3>
            <CheckCircle className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-blue-600">
            0.887
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Coeficiente de Determinación
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-600">MAPE</h3>
            <TrendingUp className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-purple-600">
            12.4%
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Mean Absolute % Error
          </p>
        </div>
      </div>

      {/* Predicciones vs Valores Reales */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Predicciones vs Valores Reales
        </h3>
        <p className="text-gray-600 mb-4">
          Los puntos cercanos a la línea diagonal indican
          predicciones precisas. La dispersión aumenta en
          precios más altos.
        </p>
        <ResponsiveContainer width="100%" height={350}>
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="actual"
              name="Precio Real"
              label={{
                value: "Precio Real ($)",
                position: "bottom",
              }}
            />
            <YAxis
              dataKey="predicted"
              name="Precio Predicho"
              label={{
                value: "Precio Predicho ($)",
                angle: -90,
                position: "left",
              }}
            />
            <Tooltip
              formatter={(value: number) =>
                `$${value.toLocaleString()}`
              }
              cursor={{ strokeDasharray: "3 3" }}
            />
            <Scatter data={predictionVsActual} fill="#4f46e5" />
            <Line
              data={[
                { actual: 50000, predicted: 50000 },
                { actual: 500000, predicted: 500000 },
              ]}
              dataKey="predicted"
              stroke="#ef4444"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Error por Rango de Precio */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Error Promedio por Rango de Precio
        </h3>
        <p className="text-gray-600 mb-4">
          El modelo muestra mayor error en viviendas de lujo
          debido a la menor cantidad de datos de entrenamiento
          en ese segmento.
        </p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={errorByPriceRange}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="range" />
            <YAxis />
            <Tooltip
              formatter={(value: number) =>
                `$${value.toLocaleString()}`
              }
            />
            <Bar
              dataKey="avgError"
              name="Error Promedio"
              radius={[8, 8, 0, 0]}
            >
              {errorByPriceRange.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    entry.avgError > 40000
                      ? "#ef4444"
                      : entry.avgError > 25000
                        ? "#f59e0b"
                        : "#10b981"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 flex gap-4 justify-center">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-sm text-gray-600">
              Error bajo (&lt; $25k)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-amber-500 rounded"></div>
            <span className="text-sm text-gray-600">
              Error medio ($25k-$40k)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-sm text-gray-600">
              Error alto (&gt; $40k)
            </span>
          </div>
        </div>
      </div>

      {/* Residuales */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Distribución de Residuales
        </h3>
        <p className="text-gray-600 mb-4">
          Los residuales se distribuyen aleatoriamente alrededor
          de cero, indicando que el modelo no presenta sesgo
          sistemático.
        </p>
        <ResponsiveContainer width="100%" height={250}>
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="index" name="Observación" />
            <YAxis
              dataKey="residual"
              name="Residual"
              label={{
                value: "Residual ($)",
                angle: -90,
                position: "left",
              }}
            />
            <Tooltip
              formatter={(value: number) =>
                `$${value.toLocaleString()}`
              }
            />
            <Scatter data={residuals} fill="#8b5cf6" />
            <Line
              data={[
                { index: 0, residual: 0 },
                { index: 50, residual: 0 },
              ]}
              dataKey="residual"
              stroke="#ef4444"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Conclusiones y limitaciones */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-green-900 mb-3 flex items-center gap-2">
            <CheckCircle className="w-6 h-6" />
            Fortalezas del Modelo
          </h3>
          <ul className="space-y-2 text-green-800">
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">
                •
              </span>
              <span>
                R² de 0.887 indica excelente capacidad
                predictiva
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">
                •
              </span>
              <span>
                RMSE razonable considerando la escala de precios
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">
                •
              </span>
              <span>Residuales sin sesgo sistemático</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">
                •
              </span>
              <span>
                Buen rendimiento en viviendas de rango medio
              </span>
            </li>
          </ul>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-amber-900 mb-3 flex items-center gap-2">
            <AlertCircle className="w-6 h-6" />
            Limitaciones Identificadas
          </h3>
          <ul className="space-y-2 text-amber-800">
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-bold">
                •
              </span>
              <span>
                Mayor error en viviendas extremadamente caras
                (&gt;$400k)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-bold">
                •
              </span>
              <span>
                Escasez de ejemplos de viviendas de lujo en el
                dataset
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-bold">
                •
              </span>
              <span>
                Posibles outliers que afectan la precisión
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-bold">
                •
              </span>
              <span>
                Modelo específico para Ames, Iowa (no
                generalizable)
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Recomendaciones */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-md p-6 text-white">
        <h3 className="text-xl font-bold mb-4">
          Recomendaciones para Mejora
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white/20 rounded-lg p-4">
            <h4 className="font-bold mb-2">📊 Más Datos</h4>
            <p className="text-sm">
              Recopilar más ejemplos de viviendas de alto valor
              para mejorar predicciones en ese segmento.
            </p>
          </div>
          <div className="bg-white/20 rounded-lg p-4">
            <h4 className="font-bold mb-2">
              🔍 Feature Engineering
            </h4>
            <p className="text-sm">
              Crear variables combinadas como "precio por metro
              cuadrado por barrio".
            </p>
          </div>
          <div className="bg-white/20 rounded-lg p-4">
            <h4 className="font-bold mb-2">
              🎯 Tratamiento de Outliers
            </h4>
            <p className="text-sm">
              Implementar detección y manejo específico de
              valores atípicos.
            </p>
          </div>
          <div className="bg-white/20 rounded-lg p-4">
            <h4 className="font-bold mb-2">
              🤖 Ensemble Methods
            </h4>
            <p className="text-sm">
              Combinar Random Forest con XGBoost o LightGBM para
              mejor rendimiento.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}