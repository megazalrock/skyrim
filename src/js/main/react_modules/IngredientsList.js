import _ from 'lodash';
import React from 'react';
import {translate} from 'react-i18next';

export default class IngredientsList extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			isMounted: false
		};
	}

	handleSelectEffect(effect){
		this.props.onSelectedEffectsChange(effect);
	}

	getSelectedEffectClass(effect){
		return _.includes(this.props.selectedEffects, effect) ? ' selected' : '';
	}

	componentDidMount(){
		this.setState({
			isMounted: true
		});
	}
	
	render(){
		const {t} = this.props;
		if(this.props.visibleIngredients.length){
			let Ingredients = this.props.visibleIngredients.map((row) => {
				return (
					<tr key={_.snakeCase(row.name)}>
						<th className="name">{t(row.name)}</th>
						<td className={['effect', this.getSelectedEffectClass(row.effect1), this.props.convertEffectNameToClassName(row.effect1)].join(' ')} onClick={this.handleSelectEffect.bind(this, row.effect1)}>{t(row.effect1)}</td>
						<td className={['effect', this.getSelectedEffectClass(row.effect2), this.props.convertEffectNameToClassName(row.effect2)].join(' ')} onClick={this.handleSelectEffect.bind(this, row.effect2)}>{t(row.effect2)}</td>
						<td className={['effect', this.getSelectedEffectClass(row.effect3), this.props.convertEffectNameToClassName(row.effect3)].join(' ')} onClick={this.handleSelectEffect.bind(this, row.effect3)}>{t(row.effect3)}</td>
						<td className={['effect', this.getSelectedEffectClass(row.effect4), this.props.convertEffectNameToClassName(row.effect4)].join(' ')} onClick={this.handleSelectEffect.bind(this, row.effect4)}>{t(row.effect4)}</td>
						<td className="weight">{t(row.weight)}</td>
						<td className="value">{t(row.value)}</td>
					</tr>
				);
			});

			return (
				<div className="ingredientsBox">
					<table className="ingredientsTable">
						<thead>
							<tr>
								<th className="name">{t('Name')}</th>
								<td className="effect effect1">{t('Primary Effect')}</td>
								<td className="effect effect2">{t('Secondary Effect')}</td>
								<td className="effect effect3">{t('Tertiary Effect')}</td>
								<td className="effect effect4">{t('Quaternary Effect')}</td>
								<td className="weight">{t('Weight')}</td>
								<td className="value">{t('Value')}</td>
							</tr>
						</thead>
						<tbody>
							{Ingredients}
						</tbody>
					</table>
				</div>
			);
		}else{
			return (
				<div className="ingredientsBox">
					<div className="messeage">
						{t('Not applicable')}
					</div>
				</div>
			);
		}

	}
}

export default translate(['common', 'ingredients', 'effects'], {wait: true})(IngredientsList);