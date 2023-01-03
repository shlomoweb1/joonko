import React from 'react';
import { $http } from 'utils/http';
import { MdLocationOn, MdExpandMore, MdExpandLess } from "react-icons/md";
// API GET Route
// http://localhost:3001/api/v1/users/jobs;

const Job = ({job}) => {
    const [details, setDetails] = React.useState(false);

    const handleDetails = ()=>setDetails(!details)

    return (<div style={{marginBottom: 10}}>
        <div>
            <div>{job.name} {(!details) ? (<MdExpandMore onClick={handleDetails} />) :(<MdExpandLess  onClick={handleDetails}/>) }</div>
            <div><MdLocationOn />{job.location} {job.department}</div>
        </div>
        <div>
            <input type="botton" value="Apply" />
        </div>
        {details && (<div>{job.description}</div>)}
    </div>)
}

const Jobs = () => {
    const [jobs, setJobs] = React.useState([]);

    const getJobs = async () => {
        try {
            const res = await $http.get('/users/jobs');
            if(res.status === 200){
                setJobs(res.data.jobs);
            }
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(()=>{
        getJobs();
    }, [])

    return (
        <div className="jobs">
            {
                jobs.map((job, index)=>(<Job job={job} key={index}/>))
            }
            
        </div>
    )
}

export default Jobs;