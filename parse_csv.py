import sys
import csv
import re
import json

def parse_csv(filename):
	update = {} # {device_id: {sensor_id: {timestamp: {field1: ###, field2: ###, ...}}}}
	row_guide = [{},{}]

	with open(filename) as f:
		reader = csv.reader(f)

		first_row = True
		for row in reader:

			if row[0] == "Line#":
				data = {}

				for i in range(2, len(row)):
					r = re.compile('(?P<field>[^\(]+)\s\(\D*(?P<device_id>\d+):(?P<sensor_id>\d+-?\d*)[^,]*,\s((?P<unit>[^,]*))?')
					row_guide.append([m.groupdict() for m in r.finditer(row[i])][0])
				first_row = False

			elif not first_row:
				
				timestamp = row[1] if len(row) > 1 else ''
				if len(row) >= 2:
					for j in range(2, len(row)):
						device_id = row_guide[j]['device_id']
						field = row_guide[j]['field'] + " (" + row_guide[j]['unit'] + ")"
						sensor_id = row_guide[j]['sensor_id']
						if device_id in update:
							if field in update[device_id]:
								if sensor_id in update[device_id][field]:
									update[device_id][field][sensor_id][timestamp] = row[j]
								else:
									update[device_id][field][sensor_id] = {timestamp: row[j]}
							else:
								update[device_id][field] = {sensor_id: {timestamp: row[j]}}
						else:
							update[device_id] = {field: {sensor_id: {timestamp: row[j]}}}

	with open('formated_data.txt', 'w') as out:
		json.dump(update, out, indent=4, sort_keys=True)


if __name__ == '__main__':
	filename = "hobo_data_week.csv"
	parse_csv(filename)
