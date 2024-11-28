import React from 'react';
import {Route,Routes} from "react-router"
import './App.css';
import ReviewDetails from './Components/ReviewDetails/ReviewDetails';
import AddReview from './Components/AddReview/AddReview';
import UpdateReview from './Components/UpdateReview/UpdateReview';


function App() {
  return (
    <div className="App">
     <React.Fragment>
      <Routes>
      <Route path="/" element={<AddReview/>}/>
        <Route path="/create" element={<AddReview/>}/>
        <Route path="/reviewDetails" element={<ReviewDetails/>}/>
        <Route path="/update-review/:id" element={<UpdateReview />} />


      </Routes>
     </React.Fragment>
    </div>
  );
}

export default App;
