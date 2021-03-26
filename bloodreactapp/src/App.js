import logo from './logo.svg';
import './App.css';
import {store} from  './actions/store';
import {Provider} from 'react-redux'
import  DCandidates  from './components/DCandidates';
import DCandidatesForm from './components/DCandidatesForm';

function App() {
  return (
    <Provider store={store}>
        <DCandidates></DCandidates>
        <DCandidatesForm></DCandidatesForm>
    </Provider>
);
}

export default App;
