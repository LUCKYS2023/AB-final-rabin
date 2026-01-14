# AB-final-rabin

# Predicción de Precios de Viviendas con Machine Learning

## Descripción del proyecto

Este proyecto forma parte del Aprendizaje Basado en Proyectos (AB) de la asignatura.  
El objetivo es construir un modelo de Machine Learning capaz de predecir el precio de venta de viviendas a partir de sus características físicas y de localización.

Para ello se utiliza el dataset **House Prices: Advanced Regression Techniques** de Kaggle, que contiene información detallada de viviendas en Ames, Iowa (EE.UU.).


## Objetivo

Predecir la variable **SalePrice** (precio de venta) usando técnicas de regresión supervisada, con el fin de apoyar procesos de valoración inmobiliaria.


## Tecnologías utilizadas

- Python 3  
- Pandas y NumPy  
- Scikit-learn  
- Matplotlib y Seaborn  
- Jupyter Notebook  

## Metodología

1. Carga y exploración del dataset (EDA).  
2. Limpieza y preprocesamiento de datos.  
3. Codificación de variables categóricas.  
4. Entrenamiento de un modelo Random Forest Regressor.  
5. Evaluación mediante la métrica RMSE.  
6. Generación de archivo de predicción submission.csv.

## Resultados

El modelo obtiene un error aproximado:

**RMSE ≈ 28.000 $**

Lo que significa que la predicción promedio difiere en ±28.000 dólares respecto al precio real.

## Autor

Lucas Germes
Proyecto académico – 2026

## Dataset

Kaggle – House Prices: Advanced Regression Techniques  
https://www.kaggle.com/c/house-prices-advanced-regression-techniques


