# Visually

A web application for exploring song lyrics via data visualizations.

_(Note: This project is in development)_

### Overview

* React/SCSS front-end
* Redux for state management
* Data sourced from Genius REST API + web scraping
* Data caching with IndexedDB
* Nivo for charts
* Web workers to handle number-crunching

### To Do

* User-friendly error handling
* Manage y-axis range - view full y range for set instead of setting min/max based on current x values
* Choose words/lists of words, not just sort + expand/shift
* Filter words by theme, topic, etc - presets and let user create and save(?)
* Use compromise.js for NLP - do things like find n-grams (more contextually accurate than words)
