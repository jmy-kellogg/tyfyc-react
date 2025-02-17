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

## Installation
```
npm install
```

### Run for development
```
npm run dev
```
The app will run locally http://localhost:8000/

### Compiles and minifies for production
```
npm run build

```

## Project Structure
```
tyfyc/
│── public/                 # Static assets
│── src/
│   ├── client/             # Client - frontend
│       ├── components/     # React components
│       ├── store/          # Redux store
│       ├── App.vue         # Root component
│       ├── main.ts         # Entry file
│   ├── server/             # Server - backend
│   ├── types/              # TypeScript interfaces
│── index.html              # Html
│── package.json            # Dependencies and scripts
│── vite.config.js          # Vite configuration
│── README.md               # Project documentation
```

## Technologies Used
- React.js
- Vite
- TypeScript
- HTML & CSS
- License

## This project is licensed under the MIT License.
