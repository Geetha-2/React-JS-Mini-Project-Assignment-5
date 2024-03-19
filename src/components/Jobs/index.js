import {Component} from 'react'

import {BsSearch} from 'react-icons/bs'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import EmploymentTypes from '../EmploymentTypes'
import SalaryRange from '../SalaryRange'
import JobsData from '../JobsData'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const searchIcon = <BsSearch className="search-icon" />

class Jobs extends Component {
  state = {
    profileApiStatus: apiStatusConstants.initial,
    profileDetails: {},
    jobsApiStatus: apiStatusConstants.initial,
    jobsList: [],
    searchInput: '',
    activeEmploymentTypeIdsList: [],
    activeSalaryRangeId: '',
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({
      jobsApiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')

    const {
      searchInput,
      activeEmploymentTypeIdsList,
      activeSalaryRangeId,
    } = this.state

    const employmentTypes = activeEmploymentTypeIdsList.join(',')

    const jobsApiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypes}&search=${searchInput}&minimum_package=${activeSalaryRangeId}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(jobsApiUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      const updatedDataJobs = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobsList: updatedDataJobs,
        jobsApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({jobsApiStatus: apiStatusConstants.failure})
    }
  }

  renderJobsSuccessView = () => {
    const {jobsList} = this.state
    const jobsDataLength = jobsList.length > 0

    return jobsDataLength ? (
      <ul>
        {jobsList.map(each => (
          <li className="jobs-data-container" key={each.id}>
            <JobsData jobsData={each} />
          </li>
        ))}
      </ul>
    ) : (
      <div className="jobs-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-jobs-img"
        />
        <h1 className="no-jobs-heading">No jobs found</h1>
        <p className="no-jobs-text">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  renderJobsApiStatus = () => {
    const {jobsApiStatus} = this.state

    switch (jobsApiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.success:
        return this.renderJobsSuccessView()
      default:
        return null
    }
  }

  onChangeEmploymentTypeCheckbox = id => {
    // const {activeEmploymentTypeIdsList} = this.state
    // if (activeEmploymentTypeIdsList.includes(event.target.id)) {
    //   const updatedList = activeEmploymentTypeIdsList.filter(
    //     each => each !== event.target.id,
    //   )
    //   this.setState(
    //     {
    //       activeEmploymentTypeIdsList: updatedList,
    //     },
    //     this.getJobs,
    //   )
    // } else {
    this.setState(
      prevState => ({
        activeEmploymentTypeIdsList: [
          ...prevState.activeEmploymentTypeIdsList,
          id,
        ],
      }),
      this.getJobs,
    )
  }

  renderEmploymentTypes = () => (
    <>
      <div className="employment-types-container">
        <h1 className="employment-heading">Type of Employment</h1>
        <ul>
          {employmentTypesList.map(each => (
            <li className="employments-list" key={each.employmentTypeId}>
              <EmploymentTypes
                eachEmploymentTypesList={each}
                onChangeEmploymentTypeCheckbox={
                  this.onChangeEmploymentTypeCheckbox
                }
              />
            </li>
          ))}
        </ul>
      </div>
      <hr className="hr-line" />
    </>
  )

  onClickSalaryRange = id => {
    this.setState({activeSalaryRangeId: id}, this.getJobs)
  }

  renderSalaryRange = () => (
    <>
      <div className="salary-range-container">
        <h1 className="salary-heading">Salary Range</h1>
        <ul>
          {salaryRangesList.map(each => (
            <li className="salaries-list" key={each.salaryRangeId}>
              <SalaryRange
                eachSalaryRangesList={each}
                onChangeSalaryRange={this.onClickSalaryRange}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  )

  getProfileDetails = async () => {
    this.setState({
      profileApiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')

    const profileApiUrl = 'https://apis.ccbp.in/profile'

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(profileApiUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      const profileDetailsData = data.profile_details
      const updatedData = {
        name: profileDetailsData.name,
        profileImageUrl: profileDetailsData.profile_image_url,
        shortBio: profileDetailsData.short_bio,
      }

      this.setState({
        profileDetails: updatedData,
        profileApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        profileApiStatus: apiStatusConstants.failure,
      })
    }
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  enterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJobs()
    }
  }

  clickSearchIcon = () => {
    this.getJobs()
  }

  renderSearchBar = () => {
    const {searchInput} = this.state
    return (
      <div className="search-bar">
        <input
          className="search-input"
          type="search"
          placeholder="Search"
          value={searchInput}
          onChange={this.onChangeSearchInput}
          onKeyDown={this.enterSearchInput}
        />
        <button
          className="search-button"
          type="button"
          data-testid="searchButton"
          onClick={this.clickSearchIcon}
        >
          {searchIcon}
        </button>
      </div>
    )
  }

  renderProfileStatusSuccessView = () => {
    const {profileDetails} = this.state
    const {profileImageUrl, name, shortBio} = profileDetails
    return (
      <>
        <div className="profile-details-container">
          <img src={profileImageUrl} alt="profile" className="profile-image" />
          <h1 className="profile-name">{name}</h1>
          <p className="profile-bio">{shortBio}</p>
        </div>
        <hr className="hr-line" />
      </>
    )
  }

  retryProfileView = () => {
    this.getProfileDetails()
  }

  renderProfileFailureView = () => (
    <div className="failure-container">
      <button
        type="button"
        className="retry-btn"
        onClick={this.retryProfileView()}
      >
        Retry
      </button>
    </div>
  )

  retryJobsView = () => {
    this.getJobs()
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
        onClick={this.retryJobsView()}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfileApiStatus = () => {
    const {profileApiStatus} = this.state
    switch (profileApiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderProfileFailureView()
      case apiStatusConstants.success:
        return this.renderProfileStatusSuccessView()
      default:
        return null
    }
  }

  renderSmallDevices = () => (
    <>
      {this.renderSearchBar()}
      {this.renderProfileApiStatus()}
      {this.renderEmploymentTypes()}
      {this.renderSalaryRange()}
      {this.renderJobsApiStatus()}
    </>
  )

  renderLargeDevices = () => (
    <>
      <div className="first-lg-container">
        {this.renderProfileApiStatus()}
        {this.renderEmploymentTypes()}
        {this.renderSalaryRange()}
      </div>
      <div className="second-lg-container">
        {this.renderSearchBar()}
        {this.renderJobsApiStatus()}
      </div>
    </>
  )

  render() {
    return (
      <div className="jobs-bg-container">
        <Header />
        <div className="jobs-container-sm">{this.renderSmallDevices()}</div>
        <div className="jobs-container-lg">{this.renderLargeDevices()}</div>
      </div>
    )
  }
}

export default Jobs
