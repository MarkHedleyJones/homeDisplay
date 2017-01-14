from flask import Flask, request, send_from_directory, redirect, Response
import pprint
import json
import modules.weather
import time
import os
import subprocess
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

def download_weather():
	print("/download_weather")
	weather = modules.weather.get_weather('Tauranga')
	with open('http/weather.json', 'w') as f:
		f.write(json.dumps(weather, sort_keys=True))
	return weather
	# return Response(weather, mimetype='application/json')

@app.route("/get_weather")
def weather():
	print("/weather")
	if os.path.exists('http/weather.json'):
		with open('http/weather.json', 'r') as f:
			tmp = f.readlines()
		try:
			weather_cached = json.loads("\n".join(tmp))
			print("Returned cached weather")
			# return Response(json.dumps(weather_cached), mimetype='application/json')

		except:
			print("Failed to load json weather, returning fresh download")
			return Response(json.dumps(download_weather()), mimetype='application/json')

		if 'FETCHED' in weather_cached and (time.time() - weather_cached['FETCHED']) < 60 * 5:
			print("Returning cached weather")
			return Response(json.dumps(weather_cached), mimetype='application/json')
			# return send_from_directory('http', 'weather.json')
		else:
			print("Cached weather expired, returning fresh download")
			return Response(json.dumps(download_weather()), mimetype='application/json')
	else:
		print("No cache exists, returning fresh download")
		return Response(json.dumps(download_weather()), mimetype='application/json')

@app.route("/set_barcode", methods=['POST', 'GET'])
def set_barcode():
	print("/set_barcode")
	barcode = request.args.get('barcode')
	description = request.args.get('description')
	print(request.args.get('barcode'))
	print(barcode, description)

	# The source file may be incorrectly configured or missing
	if os.path.exists("../Household-Barcode-Database/source.txt"):

		line = description + ";" + barcode + "\n"
		needs_saving = True
		needs_newline = False
		# Check the source file doesn't contain this line already
		with open("../Household-Barcode-Database/source.txt", "r") as f:
			codes = f.readlines()
			if line in codes:
				needs_saving = False

			if codes[-1][-1] != '\n':
				needs_newline = True



		if needs_saving:
			print("Needs saving")
		else:
			print("Does not need saving!!!")

		if needs_newline:
			print("Needs newline")
		else:
			print("Does not need newline!!!")

		if needs_saving:
			with open("../Household-Barcode-Database/source.txt", "a") as f:
				if needs_newline:
					f.write("\n")
				f.write(line)

			os.system(" ".join(["cd", "../Household-Barcode-Database", "&&", "python", "convert_txt_to_json.py"]))
			os.system(" ".join(["cd", "../Household-Barcode-Database", "&&", "git", "add", ".", "&&", "git", "commit", "-m", '"Interface added barcode"', "&&", "git", "push"]))

			return "Barcode saved;"+line[:-1]
		else:
			return "Barcode saved;"+line[:-1]
	return "Barcode saving not configured correctly"

@app.route("/get_shopping")
def get_shopping():
	print("/get_shopping")
	if os.path.exists('http/shopping.json'):
		print("Returning shopping.json from directory")
		return send_from_directory('http', 'shopping.json')
	else:
		with open('http/shopping.json', 'w') as f:
			# json.dumps([], f)
			f.write("[]")
		print("Returning empty shopping.json file")
		return Response([], mimetype='application/json')

def load_shopping():
	print("/load_shopping")
	with open('http/shopping.json', 'r') as f:
		tmp = f.readlines()
	return json.loads("\n".join(tmp))

def save_shopping(shopping):
	print("/save_shopping")
	with open('http/shopping.json', 'w') as f:
		json.dump(shopping, f)

@app.route("/update_shopping", methods=['POST', 'GET'])
def update_shopping():
	print("/update_shopping")
	name = None
	print(request)
	print(request.form)
	name = request.form['item']
	print(name)
	if len(name) > 0:
		print('opening')
		shopping = load_shopping()
		if name in shopping:
			shopping.remove(name)
		elif name == "reset":
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
	return send_from_directory('http', 'index.html')


if __name__ == "__main__":
	app.run(debug=True)