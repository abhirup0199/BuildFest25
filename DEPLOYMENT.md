# Deploying Narrative Dashboard to Render

## Prerequisites

1. Create a [Render](https://render.com) account
2. Connect your GitHub repository to Render

## Deployment Steps

### Option 1: Using render.yaml (Recommended)

1. Push your code to GitHub with the `render.yaml` file in the root directory
2. In Render dashboard, click "New" and select "Blueprint"
3. Connect your GitHub repository
4. Render will automatically detect the `render.yaml` file and set up your services
5. Add your environment variables in the Render dashboard:
   - MONGO_URI: Your MongoDB connection string
   - JWT_SECRET: Your JWT secret key

### Option 2: Manual Deployment

#### Backend Deployment

1. In Render dashboard, click "New" and select "Web Service"
2. Connect your GitHub repository
3. Configure the service:
   - Name: narrative-dashboard-backend
   - Environment: Node
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`
4. Add environment variables:
   - NODE_ENV: production
   - PORT: 10000
   - MONGO_URI: Your MongoDB connection string
   - JWT_SECRET: Your JWT secret key
5. Click "Create Web Service"

#### Frontend Deployment

1. In Render dashboard, click "New" and select "Static Site"
2. Connect your GitHub repository
3. Configure the service:
   - Name: narrative-dashboard-frontend
   - Build Command: `cd frontend && npm install && npm run build`
   - Publish Directory: `frontend/build`
4. Add environment variables:
   - REACT_APP_API_URL: URL of your backend API (e.g., https://narrative-dashboard-backend.onrender.com/api)
5. Click "Create Static Site"

## Important Notes

- Make sure your MongoDB Atlas IP whitelist includes Render's IPs or is set to allow access from anywhere
- The frontend needs to be built after the backend is deployed to ensure it has the correct API URL
- Check Render logs if you encounter any deployment issues