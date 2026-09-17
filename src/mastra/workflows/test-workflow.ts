import { createStep,createWorkflow,cloneWorkflow } from '@mastra/core/workflows'
import { z } from 'zod'

const step1 = createStep({
  id: 'step-1',
  inputSchema: z.object({
    message: z.string(),
  }),
  outputSchema: z.object({
    formatted: z.string(),
  }),
  stateSchema: z.object({
    count: z.number().default(0),
  }),
  execute: async ({ inputData, state,setState }) => {
    const { message } = inputData

    setState({ ...state, count: state.count + 1 })

    return {
      formatted: message.toUpperCase(),
    }
  },
})

const parentWorkflow = createWorkflow({
  id: "child-workflow",
  inputSchema: z.object({
    message: z.string()
  }),
  outputSchema: z.object({
    emphasized: z.string()
  })
})
  .then(step1)
  .commit();

const clonedWorkflow = cloneWorkflow(parentWorkflow, { id: "cloned-workflow" });

export const testWorkflow = createWorkflow({
  id: "test-workflow",
  inputSchema: z.object({
    message: z.string()
  }),
  outputSchema: z.object({
    emphasized: z.string()
  })
})
  .then(clonedWorkflow)
  .commit();