apt-get update

apt-get install npm
apt-get install chromium-browser

mkdir ./web/img/

npm install express

# Open ports
sudo ufw allow 1000:10000/tcp

# Enable ssh  (and therefore sFTP)
systemctl enable ssh

chmod a+x start.sh

# Auto start script at start up
cp RPi-infoscreen.desktop /etc/xdg/autostart/

# Append to autostart

echo "@xset s off" >> /home/pi/.config/lxsession/LXDE-pi/autostart
echo "@xset -dpms" >> /home/pi/.config/lxsession/LXDE-pi/autostart
echo "@xset s noblank" >> /home/pi/.config/lxsession/LXDE-pi/autostart

echo "@npm start /home/pi/boveda/" >> /home/pi/.config/lxsession/LXDE-pi/autostart
echo "@chromium-browser --kiosk http://google.com/" >> /home/pi/.config/lxsession/LXDE-pi/autostart





reboot