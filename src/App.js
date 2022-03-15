
import './App.css';
import './components/css/styles.css';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom'
import Login from './components/Login';
import Protected from './Protected';
import Create from './components/admin/Create';
import Usuarios from './components/admin/Usuarios';
import Test from './components/user/Test';
import Resultado from './components/admin/Resultado';
import  Update from './components/admin/Update';
import ProtectedUser from './ProtectedUser';
import Cargo from './components/admin/Cargo';
import List from './components/admin/List';
import Vigencia from './components/admin/Vigencia';
import EditarVigencia from './components/admin/EditarVigencia';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
        
        <Route path="/usuarios">
          <Protected Cmp={Usuarios}/>
        </Route>
        <Route path="/test">
          <ProtectedUser Cmp={Test}/>
        </Route>
        <Route path="/create">
          <Protected Cmp={Create}/>
        </Route>
        <Route path="/list/resultado/:id/:iduser">
          <Protected Cmp={Resultado}/>
        </Route>
        <Route path="/update/:id">
          <Protected Cmp={Update}/>
        </Route>
        <Route path="/cargo">
          <Protected Cmp={Cargo}/>
        </Route>
        <Route path="/list/:id">
          <Protected Cmp={List}/>
        </Route>
        <Route path="/vigencia">
          <Protected Cmp={Vigencia}/>
        </Route>
        <Route path="/editarVigencia">
          <Protected Cmp={EditarVigencia}/>
        </Route>
        <Route path="/" exact>
          <Login/>
        </Route>
        </Switch>
      </Router>     
    </div>
  );
}

export default App;
