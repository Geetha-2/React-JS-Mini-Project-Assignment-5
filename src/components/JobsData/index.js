import {Link} from 'react-router-dom'

import {RiMapPin2Fill} from 'react-icons/ri'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobsData = props => {
  const {jobsData} = props
  const {
    id,
    companyLogoUrl,
    title,
    location,
    rating,
    employmentType,
    jobDescription,
    packagePerAnnum,
  } = jobsData

  return (
    <Link className="jobs-data-link" to={`/jobs/${id}`}>
      <>
        <div className="company-logo-title-rating-cont">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo-img"
          />
          <div className="title-rating-cont">
            <h1 className="company-name">{title}</h1>
            <div className="star-rating-count-cont">
              <img
                src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
                alt="stars"
                className="star-image"
              />
              <p className="rating-text">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-employment-type-package-cont">
          <div className="location-employment-type-cont">
            <div className="location-icon-cont">
              <RiMapPin2Fill className="icon" />
              <p className="location-text">{location}</p>
            </div>
            <div className="employment-type-icon-cont">
              <BsBriefcaseFill className="icon" />
              <p className="employment-type-text">{employmentType}</p>
            </div>
          </div>
          <p className="package-text">{packagePerAnnum}</p>
        </div>
        <hr className="hr-line-jobs" />
        <h1 className="description-heading">Description</h1>
        <p className="job-description-text">{jobDescription}</p>
      </>
    </Link>
  )
}

export default JobsData
