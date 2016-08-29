import _ from 'lodash';
import React from 'react';
import {translate} from 'react-i18next';

export default class EffectList extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			isPotionHidden: false,
			isPoisonHidden: false,
		};
	}

	handleSelectEffect(effect){
		this.props.onSelectedEffectsChange(effect);
	}

	handleDeslectAll(){
		this.props.onDeselectAll();
	}

	togglePotionHidden(){
		this.setState({
			isPotionHidden: !this.state.isPotionHidden
		});
	}

	togglePoisonHidden(){
		this.setState({
			isPoisonHidden: !this.state.isPoisonHidden
		});
	}

	handleModeChange(mode){
		this.props.onChangeMode(mode);
	}

	getSelectedEffectClass(effect){
		return _.includes(this.props.selectedEffects, effect) ? 'selected' : '';
	}

	convertEffectNameToClassName(effect){
		console.log(effect);
		var result = [];
		var classNameList = [
			'health',
			'stamina',
			'magicka',
			'ravage',
			'damage',
			'lingering damage',
			'restore',
			'resist',
			'fortify',
			'paralysis',
			'invisibility',
			'fear',
			'slow',
			'frenzy',
			'waterbreathing',
			'cure disease',
			'regen',
			'weakness'
		];

		effect = effect.toLowerCase();

		_.forEach(classNameList, (part) => {
			//console.log(part);
			if(_.includes(effect, part)){
				result.push(_.snakeCase(part));
			}
		});

		return result.join(' ');

	}

	render(){
		const {t} = this.props;
		if(_.isEmpty(this.props.effects)){
			return (
				<div className="loading">loading...</div>
			);
		}else{
			let makeEffectList = (list) => {
				var Effects = Object.keys(list).map((key) => {
					var EffectList = list[key].map((effect) => {
						return (
							<li key={_.snakeCase(effect)} className={this.convertEffectNameToClassName(effect) + ' ' + this.getSelectedEffectClass(effect)} onClick={this.handleSelectEffect.bind(this, effect)}>{t(effect)}</li>
						);
					});
					return (
						<div className={'category ' + _.snakeCase(key)} key={_.snakeCase(key)}>
							<h4>{t(key)}</h4>
							<ul>
								{EffectList}
							</ul>
						</div>
					);
				});
				return Effects;
			};
			//console.log(this.state.isPotionHidden);

			return (
				<div className="effectsBox">
					<div className="effectList">
						<div className={'type potion' + (this.state.isPotionHidden ? ' hidden' : '')}>
							<h3 onClick={this.togglePotionHidden.bind(this)}>{t('Potion')}</h3>
							<div className="categories">
								{makeEffectList(this.props.effects.Potion)}
							</div>
						</div>
						<div className={'type poison' + (this.state.isPoisonHidden ? ' hidden' : '')}>
							<h3 onClick={this.togglePoisonHidden.bind(this)}>{t('Poison')}</h3>
							<div className="categories">
								{makeEffectList(this.props.effects.Poison)}
							</div>
						</div>
					</div>
					<div className="buttons">
						<div className={'button' + (this.props.searchMode === 'or' ? ' selected' : '')} onClick={this.handleModeChange.bind(this, 'or')}>OR</div>
						<div className={'button' + (this.props.searchMode === 'and' ? ' selected' : '')} onClick={this.handleModeChange.bind(this, 'and')}>AND</div>
						<div className="button" onClick={this.handleDeslectAll.bind(this)}>{t('Deselect All')}</div>
					</div>
				</div>
			);
		}
	}
}

export default translate(['common', 'effects'], {wait: true})(EffectList);