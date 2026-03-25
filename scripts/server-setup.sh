#!/bin/bash
# Initial server setup script - run once on the Hetzner server
# Usage: ssh root@89.167.97.204 'bash -s' < scripts/server-setup.sh

set -e

echo "=== Updating system ==="
apt-get update && apt-get upgrade -y

echo "=== Installing Node.js 20 ==="
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

echo "=== Installing nginx ==="
apt-get install -y nginx

echo "=== Installing PM2 ==="
npm install -g pm2

echo "=== Creating app directory ==="
mkdir -p /var/www/symprio

echo "=== Setting up nginx config ==="
# The nginx config will be deployed via GitHub Actions
# Copy it manually for first-time setup:
# cp /var/www/symprio/nginx/symprio.conf /etc/nginx/sites-available/symprio
# ln -sf /etc/nginx/sites-available/symprio /etc/nginx/sites-enabled/symprio
# rm -f /etc/nginx/sites-enabled/default

echo "=== Setting up PM2 startup ==="
pm2 startup systemd -u root --hp /root

echo "=== Enabling nginx ==="
systemctl enable nginx
systemctl start nginx

echo "=== Setup complete ==="
echo ""
echo "Next steps:"
echo "1. Copy nginx config:  cp /var/www/symprio/nginx/symprio.conf /etc/nginx/sites-available/symprio"
echo "2. Enable site:        ln -sf /etc/nginx/sites-available/symprio /etc/nginx/sites-enabled/symprio"
echo "3. Remove default:     rm -f /etc/nginx/sites-enabled/default"
echo "4. Test nginx:         nginx -t"
echo "5. Reload nginx:       systemctl reload nginx"
echo "6. Create .env file:   nano /var/www/symprio/.env"
echo "   Add: JWT_SECRET=your-strong-secret-here"
echo "   Add: PORT=5000"
