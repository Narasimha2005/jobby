import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <div>
    <Header />
    <div className="home-page">
      <h1 className="home-page-heading">Find The Job That Fits Your Life</h1>
      <p className="home-page-paragraph">
        Millions of people are searching for jobs, salary information, company
        reviews, Find the job that fits for your abilities and potential.
      </p>
      <Link to="/jobs">
        <button className="home-page-button" type="button">
          Find Jobs
        </button>
      </Link>
    </div>
  </div>
)

export default Home
