import React from 'react';
import PropTypes from 'prop-types';
const operators = [
    { value: '==',   display: 'Equals',   className:'equals' },
    { value: '!=',  display: 'Does not equals',  className:'doesNotEquals' },
    { value: '~',   display: 'Like',   className:'like' },
    { value: '!~',  display: 'Not Like',  className:'notLike' },
    { value: '.isEmpty',   display: 'Is empty',   className:'isEmpty' },
    { value: '===',  display: 'Is',  className:'is' },
    { value: '!==',  display: 'Is Not',  className:'isNot' }
];
const fields = [
    { value: 'Theme',   display: 'Theme',   className:'theme' },
    { value: 'Sub-theme',  display: 'Sub-theme',  className:'subTheme' },
    { value: 'Reason',   display: 'Reason',   className:'reason' },
    { value: 'Language',  display: 'Language',  className:'language' },
    { value: 'Source',   display: 'Source',   className:'source' },
    { value: 'Rating',  display: 'Rating',  className:'rating' },
    { value: 'Time Period',  display: 'Time Period',  className:'timePeriod' },
    { value: 'Customer ID',  display: 'Customer ID',  className:'customerID' }
];
const timeoperators = [
    { value: '==',   display: 'Equals',   className:'equals' },
    { value: '!=',  display: 'Does not equals',  className:'doesNotEquals' },
    { value: '.isEmpty',   display: 'Is empty',   className:'isEmpty' },
    { value: '>=',  display: 'Is Greater',  className:'isGreater' },
    { value: '<=',  display: 'Is Lesser',  className:'isLesser' }
];
const operatorOptions = operators.map((operator, index) => {
    const classString = `operator ${operator.className}`;
    return (
        <option className={classString} value={operator.value} key={index}>
            {operator.display}
        </option>
    );
});

const timeOperatorOptions = timeoperators.map((operator, index) => {
    const classString = `operator ${operator.className}`;
    return (
        <option className={classString} value={operator.value} key={index}>
            {operator.display}
        </option>
    );
});


const operatorOptionsChoice = (string) => {
    if(string !== "Time Period")
        return operatorOptions;
    return timeOperatorOptions;
};

const fieldOptions = fields.map((field, index) => {
    const classString = `field ${field.className}`;
    return (
        <option className={classString} value={field.value} key={index}>
            {field.display}
        </option>
    );
});

class Condition extends React.Component {
    static propTypes = {
        query: PropTypes.object.isRequired,
        parent: PropTypes.object.isRequired,
        index: PropTypes.number.isRequired
    }

    onOperatorChange = (e) => {
        this.props.query.set('operator', e.target.value);
    }

    onFieldChange = (e) => {
        this.props.query.set('field', e.target.value);
    }

    onValueChange = (e) => {
        this.props.query.set('value', e.target.value);
    }

    removeSelf = (e) => {
        if (this.props.parent) {
            this.props.parent.children.splice(this.props.index, 1);
        }
    }
    displayInput(string, field) {
        if(string === '.isEmpty')
            return;
        if(field !== "Customer ID" && field !== "Time Period")
        return (
                <div className="valueParent">
                    <div className="heading">
                        Value
                    </div>
                    <div className="valueClass">
                    
                <input type="text" className="value" value={this.props.query.value} onChange={this.onValueChange} />
                    </div>
                </div>);
        return (
                <div className="valueParent">
                    <div className="heading">
                        Value
                    </div>
                    <div className="valueClass">
                    
                <input type="number" className="value" value={this.props.query.value} onChange={this.onValueChange} />
                    </div>
                </div>);
    }
    displayRem = (obj) => {
        if(obj.parent.children.length > 1)
            return(
                <button className="conditionButton removeCondition" onClick={this.removeSelf}>-</button>);
                else return;
    }
    render() {
        return (
            <div className="query condition">
                <div className="fieldParent">
                    <div className="heading">
                        Fields
                    </div>
                    <div className="fieldClass">
                        <select className="fields" value={this.props.query.field} onChange={this.onFieldChange}>
                            {fieldOptions}
                        </select>
                    </div>
                </div>
                <div className="operatorsParent">
                    <div className="heading">
                        Operators
                    </div>
                    <div className="operatorsClass">
                    <select className="operators" value={this.props.query.operator} onChange={this.onOperatorChange}>
                        {operatorOptionsChoice(this.props.query.field)}
                    </select>
                    </div>
                </div>

                {this.displayInput(this.props.query.operator, this.props.query.field)}
                {this.displayRem(this.props)}
            
            </div>
        );
    }
}



export default Condition;

