# Visually

A web application enabling users to perform analysis and data visualization of song lyrics.

_(Note: This project is in development)_

### Motivation

What started as a Python script to collect data for a [content analysis]('https://en.wikipedia.org/wiki/Content_analysis') research project has grown into a long-running side project of mine.

I realized there were all kinds of interesting trends and insights that could be gathered from analyzing song lyrics.

I wanted to give the user the power to explore on their own, so I began working on a web app where users can request data for certain artists or songs and visualize the data in various ways.

### Overview

* React/SCSS front-end
* Redux for state management
* Data sourced from Genius REST API + web scraping
* Data caching with IndexedDB
* Nivo for charts
* Web workers to handle number-crunching

### Roadmap

* User-friendly error handling
* Manage y-axis range - view full y range for set instead of setting min/max based on current x values
* Choose words/lists of words, not just sort + expand/shift
* Filter words by theme, topic, etc - presets and let user create and save(?)
* Use compromise.js for NLP - do things like find n-grams (more contextually accurate than words)
