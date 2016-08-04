import _ from 'lodash';
import React from 'react';
import {render} from 'react-dom';
import superagent from 'superagent';
import EffectList from './react_modules/EffectList.js';
import IngredientsList from './react_modules/IngredientsList.js';

class App extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			effects: [],
			ingredients: []
		};
		superagent
			.get('effects.json')
			.end((err, res) =>{
				this.state.effects = res;
			});
		superagent
			.get('effects.json')
			.end((err, res) =>{
				this.state.effects = res;
			});
	}

	render(){
		return(
			<div className="main">
				<EffectList data={this.state.effects} />
				<IngredientsList data={this.state.ingredients} />
			</div>
		);
	}

}

render((
	<Router history={browserHistory} onUpdate={() => window.scrollTo(0, 0)}>
		<Route path="/" component={App}>
			<IndexRoute component={Top}></IndexRoute>
		</Route>
	</Router>),
	document.getElementById('container')
);