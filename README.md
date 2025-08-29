<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1I0eiADur_szXGWb1B4YOT6vcUHdIIczK

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to GitHub Pages

This project is configured to deploy automatically to GitHub Pages when you push to the main branch.

### Manual Deployment
You can also deploy manually using:
```bash
npm run deploy
```

### GitHub Pages URL
The app will be available at: https://111ayush111.github.io/docx-pdf/

### Environment Variables for Production
For production deployment, you need to set the `GEMINI_API_KEY` as a GitHub repository secret:
1. Go to your repository Settings → Secrets and variables → Actions
2. Add a new secret named `GEMINI_API_KEY` with your Gemini API key as the value
