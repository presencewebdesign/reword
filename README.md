## Table of Contents <!-- omit in toc -->

- [Introduction](#introduction)
- [The Inspiration](#the-inspiration)
- [Time Saved with Reword](#time-saved-with-reword)
- [Prompt Structure](#prompt-structure)
  - [Parameters](#parameters)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)

## Introduction

This is a project for the WatsonX Challenge 2024

Reword improves sentence structure, corrects spelling mistakes, ensures politically correct language, and assists users with dyslexia by enhancing readability and fluency.

Reword is an innovative solution designed to help users refine their communication, making it more polished and accessible. It simplifies complex language and ensures clarity, enabling individuals to present their thoughts more effectively. This tool is especially useful for avoiding overly technical or complicated wording, ensuring messages are approachable and polite. By using Reword, users can improve their communication skills and ensure their messages are easily understood by their audience.

## The Inspiration

Reword was conceived to address communication barriers in the workplace. Personal experiences with colleagues and clients highlighted the need for clear, concise, and professional communication. This inspired the development of Reword to help users enhance their communication skills and present their thoughts in a polished and accurate manner.

## Time Saved with Reword

Several studies provide insights into the time professionals spend on communication tasks:

1. **Email Management:**

   - McKinsey & Company (2019): 28% of the workweek (11.2 hours) is spent managing email.

2. **Writing and Editing:**

   - Grammarly (2021): 9.3 hours per week.
   - Radicati Group (2020): 3.1 hours per day on business email.

3. **Rewriting and Editing:**
   - RescueTime (2019): 1 hour per day on writing-related tasks.
   - Harvard Business Review: Managers can spend up to 20% of their time rewriting communications.

Professionals spend about 1 hour per day on rewriting and editing communications. Reword reduces this time by 50%, resulting in:

- **Daily Time Saved:** 0.5 hours
- **Weekly Time Saved:** 2.5 hours
- **Monthly Time Saved:** 10 hours

Reword can save professionals 50% of the time spent on rewriting and editing communications, translating to 0.5 hours per day, 2.5 hours per week, and 10 hours per month.

## Prompt Structure

We selected the granite-13b-chat-v2 AI model and implemented it using Node.js.

To optimize our chat task, we structured our prompts with specific segments:

- **<|system|>**: Identifies the instruction, which is also known as the system prompt for the foundation model.
- **<|user|>**: The query text to be answered.
- **<|assistant|>:**: A cue at the end of the prompt that indicates that a generated answer is expected.

We refactored our system prompt and added some custom data from the UI to include in the custom prompt to respond to our request.

### Parameters

- **rewordType**: The selection from the dropdown Manager, Technical, or Human Resource, which suggests responding in a relevant professional style.
- **inputType**: The text you want to convert with an improved version.

```txt
<|system|>\nYou are an AI assistant and your role is not to answer the question! we want to refine users messages, making them more polished and suitable for the intended response. Please respond only with an improved version of the user's input without initiating a conversation or requesting additional information.\n<|user|>\nCould you transform the following text into an appropriate response style from a ${rewordType} department? "${inputText}"\n<|assistant|>\n;
```

## Tech Stack

- ReactJS
- TypeScript
- Docker
- Nginx
- Express
- Node.js
- WatsonX AI

## Future Plans

For our future plans, we aim to further develop the app by implementing the following features and integrations:

- Improving the Ai response
- PWA (Progressive web app) integrations with Electron
- Accessibility enhancements with Text-To-Speech integration using the IBM API
- Building Slack and Outlook extension apps
- Uploading the demo version to a cloud server

These improvements will contribute to a more robust and accessible application, enhancing user experience and functionality.

## Installation

1. Clone the repository:

```bash
git clone https://github.ibm.com/James-Stevenson-CIC/reword.git
```

1. Navigate to the project directory:

```bash
cd reword
```

1. Install dependencies:

```bash
npm install
```

## Usage

To spin up the project locally you can run the following command

```bash
npm run dev
```

This command starts the development server.

```bash
docker-compose up -d
```

This command will run the app and Express server in docker containers with an nginx container.

## Contributing

If you want to contribute to this project, follow these steps:

1. Fork the project.
2. Create a new branch (git checkout -b feature/new-feature).
3. Make your changes.
4. Commit your changes (git commit -m 'Add new feature').
5. Push to the branch (git push origin feature/new-feature).
6. Create a new Pull Request.
