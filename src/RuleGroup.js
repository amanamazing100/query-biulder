import React from 'react';
import Condition from './Condition';
import PropTypes from 'prop-types';
import {useEffect} from 'react';

const operators = [
    { value: '&&', display: 'AND', display2: 'All', className: 'and' },
    { value: '||',  display: 'OR',  display2: 'Any', className: 'or' }
];

const operatorOptions = operators.map((operator, index) => {
    const classString = `operator ${operator.className}`;
    return <option className={classString} value={operator.value} key={index}>{operator.display}</option>;
});


//jhvjh
class RuleGroup extends React.Component {
    static propTypes = {
        query: PropTypes.object.isRequired,
        parent: PropTypes.object,
        index: PropTypes.number.isRequired
    };

    operatorAnd = () => {
        this.props.query.set('operator', "&&");
    };

    operatorOr = () => {
       this.props.query.set('operator',"||");
    };


    addCondition = (e) => {
        this.props.query.children.push({
            type: 'Condition',
            operator: '==',
            field: 'Theme',
            value: 'val'
        });
    };
    changeNot = () => {
        if(this.props.query.not)
            this.props.query.set('not', false);
        else this.props.query.set('not', true);
    }
    addGroup = (e) => {
        this.props.query.children.push({
            type: 'RuleGroup',
            operator: '&&',
            not: false,
            canRem: true,
            children: [{
          type: 'Condition',
          operator: '==',
          field: 'Theme',
          value: 'val',
        },]
        });
    };

    removeSelf = (e) => {
        if (this.props.parent) {
            this.props.parent.children.splice(this.props.index, 1);
        }
    };

    displayRem = (obj) => {
        if(obj.parent)
            return (
                <button className="conditionGroupButton removeGroup" onClick={this.removeSelf}>-</button>
                );
        else
        return;
    }

    render() {
        const childrenViews = this.props.query.children.map((childQuery, index) => {
            if (childQuery.type === 'RuleGroup') {
                 return <RuleGroup query={childQuery} parent={this.props.query} index={index} key={index} />;
            }
            else if (childQuery.type === 'Condition') {
                  return <Condition query={childQuery} parent={this.props.query} index={index} key={index} />;
            }
            else {
                console.error('RuleGroup or Condition');
                return null;
            }
        });

        return (
            <div className="query conditionGroup">
                <div className="childrenConditions">
                Not: <input type="checkbox" value={this.props.query.not} onClick={this.changeNot}></input>
                
                <button className="operators andOp" onClick={this.operatorAnd}>AND</button>
                <button className="operators orOp" onClick={this.operatorOr}>OR</button>
                {this.displayRem(this.props)}            
                    {childrenViews}

                <button className="conditionGroupButton addCondition" onClick={this.addCondition}> Add Condition</button>
                <button className="conditionGroupButton addGroup" onClick={this.addGroup}> Add Group</button>
                </div>
            </div>
        );
    }
};

export default RuleGroup;


    

    

    

    

    

        
