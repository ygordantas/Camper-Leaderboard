class App extends React.Component {

    state = {
      month: [],
      allTimes: [],
      activeList: "month"
    };
  
  // urlMonth = 'https://fcctop100.herokuapp.com/api/fccusers/top/recent';
  // urlAll =  'https://fcctop100.herokuapp.com/api/fccusers/top/alltime';
  
  
  componentDidMount() {
      axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/recent')
      .then(response => {
        this.setState({
          month: response.data
          });
        })
          .catch(function (error) {
            console.log(error);
          }); 
          
          axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/alltime')
          .then(response=>{
            this.setState({
              allTimes: response.data
              });
            })
              .catch(error => {
                console.log(error);
              });  
  
    }
  
    
    showRecentHandler = () => {
      this.setState({
        activeList: "month"
      });
    }
  
    showAllTimesHandler = () => {
      this.setState({
        activeList: "all"
      });
    }
  
    render() {
      
      let classBtn = "btn btn-custom";
      let actveBtn = "btn btn-active"
      let list = null;
  
      if(this.state.activeList === "month"){
        
        list = (
          <div>
            {this.state.month.map((person, i)=>{
              return (
  
                <div className="list-group">
                  <a target="_blank" key={uuid()} href={`https://www.freecodecamp.org/${person.username}`} className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                      
                      <h5 className="mb-1"># {i+1}: {person.username}</h5>
                      
                      <small><img src={person.img} className="camper-img" alt="camper avatar" /></small>
                    </div>
                    <p className="mb-1">Points in the last 30 days: {person.recent} </p>
                    <small>All time points: {person.alltime}</small>
                  </a>
              </div>  
            );
            })}
          </div>
        );
      } else if (this.state.activeList === "all") {
        list = (
          <div>
            {this.state.allTimes.map((person, i)=>{
             return (
  
                <div className="list-group">
                  <a target="_blank" key={uuid()} href={`https://www.freecodecamp.org/${person.username}`} className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                      
                      <h5 className="mb-1"># {i+1}: {person.username}</h5>
                      
                      <small><img src={person.img} className="camper-img" alt="camper avatar"/></small>
                    </div>
                    <p className="mb-1">All time points: {person.alltime}</p>
                    <small>Points in the last 30 days: {person.recent} </small>
                  </a>
              </div>  
            );
            })}
          </div>
        );
      } 
  
      return (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xs-12">
              <h1 className="display-3">Camper's Leaderboard</h1>
            </div>
          </div>
          <div className="row justify-content-center board">
            
            <div className="col-xs-6">
              <button className="btn btn-custom" onClick={this.showRecentHandler.bind(this)}>Points in past 30 days</button>
            </div>
            <div className="col-xs-6">
              <button className="btn btn-custom" onClick={this.showAllTimesHandler.bind(this)}>All time points</button>
            </div>
          </div>
        <ol>{list}</ol>
          
          <div className="footer">
            <div className="row justify-content-center ">
              <div className="col-xs-12">
                  <h6 className="footer-text">Powered by <a target="_blank" className="footer-link" href="https://ygordantas.github.io/">Ygor Dantas</a></h6>
              </div>
            
              
            </div>
            
          </div>
          
          
        </div>
      );
    }
  }
  
  ReactDOM.render(<App />, document.getElementById('root'));