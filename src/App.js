import './App.css';
import React from "react";
import QueryBuilder from "./QueryBuilder";
import "./style.css"

class QueryBuilderApp extends React.Component {
  state = {
    query2: {
      type: 'RuleGroup',
      operator: '&&',
      not: false,
      children: [
        {
          type: 'Condition',
          operator: '==',
          field: 'Theme',
          value: 'val',
        },
      ],
    },
  };

  

  onQuery2Update = (queryBuilder) => {
    this.setState({
      query2: queryBuilder.getQuery(),
    });
  };

  


  render() {
    const query2String = QueryBuilder.queryToString(this.state.query2);
    console.log(query2String);

    return (
      <div className="queryBuilderApp">
        <center><h1>Build Your Query: </h1></center>
        <h3> 
        <pre className="result">Query: {query2String}</pre>
        </h3>
        <QueryBuilder initialQuery={this.state.query2} onQueryUpdate={this.onQuery2Update} />
        <button onClick={() => window.location.reload(true)}>Back</button>
        <button onClick={() => {navigator.clipboard.writeText(query2String); alert("Copied");}}>Copy</button>
      </div>
    );
  }
};
 

function App() {
  return (
    <QueryBuilderApp />
  );
}

export default App;



