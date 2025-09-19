import React from 'react'
import {CourseHeader, CourseSection} from './components';
import '../../styles/pages/course-detail.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';


const CourseDetail = () => {
    const { course_id } = useParams();
    const courseId = course_id; 
    const [ courseData, setCourseData ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const [error, setError ] = useState(null);


    useEffect(() => {
        const fetchCourseData = async () => {
            if (!courseId) {
                setError('Course ID is required');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const response = await fetch(`/api/course/get-course/${courseId}`);
                if (!response.ok){
                    throw new Error ("Fail to fetch data");
                }
                const data = await response.json();
                if (data && data.data && data.data[0] && data.data[0][0]) {
                    setCourseData(data.data[0][0]);
                } else {
                    throw new Error("Course data not found or in unexpected format");
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false); 
            }
        };

        fetchCourseData();
    }, [courseId]);


    if (loading) return <div className='loading'>Loading...</div>;
    if (error) return <div className='error'> Error: {error}</div>;
    if (!courseData) return <div className='not-found'>Course not found</div>

    return (
        <div className='course-detail'>
            <CourseHeader courseData={courseData}/>
            <CourseSection />
        </div>
    )
}

export default CourseDetail
