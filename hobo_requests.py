import sys
import time
import requests
from requests.auth import HTTPBasicAuth
import json

def authenticate(user, password):
	URL = "https://webservice.hobolink.com/restv2/userAuthentication"

	data = {
  			"password": password,
  			"token": "",
  			"user": user
			}

	r = requests.post(URL, json = data)
	if str(r)[11:14] != '200':
		print(r)
	else:
		print(r)
		print(r.json())


def get_custom_data(users, devices, sensors):
	# setting request parameters
	URL = "https://webservice.hobolink.com/restv2/data/json"
	d = time.localtime()
	t1 = time.asctime(d)[10:19]
	prev_h = 12 if int(t1[1:3]) == 1 else int(t1[1:3]) - 1
	t0 = ' ' + str(prev_h) + t1[3:]
	start = str(d[0]) + '-' + str(d[1]) + '-' + str(d[2]) + t0
	end = str(d[0]) + '-' + str(d[1]) + '-' + str(d[2]) + t1

	params = {'users': users, 'devices': devices, 'sensors': sensors,
			 'start_date': start, 'end_date': end}

	# response handling
	r = requests.get(url = URL, params = params)
	data = r.json() if str(r)[11:14] == '200' else None
	if data == None:
		print("an error occured.")
	else:
		print(data)


def get_data_minmax_timestamp(dsn, user, password):
	timestamp = str(int(time.time() - 946684800))

	URL = "https://webservice.hobolink.com/restv2/private/data/minmax/{0}/{1}".format(dsn, timestamp)

	r = requests.get(url = URL, auth=HTTPBasicAuth(user, password))
	print(r)


def get_device_datafile(a_type, s_num, f_type, user, password):

	URL = "https://webservice.hobolink.com/restv2/{0}/devices/{1}/data_files/latest/{2}".format(a_type, s_num, f_type)

	r = requests.get(url = URL, auth=HTTPBasicAuth(user, password))

	if str(r)[11:14] != '200':
		print(r)
		print(r.json())
	else:
		print(r)


def status():
	URL = "https://webservice.hobolink.com/restv2/status/system"

	r = requests.post(URL, data = "")
	print(r)


if __name__ == '__main__':
	user = "procon"
	password = "8CSOnset!"
	access_type = 'private'
	serial_number = '20699245'
	file_type = 'txt'
	get_device_datafile(access_type, serial_number, file_type, user, password)
