import _ from 'lodash';
import React from 'react';
import {translate} from 'react-i18next';
export default class EffectList extends React.Component{

	constructor(){
		this.props = {
			selectedEffects: []
		};
	}

	render(){
		return(
			<div className="mainUi">


			</div>
		);
	}
}


export default translate(['common', 'effects'], {wait: true})(EffectList);