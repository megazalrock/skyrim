import _ from 'lodash';
import React from 'react';

export default class IngredientsList extends React.Component{
	constructor(props){
		super(props);
	}
	
	render(){
		var Items = this.props.data.map((item, index) => {
			var key = _.snakeCase(item.name);
			/*return {
				<tr key={key} className="item">
					<td className="dlc">
						{item.dlc}
					</td>
					<th className="name">
						{item.name}
					</th>
					{Effects}
				</tr>
			}
*/

			/*var key = _.snakeCase(item.name);
			var Effects = item.effect.map((effect, effectIndex) => {
				return (
					<td key={[key, effectIndex].join('_')} className="effect">{effect}</td>
				);
			});
			return (
				<tr key={key} className="item">
					<td className="dlc">
						{item.dlc}
					</td>
					<th className="name">
						{item.name}
					</th>
					{Effects}
				</tr>
			);*/
		});
		return (
			<div>ingredients</div>
		);

		/*return(
			<table className="ingredientsList">
				<thead>
					<td></td>
				</thead>
				<tbody>
					{Items}
				</tbody>
			</table>
		);*/
	}
}