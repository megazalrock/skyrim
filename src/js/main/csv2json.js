import _ from 'lodash';
export default function csv2json(text) {
	var rows = text.split("\n");
	var keys = [];
	var result = rows.map((row, index) => {
		if(index === 0){
			keys = row.split(',');
		}else {
			var rowData = {};
			row.split(',').forEach((value, colNum) => {
				rowData[keys[colNum]] = parseFloat(value) || value;
			});
			return rowData;
		}
	});
	result.shift();
	return result;
}