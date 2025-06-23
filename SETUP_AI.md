# AI Image Generation Setup

## Required Environment Variables

To enable AI image generation, you need to set up the following environment variables:

### 1. Get a Replicate API Token

1. Go to [Replicate](https://replicate.com)
2. Sign up or log in to your account
3. Go to [Account Settings](https://replicate.com/account/api-tokens)
4. Create a new API token
5. Copy the token

### 2. Set Environment Variables

#### For Local Development:
Create a `.env.local` file in your project root with:

```env
REPLICATE_API_TOKEN=your_replicate_api_token_here
```

#### For Production (Vercel):
1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add a new variable:
   - **Name**: `REPLICATE_API_TOKEN`
   - **Value**: Your Replicate API token
4. Deploy your project

### 3. Test the Setup

1. Start your development server: `npm run dev`
2. Go to the Design Studio page
3. Upload an image and try generating a design
4. Check the browser console and server logs for any errors

## Troubleshooting

### Common Issues:

1. **"Replicate API token not configured"**
   - Make sure you've set the `REPLICATE_API_TOKEN` environment variable
   - Restart your development server after adding the variable

2. **"Failed to get model info"**
   - Check if your Replicate API token is valid
   - Ensure you have sufficient credits in your Replicate account

3. **"Prediction failed"**
   - Check the server logs for detailed error messages
   - Verify the image format and size (should be PNG/JPG, under 10MB)

### Getting Help:

- [Replicate Documentation](https://replicate.com/docs)
- [Replicate Discord](https://discord.gg/replicate)
- Check the browser console and server logs for detailed error messages

## Model Information

This application uses the `adirik/interior-design` model on Replicate, which is specifically designed for interior design transformations. 