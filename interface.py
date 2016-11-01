from flask import Flask, request, send_from_directory, redirect, Response
import pprint
import json
import modules.weather
import time
app = Flask(__name__)


# set the project root directory as the static folder, you can set others.
app = Flask(__name__, static_url_path='')

@app.route('/css/<path:path>')
def send_css(path):
	return send_from_directory('http/css', path)

@app.route('/img/<path:path>')
def send_img(path):
	return send_from_directory('http/img', path)

@app.route('/js/<path:path>')
def send_js(path):
	return send_from_directory('http/js', path)

@app.route("/get_weather")
def weather():
	with open('http/weather.json', 'r') as f:
		tmp = f.readlines()
	weather_cached = json.loads("\n".join(tmp))
	if 'FETCHED' in weather_cached and (time.time() - weather_cached['FETCHED']) < 60 * 5:
		return send_from_directory('http', 'weather.json')
	else:
		weather = json.dumps(modules.weather.get_weather('Tauranga'), sort_keys=True)
		with open('http/weather.json', 'w') as f:
			f.write(weather)
		return Response(weather, mimetype='application/json')
	

@app.route("/get_shopping")
def get_shopping():
	return send_from_directory('http', 'shopping.json')

def load_shopping():
	with open('http/shopping.json', 'r') as f:
		tmp = f.readlines()
	return json.loads("\n".join(tmp))

def save_shopping(shopping):
	with open('http/shopping.json', 'w') as f:
		json.dump(shopping, f)

@app.route("/update_shopping", methods=['POST', 'GET'])
def update_shopping():
	name = None
	print(request)
	print(request.form)
	name = request.form['item']
	print(name)
	if len(name) > 0:
		
		print('opening')
		shopping = load_shopping()
		if name == "reset":
			shopping = []
		elif name == "remove 1":
			shopping = shopping[:-1]
		elif name == "remove 5":
			shopping = shopping[:-5]
		else:
			shopping.append(name)
		save_shopping(shopping)
		return Response(json.dumps(shopping), mimetype='application/json')
	return '[]'

@app.route("/")
def hello():
	print("main?")
	return send_from_directory('http', 'index.html')


if __name__ == "__main__":
	app.run(debug=True)