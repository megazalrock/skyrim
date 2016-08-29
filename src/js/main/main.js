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
		this.selectedEffects = [];
		this.state = {
			effects: {},
			ingredients: [],
			selectedEffects: [],
			visibleIngredients: [],
			searchMode: 'or'
		};	
		superagent
			.get('ingredients.csv')
			.end((err, res) => {
				if(_.isNull(err)){
					var ingredients = csv2json(res.text);
					this.setState({
						ingredients: ingredients,
						visibleIngredients: ingredients
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
	}

	handleSelectedEffectsChange(effect){
		if(_.includes(this.selectedEffects, effect)){
			_.remove(this.selectedEffects, (_effect) => {
				return _effect === effect;
			});
		}else{
			this.selectedEffects.push(effect);
		}
		this.searchIngredients();
	}

	handleDeslectAll(){
		this.selectedEffects = [];
		this.searchIngredients();
	}

	handleModeChange(searchMode){
		this.searchIngredients(searchMode);
	}

	searchIngredients(searchMode){
		var result = [];
		searchMode = searchMode || this.state.searchMode
		if(this.selectedEffects.length){
			if(searchMode === 'or'){
				result = _.filter(this.state.ingredients, (ingredient) => {
					return _.some(this.selectedEffects, (value) => {
						return _.includes(ingredient, value);
					});
				})
			}else{
				result = _.filter(this.state.ingredients, (ingredient) => {
					return _.every(this.selectedEffects, (value) => {
						return _.includes(ingredient, value);
					});
				});
			}
		}else{
			result = this.state.ingredients;
		}
		this.setState({
			searchMode: searchMode,
			visibleIngredients: result,
			selectedEffects: this.selectedEffects
		});

	}

	render(){
		return(
			<div className="main">
				<EffectList
					selectedEffects={this.state.selectedEffects}
					effects={this.state.effects}
					onSelectedEffectsChange={this.handleSelectedEffectsChange.bind(this)}
					onDeselectAll={this.handleDeslectAll.bind(this)}
					searchMode={this.state.searchMode}
					onChangeMode={this.handleModeChange.bind(this)}
				/>
				<IngredientsList
					selectedEffects={this.state.selectedEffects}
					visibleIngredients={this.state.visibleIngredients}
					ingredients={this.state.ingredients}
					onSelectedEffectsChange={this.handleSelectedEffectsChange.bind(this)}
				/>
			</div>
		);
	}
}

render(
	<I18nextProvider i18n={i18n}><App /></I18nextProvider>,
	document.getElementById('container')
);