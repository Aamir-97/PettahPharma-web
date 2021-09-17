import React from 'react';
import AnnualExpenseReport from "src/components/reports/AnnualExpenseReport";

class DataComponent2 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          records: [],
          isLoaded: false,
        };
      }
    
      componentDidMount() {
        fetch('http://localhost:3001/viewexpensesummaryReport')
          .then(res => res.json())
          .then(result => {
            this.setState({
              isLoaded: true,
              records: result,
    
            });
          });
          
      }
    

    render() {
      return (
          <div >
          <AnnualExpenseReport />
        </div>    
      );
    }
  }

  export default DataComponent2;