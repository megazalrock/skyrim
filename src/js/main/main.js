import _ from 'lodash';
import React from 'react';
import {render} from 'react-dom';
import superagent from 'superagent';
import {I18nextProvider} from 'react-i18next';
import i18n from './i18n';
import EffectList from './react_modules/EffectList.js';
import IngredientsList from './react_modules/IngredientsList.js';
import csv2json from './csv2json.js';


class App extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			effects: {},
			ingredients: [],
			selectedEffects: [],
			lang: 'ja'
		};	
		superagent
			.get('ingredients.csv')
			.end((err, res) => {
				if(_.isNull(err)){
					var ingredients = csv2json(res.text);
					this.setState({
						ingredients: ingredients
					});
				}
			});

		superagent
			.get('effects.json')
			.end((err, res) =>{
				if(_.isNull(err)){
					this.setState({
						effects: res.body
					});
				}
			});

		/*var jsonGetter = new Promise((resolve, reject) => {
			var effects = {}, ingredients = [];
			var resolver = () => {
				if(!_.isEmpty(effects) && !_.isEmpty(ingredients)){
					resolve({
						effects: effects,
						ingredients: ingredients
					});
				}
			};
		});

		jsonGetter
			.then((obj) => {
				this.setState(obj);
				console.log(this.state);
			})
			.catch((err) => {
				console.error(err);
			});*/
	}

	shouldComponentUpdate(nextProps, nextState){
		return nextState.effects !== this.state.effects || nextState.ingredients !== this.state.ingredients;
	}

	render(){
		//console.log(this.state);
		return(
			<div className="main">
				<EffectList data={this.state.effects} lang={this.state.lang} />
				<IngredientsList data={this.state.ingredients} />
			</div>
		);
	}

}

render(
	<I18nextProvider i18n={i18n}><App /></I18nextProvider>,
	document.getElementById('container')
);