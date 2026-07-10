# Contributing to Backend Doctor

First off, thank you for considering contributing to Backend Doctor! It's people like you that make Backend Doctor such a great tool for the Node.js ecosystem.

## Code of Conduct

By participating in this project, you are expected to uphold a respectful and welcoming environment:
- Be polite and respectful to others.
- Provide constructive feedback.
- Harassment or unacceptable behavior will not be tolerated.

## How Can I Contribute?

### Reporting Bugs
If you find a bug or a missing diagnostic check, please create an issue on GitHub with:
- A clear and descriptive title.
- Steps to reproduce the issue.
- Your Node.js version and Operating System.

### Suggesting Enhancements
Have an idea for a new health check or middleware? We'd love to hear it!
Create an issue detailing your proposal and how it benefits the project.

### Pull Requests
1. **Fork the repository** and create your branch from `main`.
2. **Install dependencies:** `npm install`
3. **Make your changes.** If you are adding a new feature, please include tests.
4. **Run tests:** Ensure everything passes with `npm run test`.
5. **Lint and build:** Make sure the code builds cleanly with `npm run build`.
6. **Submit a PR:** Describe your changes clearly in the pull request description.

## Development Setup

1. Clone your fork:
   ```bash
   git clone https://github.com/your-username/backend-doctor.git
   cd backend-doctor
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run tests locally to ensure everything works:
   ```bash
   npm run test
   ```

## Coding Style
- We use **TypeScript**. Ensure strict typing where possible.
- Write meaningful variable names and comment on complex logic.
- Always write tests for new diagnostic checks in the `tests/` directory.

## License
By contributing to this repository, you agree that your contributions will be licensed under its open-source license (ISC).
