"""
FFHub API - Python Example
https://ffhub.io
"""

import requests
import time

API_KEY = "YOUR_API_KEY"
API_URL = "https://api.ffhub.io/v1"


def create_task(command: str) -> dict:
    """Create a new FFmpeg task."""
    response = requests.post(
        f"{API_URL}/tasks",
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json",
        },
        json={"command": command},
    )
    response.raise_for_status()
    return response.json()


def get_task(task_id: str) -> dict:
    """Get task status."""
    response = requests.get(
        f"{API_URL}/tasks/{task_id}",
        headers={"Authorization": f"Bearer {API_KEY}"},
    )
    response.raise_for_status()
    return response.json()


def wait_for_task(task_id: str, poll_interval: int = 5) -> dict:
    """Wait for task to complete."""
    while True:
        task = get_task(task_id)
        status = task.get("status")

        if status == "completed":
            print(f"Task completed! Output: {task.get('output_url')}")
            return task
        elif status == "failed":
            raise Exception(f"Task failed: {task.get('error')}")
        else:
            print(f"Task status: {status}, waiting...")
            time.sleep(poll_interval)


if __name__ == "__main__":
    # Example: Convert video to H.264
    command = "ffmpeg -i https://example.com/input.mp4 -c:v libx264 -preset fast output.mp4"

    print("Creating task...")
    result = create_task(command)
    task_id = result["task_id"]
    print(f"Task created: {task_id}")

    print("Waiting for completion...")
    final_result = wait_for_task(task_id)
    print(f"Done! Credits used: {final_result.get('credits_used')}")
