import './index.css'

const EmploymentTypes = props => {
  const {eachEmploymentTypesList, onChangeEmploymentTypeCheckbox} = props
  const {label, employmentTypeId} = eachEmploymentTypesList

  const onClickCheckbox = () => onChangeEmploymentTypeCheckbox(employmentTypeId)

  return (
    <>
      <div className="employment-list-cont">
        <input
          type="checkbox"
          id={employmentTypeId}
          className="checkbox"
          onChange={onClickCheckbox}
        />
        <label htmlFor={employmentTypeId} className="label">
          {label}
        </label>
      </div>
    </>
  )
}

export default EmploymentTypes
