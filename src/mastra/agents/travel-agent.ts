import {Agent} from '@mastra/core/agent'
import { weatherTool } from '../tools/weather-tool'

export const TravelAgent = new Agent({
    id: 'travel-agent',
    name: 'Travel Agent',
    instructions: `
    You are a helpful travel assistant.
    Use travelTool to fetch current travel data.
    Use hazardsTool to provide information about potential travel hazards.

    IF A TOOL FAILS: Do not retry the tool more than once. Politely inform the user that the service is temporarily unavailable and offer alternative assistance.`,

    model: 'groq/openai/gpt-oss-120b',
    tools: {weatherTool},
})