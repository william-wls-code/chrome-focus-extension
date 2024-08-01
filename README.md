# Focus Extension

## Description

Focus Extension is a Chrome browser extension designed to help users reduce internet addiction and promote mindfulness. It allows users to set up a list of potentially distracting websites and introduces a meditation pause before accessing these sites.

## Features

- **Custom URL Blocking**: Users can define a list of URLs to be monitored.
- **Timed Meditation**: When accessing a blocked URL, users are presented with a countdown timer for meditation.
- **Custom Messages**: Users can set personalized messages to display during the meditation period.
- **Flexible Intervals**: Set custom intervals between meditation prompts for each blocked site.
- **Adjustable Meditation Duration**: Users can define the length of the meditation period.

## Installation

1. Clone this repository or download the ZIP file.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" in the top right corner.
4. Click "Load unpacked" and select the directory containing the extension files.

## Usage

1. Click on the extension icon in the Chrome toolbar to access the options page.
2. In the options page:
   - Enter the URLs you want to monitor (one per line)
   - Set a custom message (optional)
   - Define the popup interval in minutes
   - Set the meditation time in seconds
3. Click "Save Options" to apply your settings.
4. When you attempt to access a monitored URL, the extension will display the meditation page.

## License

Distributed under the MIT License. See `LICENSE` for more information.
