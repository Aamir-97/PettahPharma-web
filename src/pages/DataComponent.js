import React from 'react';
import AnnualVisitReport from "src/components/reports/AnnualVisitReport";

class DataComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          records: [],
          isLoaded: false,
        };
      }
    
      componentDidMount() {
        fetch('http://localhost:3001/viewvisitsummaryReport')
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
          <AnnualVisitReport />
        </div>    
      );
    }
  }

  export default DataComponent;