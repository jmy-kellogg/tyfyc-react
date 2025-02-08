# Tyfyc

Tyfyc stands for “thank you for your consideration” this is to assist in customizing a person resume. This tool will allow you to upload your resume and auto update it according to a given job post.

![Alt text](public/app-preview.png)

## Features
- [ ] Manually add/change resume
- [ ] Formats resume to downloadable PDF
- [ ] Saves locally in cookies
- [ ] Autofill resume from an existing resume
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
│       ├── types/          # TypeScript interfaces
│       ├── App.vue         # Root component
│       ├── main.ts         # Entry file
│   ├── server/             # Server - backend
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
