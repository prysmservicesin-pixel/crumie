<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/490061fc-ccfa-4547-88f7-7eedde055649

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## WhatsApp orders

Set `VITE_OWNER_WHATSAPP_NUMBER` in `.env.local` to the cafe owner's WhatsApp number with country code and digits only, for example `919876543210`. When a customer places an order, the app opens WhatsApp with the full order message ready to send to the owner, and the receipt screen lets the customer resend the order or share/copy their receipt.
