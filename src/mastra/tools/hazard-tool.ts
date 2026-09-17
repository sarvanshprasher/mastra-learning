import { createTool } from '@mastra/core/tools'
import { z } from 'zod'


export const hazardsTool = createTool({
  id: 'hazards-tool',
  description: 'Get active severe weather alerts or hazards for a location.',
  inputSchema: z.object({
    location: z.string().describe('The location to check for weather hazards.'),
  }),
  outputSchema: z.object({
    location: z.string(),
    hasHazards: z.boolean(),
    hazards: z.array(z.string()).describe('List of weather alert descriptions or advisories.'),
  }),
  execute: async ({ location }, { abortSignal }) => {
    const response = await fetch(`https://wttr.in/${encodeURIComponent(location)}?format=j1`, {
      signal: abortSignal,
    })
    
    if (!response.ok) {
      throw new Error(`Failed to fetch hazard data for ${location}`)
    }

    const data = await response.json()
    const weatherAlerts = data.weather?.[0]?.hourly?.[0]?.weatherDesc?.[0]?.value || ''

    // Example basic alert extraction logic
    const hazards: string[] = []
    if (/thunder|storm|snow|blizzard|gale|tornado/i.test(weatherAlerts)) {
      hazards.push(`Active Weather Advisory: ${weatherAlerts}`)
    }

    return {
      location,
      hasHazards: hazards.length > 0,
      hazards,
    }
  },
})