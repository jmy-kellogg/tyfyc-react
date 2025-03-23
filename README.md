# Tyfyc

Tyfyc stands for “thank you for your consideration” this is to assist in customizing a person resume. This tool will allow you to upload your resume and job post you are interested in. You can then tailor your resume and track the application in one place.

![Alt text](public/app-preview.png)
![Alt text](public/small-preview.png)

## Features
- [X] Manually add/change resume
- [X] Formats resume to downloadable PDF
- [X] Saves locally in cookies
- [X] Autofill resume from an existing resume
- [X] Saves Application details to csv
- [ ] Updates resume according to job posting

## OpenAI
add .env file in `/frontend` with an OPENAI_API_KEY and feature flag OPENAI_FEATURE_FLAG=true to get AI functionality. 

# Development

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
pip install requirements.txt
```

Start backend
```
python ./main.py
```
Runs locally on http://localhost:8080/


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

## Project Structure
```
tyfyc/
│── public/                     # Static assets
│── backend/                    # FastAPI Backend
│── frontend/                   # React Frontend
    │── src/
    │   ├── components/         # Reusable components
    │   ├── containers/         # Containers
    │   ├── store/              # Redux store
    │   ├── App.vue             # Root component
    │   ├── main.ts             # Entry file
    │   ├── types/              # TypeScript interfaces
    │   ├── api.ts              # Axio routing
    │── index.html              # Html
    │── package.json            # Dependencies and scripts
    │── vite.config.js          # Vite configuration
│── README.md                   # Project documentation
```

## Technologies Used
- React.js
- Vite
- TypeScript
- HTML & CSS
- Express
- FastAPI
- OpenAI "gpt-3.5-turbo"
- License

## This project is licensed under the MIT License.
