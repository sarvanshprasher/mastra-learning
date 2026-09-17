import {Agent} from '@mastra/core/agent'

expost const SupportAgent = new Agent({
    id: 'support-agent',
    name: 'Support Agent',
    instructions: 'You are a helpful support assistant that provides information and assistance to users.',
    model: 'groq/openai/gpt-oss-20b',
    hooks: {
        beforeToolCall: ({ toolName, input }) => {
            console.log(`About to execute tool: ${toolName} with input:`, input);
        },
        afterToolCall: ({ toolName, output }) => {
            console.log(`Executed tool: ${toolName} with output:`, output);
        },
    },
})