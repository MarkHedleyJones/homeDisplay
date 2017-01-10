cd /home/pi/repos/homeDisplay && python interface.py &
sleep 5
xset s off
xset -dpms
xset s noblank
sh /home/pi/setup_shutdown.sh
chromium-browser http://127.0.0.1:5000 --kiosk
