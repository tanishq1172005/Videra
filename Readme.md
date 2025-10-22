# Videra: Youtube Video Summarizer & Email Automation
An automated workflow that accepts a youtube video URL, uses a multistep AI Agent flow to generate a concise summary and delivers the result to user via gmail

## Problem Solved
- In today's content-saturated world, dedicating hours to watching long videos- like lectures, interviews or documentaries- is incredibly inefficient. This tool eliminates that time sink. By automating the extraction, summarization, and delivery of key information directly to the user's email, the application allows users to **absorb the core content in minutes** instead of hours. The result is better information absorption and **significant time savings.**

## How it Works: Implementation Overview
The solution operates as a fully automated agentic pipeline, triggered by a user's input (the YouTube link and their email address) via the web interface

### The 3-step Composio Automation Flow
1. **Input & Trigger**: The user submits the YouTube link and their target email address through the frontend. This input is captured by the main orchestration layer.

2. **Video Processing & Summarization (Composio YouTube Toolkit)**:
- The link is passed to the Composio YouTube Toolkit.
- This toolkit securely handles fetching the video data and, critically, retrieves the raw transcript or caption data.
- The raw content is then forwarded to the LLM (Large Language Model) via the openai API. A system prompt instructs the LLM to generate a concise, focused summary of the video content.

3. **Email Delivery (Composio Gmail Toolkit)**:
- The final generated summary text is passed to the Composio Gmail Toolkit.
- The toolkit uses the pre-configured Gmail connection to programmatically send a formatted email containing the summary, video title, and link directly to the user's provided email address
