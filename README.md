# Tyfyc

Tyfyc stands for “thank you for your consideration” this is to assist in customizing a person resume. This tool will allow you to upload your resume and job post you are interested in. You can then tailor your resume and track the application in one place.

![Alt text](public/tyfyc-resume.png)
![Alt text](public/tyfyc-posting.png)
![Alt text](public/tyfyc-research.png)

## Features

- [x] AI research company
- [x] Manually add/change resume
- [x] Formats resume to downloadable PDF
- [x] Saves locally in cookies
- [x] Autofill resume from an existing resume
- [x] Saves Application details to csv
- [x] Auth login and access token api validation
- [x] Tracks applications
- [x] Auto update applications statuses
- [x] Option to research potential companies via OpenAI
- [x] Feature flags
- [x] Stats and Analytics
- [x] Scheduled application status update
- [ ] Updates resume according to job posting
- [ ] Job posting search
- [ ] Company rating

# Development

## Scripts

`./dev-scripts.sh init-frontend` - Initialize frontend (install dependencies)
`./dev-scripts.sh init-backend` - Initialize backend (venv, dependencies, database)
`./dev-scripts.sh frontend` - Start frontend only
`./dev-scripts.sh backend` - Start backend only
`./dev-scripts.sh both` - Start both frontend and backend
`./dev-scripts.sh patch` - Updates CHANGELOG.md with notes for patch release
`./dev-scripts.sh minor` - Updates CHANGELOG.md with notes for minor release
`./dev-scripts.sh major` - Updates CHANGELOG.md with notes for major release

## Frontend

```
cd frontend
```

Install Requirements

```
npm install
```

Start Frontend

```
npm run dev
```

Run locally http://localhost:8000/

### Compiles and minifies for production

```
npm run build
```

## Backend

```
cd backend
```

Set up Python environment

```
python -m venv venv
source ./venv/bin/activate
```

Install Requirements

```
pip install -r requirements.txt
```

Start backend

```
python ./main.py
```

Runs locally on http://localhost:8080/
Open API Docs on http://localhost:8080/docs#

### Database migration

Make revision

```
alembic revision -m "description here"
```

Run migration
upgrade

```
alembic upgrade head
// or
alembic upgrade [revision_number]
```

downgrade

```
alembic downgrade [revision_number]
```

## Commit Message Format

To ensure proper changelog generation, follow this commit message format:

```
type(category): description [flags]
```

**Types:**

- `breaking` - Breaking changes
- `build` - Build system changes
- `ci` - CI/CD changes
- `chore` - Maintenance tasks
- `docs` - Documentation changes
- `feat` - New features
- `fix` - Bug fixes
- `other` - Other changes
- `perf` - Performance improvements
- `refactor` - Code refactoring
- `revert` - Revert previous changes
- `style` - Code style changes
- `test` - Test changes

**Examples:**

```
feat(auth): add user authentication
fix(api): resolve pagination bug
docs(readme): update installation instructions
```

## Generating Changelog

After making commits with proper format, generate the changelog:

```bash
# For patch version (0.0.x)
./dev-scripts.sh patch

# For minor version (0.x.0)
./dev-scripts.sh minor

# For major version (x.0.0)
./dev-scripts.sh major
```

This will automatically update the `CHANGELOG.md` file based on your commit history.
See more details about package at [generate-changelog](https://www.npmjs.com/package/generate-changelog)

## Project Structure

```
tyfyc/
│── public/                     # Static assets
│── backend/                    # FastAPI Backend
    │── alembic/                # Database revisions
    │── app/
        ├── auth/               # Auth and Token handler
        ├── parser/             # Document parser
        ├── routers/            # API Router
        ├── schemas/            # Schema and Typing
        ├── database.py         # sqlite database setup
        ├── models.py           # Database tables models
    |── main.py                 # Entry into the backend
│── frontend/                   # React Frontend
    │── src/
        ├── api/                # API connecting to backend
        ├── components/         # Reusable components
        ├── containers/         # Pages and Views
        ├── store/              # Redux store
        ├── types/              # TypeScript interfaces
        ├── App.tsx             # Root component
        ├── index.css           # Apps CSS
        ├── main.ts             # Entry file
    │── index.html              # Entry HTML
    │── package.json            # Dependencies and scripts
    │── vite.config.js          # Vite configuration
│── README.md                   # Project documentation
```

## Technologies Used

- React.js
- Vite
- TypeScript
- HTML & CSS
- Tailwind
- Tiptap
- FastAPI
- Sqlite
- Alembic
- OpenAI "gpt-3.5-turbo"
- License

## This project is licensed under the MIT License.
