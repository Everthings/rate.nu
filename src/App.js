import "./App.css";
import "rsuite/dist/styles/rsuite-default.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Course from "./components/course/course";
import Section from "./components/section/section";
import EvaluationForm from "./components/form/evaluationForm";
import Login from "./components/login/login";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/signup"></Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/course/:courseId/:sectionId/new-eval">
          <EvaluationForm />
        </Route>
        <Route path="/course/:courseId/new-eval">
          <EvaluationForm />
        </Route>
        <Route path="/course/:courseId/:sectionId">
          <Section />
        </Route>
        <Route path="/course/:courseId">
          <Course />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
