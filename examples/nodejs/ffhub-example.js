/**
 * FFHub API - Node.js Example
 * https://ffhub.io
 */

const API_KEY = 'YOUR_API_KEY';
const API_URL = 'https://api.ffhub.io/v1';

/**
 * Create a new FFmpeg task
 */
async function createTask(command) {
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ command }),
  });

  if (!response.ok) {
    throw new Error(`Failed to create task: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Get task status
 */
async function getTask(taskId) {
  const response = await fetch(`${API_URL}/tasks/${taskId}`, {
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to get task: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Wait for task to complete
 */
async function waitForTask(taskId, pollInterval = 5000) {
  while (true) {
    const task = await getTask(taskId);
    const status = task.status;

    if (status === 'completed') {
      console.log(`Task completed! Output: ${task.output_url}`);
      return task;
    } else if (status === 'failed') {
      throw new Error(`Task failed: ${task.error}`);
    } else {
      console.log(`Task status: ${status}, waiting...`);
      await new Promise(resolve => setTimeout(resolve, pollInterval));
    }
  }
}

// Main
async function main() {
  try {
    // Example: Convert video to H.264
    const command = 'ffmpeg -i https://example.com/input.mp4 -c:v libx264 -preset fast output.mp4';

    console.log('Creating task...');
    const result = await createTask(command);
    const taskId = result.task_id;
    console.log(`Task created: ${taskId}`);

    console.log('Waiting for completion...');
    const finalResult = await waitForTask(taskId);
    console.log(`Done! Credits used: ${finalResult.credits_used}`);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();
