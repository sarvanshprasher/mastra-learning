import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

export const weatherTool = createTool({
  id: 'weather-tool',
  description: 'Get the current weather for a given location.',
  inputSchema: z.object({
    location: z.string().describe('The location to get the weather for.'),
  }),
  outputSchema: z.object({
    temperatureCelsius: z.number().describe('The current temperature in Celsius.'),
    location: z.string().describe('The location for which the weather is being provided.'),
    conditions: z.string().describe('The current weather condition (e.g., sunny, cloudy, etc.).'),
    weatherIconUrl: z.string().url().describe('URL to an icon representing the current weather condition.'),
    source: z.any().describe('The raw data returned from the weather API.'),
    
  }),
  execute: async ({ location}, {abortSignal }) => {
    // 1. Terminal log to confirm tool execution started
    console.log(' Weather Tool executed with context:', location);

    const locationName = location || 'Boston';
    const cleanLocation = encodeURIComponent(locationName.trim());

    try {
      const response = await fetch(`http://wttr.in/${cleanLocation}?format=j1`, {
        headers: {
          'User-Agent': 'curl/7.68.0',
        },
        signal: abortSignal,
      });

      console.log(` HTTP Status Code: ${response.status}`);

      if (!response.ok) {
        console.error(` Fetch failed for ${locationName} with status ${response.status}`);
        throw new Error(`Failed to fetch weather data for ${locationName}. Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(' API Payload parsed successfully:', data.current_condition[0].temp_C);

      return {
        location: locationName,
        temperatureCelsius: Number(data.current_condition[0].temp_C),
        conditions: data.current_condition[0].weatherDesc[0].value,
        weatherIconUrl: data.current_condition[0].weatherIconUrl[0].value,
        source: data,
      };
    } catch (err) {
      // Print the exact error into your terminal logs
      console.error(' Caught error inside weatherTool:', err);
      throw err;
    }
  },
  toModelOutput: output => {
  return {
    type: 'content',
    value: [
      {
        type: 'text',
        // Fixed: Backticks used for template literal interpolation
        text: `${output.location} : ${output.temperatureCelsius}°C and ${output.conditions}`,
      },
      {
        type: 'image-url',
        url: output.weatherIconUrl,
      },
    ],
  };
},
});