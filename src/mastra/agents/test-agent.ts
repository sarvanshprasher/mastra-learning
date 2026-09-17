import {Agent} from '@mastra/core/agent'

export const TestAgent = new Agent({
    id: 'test-agent',
    name: 'Test Agent',
    instructions: 'You are a helpful assistant that provides information',
    model: 'groq/openai/gpt-oss-20b',
})