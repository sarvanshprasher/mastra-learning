import {Agent} from '@mastra/core/agent'
import { weatherTool } from '../tools/weather-tool'
import { hazardsTool } from '../tools/hazard-tool'
import { groq } from '@ai-sdk/groq';

export const WeatherAgent = new Agent({
    id: 'weather-agent',
    name: 'Weather Agent',
    instructions: `
    You are a helpful weather assistant.
    Use weatherTool to fetch current weather data.
    Use hazardsTool to provide information about potential weather hazards.

    IF A TOOL FAILS: Do not retry the tool more than once. Politely inform the user that the service is temporarily unavailable and offer alternative assistance.`,

    model: groq('llama-3.1-70b-versatile'),
    tools: {weatherTool,hazardsTool},
})
