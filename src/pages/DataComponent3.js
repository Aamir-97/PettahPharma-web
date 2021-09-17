import React from 'react';
import AnnualTaskReport from "src/components/reports/AnnualTaskReport";

class DataComponent3 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          records: [],
          isLoaded: false,
        };
      }
    
      componentDidMount() {
        fetch('http://localhost:3001/viewtasksummaryReport')
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
          <AnnualTaskReport />
        </div>    
      );
    }
  }

  export default DataComponent3;