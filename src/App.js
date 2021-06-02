import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Course from "./components/course/course";
import EvaluationForm from "./components/form/evaluationForm";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/login"></Route>
        <Route path="/course/:courseId/new-eval">
          <EvaluationForm />
        </Route>
        <Route path="/course/:courseId">
          <Course />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
