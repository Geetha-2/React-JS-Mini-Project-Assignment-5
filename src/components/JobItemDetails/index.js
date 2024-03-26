import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {RiMapPin2Fill} from 'react-icons/ri'
import {BsBriefcaseFill, BsBoxArrowUpRight} from 'react-icons/bs'

import Header from '../Header'
import SimilarJobs from '../SimilarJobs'

import './index.css'

const jobDetailsApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    updatedJobDetails: [],
    updatedSimilarJobs: [],
    jobDetailsApiStatus: jobDetailsApiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getFormattedDataJobDetails = data => ({
    title: data.title,
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    lifeAtCompanyDescription: data.life_at_company.description,
    lifeAtCompanyImageUrl: data.life_at_company.image_url,
    location: data.location,
    rating: data.rating,
    packagePerAnnum: data.package_per_annum,
    skills: data.skills.map(each => ({
      name: each.name,
      imageUrl: each.image_url,
    })),
  })

  getFormattedDataSimilarJobs = data => ({
    title: data.title,
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    location: data.location,
    rating: data.rating,
  })

  getJobItemDetails = async () => {
    this.setState({
      jobDetailsApiStatus: jobDetailsApiStatusConstants.inProgress,
    })

    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')

    const jobDetailsApiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(jobDetailsApiUrl, options)

    if (response.ok === true) {
      const fetchedData = await response.json()

      const updatedDataJobs = this.getFormattedDataJobDetails(
        fetchedData.job_details,
      )

      const updatedDataSimilarJobs = fetchedData.similar_jobs.map(each =>
        this.getFormattedDataSimilarJobs(each),
      )

      this.setState({
        updatedJobDetails: updatedDataJobs,
        updatedSimilarJobs: updatedDataSimilarJobs,
        jobDetailsApiStatus: jobDetailsApiStatusConstants.success,
      })
    } else {
      this.setState({
        jobDetailsApiStatus: jobDetailsApiStatusConstants.failure,
      })
    }
  }

  renderJobItemDetailsView = () => {
    const {updatedJobDetails, updatedSimilarJobs} = this.state

    const {
      title,
      companyLogoUrl,
      rating,
      location,
      employmentType,
      packagePerAnnum,
      jobDescription,
      skills,
      lifeAtCompanyDescription,
      lifeAtCompanyImageUrl,
      companyWebsiteUrl,
    } = updatedJobDetails

    return (
      <>
        <div className="updated-jobs-bg-container">
          <div className="company-logo-title-rating-cont">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
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
          <hr className="hr-line" />
          <div className="description-visit-cont">
            <h1 className="description-heading">Description</h1>
            <div className="visit-icon-cont">
              <a
                href={companyWebsiteUrl}
                className="visit-text"
                target="_blank"
                rel="noreferrer"
              >
                Visit
              </a>
              <BsBoxArrowUpRight className="visit-icon" />
            </div>
          </div>
          <p className="job-description-text">{jobDescription}</p>
          <h1 className="skills-heading">Skills</h1>
          <ul className="skills-container">
            {skills.map(eachSkill => (
              <li className="li-skills-cont" key={eachSkill.name}>
                <img
                  src={eachSkill.imageUrl}
                  alt={eachSkill.name}
                  className="skill-img"
                />
                <p className="skill-name">{eachSkill.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="life-at-company-heading">Life at Company</h1>
          <div className="life-at-company-cont">
            <p className="life-at-company-text">{lifeAtCompanyDescription}</p>
            <img
              src={lifeAtCompanyImageUrl}
              alt="life at company"
              className="life-at-company-img"
            />
          </div>
        </div>
        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="un-list-similar-jobs">
          {updatedSimilarJobs.map(eachSimilarJob => (
            <li className="list-similar-job" key={eachSimilarJob.id}>
              <SimilarJobs eachSimilarJob={eachSimilarJob} />
            </li>
          ))}
        </ul>
      </>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onClickFailure = () => {
    this.getJobItemDetails()
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-text">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-btn-jobs"
        onClick={this.onClickFailure}
      >
        Retry
      </button>
    </div>
  )

  renderJobItemDetailsApiStatus = () => {
    const {jobDetailsApiStatus} = this.state

    switch (jobDetailsApiStatus) {
      case jobDetailsApiStatusConstants.inProgress:
        return this.renderLoadingView()
      case jobDetailsApiStatusConstants.failure:
        return this.renderFailureView()
      case jobDetailsApiStatusConstants.success:
        return this.renderJobItemDetailsView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="job-details-bg-container">
        <Header />
        <div className="job-details-container">
          {this.renderJobItemDetailsApiStatus()}
        </div>
      </div>
    )
  }
}

export default JobItemDetails
