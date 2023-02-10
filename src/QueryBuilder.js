import React from 'react';
import Freezer from 'freezer-js';

import PropTypes from 'prop-types';
import RuleGroup from './RuleGroup';
import Condition from './Condition';
// Helper function for converting query to a string

const queryToString = query => {
  if (!query) {
    return '';
  }

  let result;

  if (query.type === 'RuleGroup') {
    if(query.not)
        result = '!(';
    else
    result = '(';

    for (let i = 0, length = query.children.length; i < length; ++i) {
      result += queryToString(query.children[i]);

      if (i + 1 < length) {
        result += ` ${query.operator} `;
      }
    }

    result += ')';
  } else if (query.type === 'Condition') {
    if(`${query.operator}` !== ".isEmpty")
    result = `${query.field} ${query.operator} ${query.value}`;
    else result = `${query.field}${query.operator}`;
  } else {
    console.error('RuleGroup or Condition');
    return '';
  }

  return result;
};

class QueryBuilder extends React.Component {
    
  static queryToString = queryToString;

    static propTypes = {
    initialQuery: PropTypes.object,
    onQueryUpdate: PropTypes.func,
  };
  static defaultProps = {
    initialQuery: {
      type: 'RuleGroup',
      operator: '&&',
      not: false,
      children: [],
    },
    onQueryUpdate: queryBuilder => {},
  };
state = {
    queryFreezerStore: new Freezer(this.props.initialQuery),
    query: this.props.initialQuery,
  };

componentDidMount() {
    // Update state every time query changes
    this.setState({query: this.state.queryFreezerStore.get()});
    const queryListener = this.state.queryFreezerStore.get().getListener();
    queryListener.on('update', updated => {
      this.setState({
        query: updated,
      }, this.props.onQueryUpdate(this));

      this.props.onQueryUpdate(this);
    });

    this.props.onQueryUpdate(this);
  }

     getQuery = () => {
    return this.state.queryFreezerStore.get();
  };

    getQueryString = () => {
    return queryToString(this.state.queryFreezerStore.get());
  };

     render() {
    let childView = null;
    if (this.state.query.type === 'RuleGroup') {
      childView = <RuleGroup query={this.state.queryFreezerStore.get()} parent={null} index={0} />;
    } else if (this.state.query.type === 'Condition') {
      childView = <Condition query={this.state.queryFreezerStore.get()} parent={null} index={0} />;
    } else {
      console.error('RuleGroup or Condition');
      return null;
    }

    return (
      <div className="queryBuilder">
        {childView}
      </div>
      //asd
    );
  }
};

export default QueryBuilder;



