# Vue + Express (MySQL)

## 1) FRONTEND – Vue 3 + Vite + Bootstrap + Fontawesome
### 1.1) Create project (root_project_name)
```bash
cd ../
npm create vite@latest root_project_name -- --template vue
cd root_project_name
npm i
npm i vue-router@4 axios
npm i bootstrap @fortawesome/fontawesome-free
```



## 2) BACKEND – Express + MySQL (REST API)
### 2.1) Create folder for backend, and inicialize express
**From project root folder**
```bash
mkdir -p backend
cd backend
npm init -y
npm i express cors mysql2 dotenv
npm i -D nodemon
```
### 2.2) Modify
*root/backend/package.json*
```json
{
  "type": "module",
  "scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js"
  }
}
```