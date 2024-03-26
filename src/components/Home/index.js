import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = props => {
  const onClickFindJobs = () => {
    const {history} = props
    history.push('/jobs')
  }

  return (
    <div className="home-container">
      <Header />
      <div className="home-page">
        <div className="home-page-content">
          <h1 className="home-heading">
            Find The Job That <br /> Fits Your Life
          </h1>
          <p className="home-description">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your abilities and
            potential.
          </p>
          <Link to="/jobs">
            <button
              className="find-jobs-button"
              type="button"
              onClick={onClickFindJobs}
            >
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
