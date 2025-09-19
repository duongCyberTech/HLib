import React from 'react'

const CourseHeader = ({ courseData }) => {
    return ( 
        <div className='course-header'>
            <div className='course-header-content'>
                <div className='course-basic-info'>
                    <h1 className='course-title'>{courseData.title}</h1>
                    <p className='course-description'>{courseData.description}</p>
                </div>

                <div className='course-meta'>
                    <div className='course-stats'>
                        <span className='stat-item'>
                            <i className='icon-user'>
                            </i>
                            {courseData.sale_number}
                        </span>
                        <span className='stat-item'>
                            <i className='icon-clock'></i>
                            {courseData.duration_num}
                        </span>
                        <span className='stat-item'>du
                            <i className='icon-language'></i>
                            {courseData.languages}
                        </span>
                    </div>
                </div>

                <div className='course-price'>
                    <div className='price-section'>
                        <span className='price'> {courseData.price} </span>
                        {courseData.is_active ? (
                            <span className='status-active'>Đang hoạt động</span>
                        ) : (
                            <span className='status-inactive'> Không hoạt động </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseHeader;