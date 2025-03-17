# i-DevR Payment Integration

A Stripe payment integration system ready for cPanel deployment.

## Project Structure

```
├── api/                    # PHP backend
│   ├── composer.json      # PHP dependencies
│   └── create-payment-intent.php  # Stripe payment endpoint
├── client/                # React frontend
│   └── ...               # React application files
├── .htaccess             # Apache configuration
└── build.sh              # Build script
```

## Local Development

1. Install frontend dependencies:
```bash
cd client
npm install
npm run dev
```

2. Install PHP dependencies:
```bash
cd api
composer install
```

## Building for cPanel Deployment

1. Make the build script executable:
```bash
chmod +x build.sh
```

2. Run the build script:
```bash
./build.sh
```

This will create `i-devr-deploy.zip` containing all necessary files.

## Deploying to cPanel

1. Upload `i-devr-deploy.zip` to your cPanel hosting
2. Extract the zip file in your public_html directory
3. Navigate to the api directory and run:
```bash
composer install
```
4. Update the Stripe API keys in `api/create-payment-intent.php`

## Configuration

1. Frontend Environment Variables:
   - `VITE_API_URL`: API endpoint URL (defaults to '/api')

2. Stripe Configuration:
   - Update the Stripe public key in `client/src/components/PaymentForm.jsx`
   - Update the Stripe secret key in `api/create-payment-intent.php`

## Important Notes

- Ensure your hosting supports PHP 7.4 or higher
- Make sure the Stripe PHP library is installed via Composer
- Configure proper SSL certificates for secure payments
- Test the payment integration in Stripe test mode before going live
