apt-get update && apt-get upgrade

apt-get install npm
apt-get install chromium-browser

mkdir ./web/img/

npm install express

# Open ports
sudo ufw allow 1000:10000/tcp

# Enable ssh  (and therefore sFTP)
systemctl enable ssh

# Auto start script at start up
echo "npm start --prefix ${pwd}" >> /home/pi/.bashrc

reboot