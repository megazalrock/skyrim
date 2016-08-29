import _ from 'lodash';
import React from 'react';
import {translate} from 'react-i18next';

export default class EffectList extends React.Component{
	constructor(props){
		super(props);
		console.log(this.props);
		//console.log(this.props);
	}

	render(){
		const {t} = this.props;
		return (
			<div>{t('Fear')}</div>
		);


		/*var Items = this.props.data.map((item, index) => {
			var key = _.snakeCase(item.en);
			return (
				<tr key={key} className="effect">
					<td className="name">
						{item[this.props.lang]}
					</td>
					<td>
						{item.type}
					</td>
				</tr>
			);
		});

		return(
			<table className="effectList">
				<tbody>
					{Items}
				</tbody>
			</table>
		);*/
	}
}

export default translate(['effects'], {wait: true})(EffectList);