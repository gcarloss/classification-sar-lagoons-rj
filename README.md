# classification-sar-lagoons-rj
JavaScript scripts applied to Google Earth Engine for classifying water bodies using Sentinel-1 (2019-2022).

# SAR-Based Water Body Classification using Google Earth Engine

This repository contains a workflow for mapping and classifying water bodies in the State of Rio de Janeiro, Brazil, using **Sentinel-1 SAR (Synthetic Aperture Radar)** time series data.

## Project Overview
The methodology focuses on multi-temporal analysis to identify water surfaces by leveraging the backscatter properties of SAR data. The process is divided into pre-processing (speckle filtering and reduction) and machine learning classification.

## Workflow

### 1. Pre-processing (`01_sar_preprocessing.js`)
* **Data Source:** Sentinel-1 GRD (Ground Range Detected).
* **Speckle Reduction:** Application of a focal median filter (3x3 kernel, 3 iterations) to reduce noise.
* **Composites:** Generation of **Minimum** and **Maximum** backscatter composites for the 2019-2022 period.

### 2. Classification (`02_rf_classification.js`)
* **Algorithm:** Random Forest (RF) with 500 trees.
* **Classes:** Binary classification (1: Water | 2: Non-Water).
* **Validation:** Reproducible training using fixed seeds for scientific consistency.

## How to Use
1. Open the **Google Earth Engine Code Editor**
2. Run `01_sar_preprocessing.js` to generate the processed composites.
3. Export the resulting image to your Assets.
4. Run `02_rf_classification.js` using the generated Asset as input for the classification.

## Context
This work was developed as part of academic research at the **Federal University of Rio de Janeiro (UFRJ)**.

## License & Citation

This project is open-source under the **MIT License**. You are free to use, modify, and distribute the code for any purpose. 

However, if this methodology or code is used in academic research or professional projects, please provide attribution by citing the following work:

**Reference:**
> [Seu Nome Completo], (2026). *Multitemporal Classification of Water Bodies in the Lagoon Complexes of the State of Rio de Janeiro (Brazil) Using SAR Time Series*. GitHub Repository: `[Link do seu repositório aqui]`

**BibTeX for researchers:**
```bibtex
@software{yourname2026sar,
  title={Multitemporal Classification of Water Bodies in the Lagoon Complexes of the State of Rio de Janeiro (Brazil) Using SAR Time Series},
  author={[Seu Sobrenome], [Seu Nome]},
  year={2026},
  publisher={GitHub},
  journal={GitHub repository},
  howpublished={\url{[https://github.com/](https://github.com/)[seu-usuario]/[nome-do-repo]}}
}
