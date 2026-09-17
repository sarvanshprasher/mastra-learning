import {Agent} from '@mastra/core/agent'
import { askUserTool } from '@mastra/core/tools'

const writer = new Agent({
    id: 'writer',
    name: 'Writer',
    description: 'Drafts and edits written content',
    instructions: 'You are a skilled writer',
    model: 'groq/openai/gpt-oss-120b',
})

export const supervisor = new Agent({
    id: 'supervisor',
    name: 'Supervisor',
    instructions: 'Coordinates the writer to produce content.',
    model: 'groq/openai/gpt-oss-120b',
    tools: { writer, askUserTool},
})