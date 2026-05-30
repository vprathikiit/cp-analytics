import React, {useState, useEffect} from 'react';
import { useAuth} from '../context/AuthContext';
import { getDashboard, getWeakTopics } from '../utils/api';
import './Dashboard.css';

const Dashboard = () => {
    const {user} = useAuth();
    const [stats, setStats] = useState(null);
    const [weakTopics, setWeakTopics] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dashResponse = await getDashboard();
                setStats(dashResponse.data);

                const weakResponse = await getWeakTopics();
                setWeakTopics(weakResponse.data.weakTopics);
            }
            catch (error) {
                console.log("Error fetching dashboard data: ", error);
            }
            finally {
                setLoading(false);
            }
        };

        fetchData();
    },[]);

    if(loading) {
        return <div className='loading'>Loading dashboard...</div>
    }

    return (
        <div className='dashboard'>
            <div className='stats-grid'>
                <div className='stat-card'>
                    <h3>Total Solved</h3>
                    <p>{stats?.totalSolved || 0}</p>
                </div>
                <div className='stat-card success'>
                    <h3>Success Rate</h3>
                    <p>{stats?.successRate || 0}%</p>
                </div>
                <div className='stat-card time'>
                    <h3>Avg Time</h3>
                    <p>{stats?.avgTime || 0} mins</p>
                </div>
                <div className='stat-card failed'>
                    <h3>Total Failed</h3>
                    <p>{stats?.totalFailed || 0}</p>
                </div>
            </div>

            <div className='platform-stats'>
                <h2>Platform Stats</h2>
                <div className='platform-grid'>
                    {stats?.platformStats?.map((platform) => (
                        <div key={platform._id} className='platform-card'>
                            <h3>{platform._id}</h3>
                            <p>Total: {platform.count}</p>
                            <p>Success: {platform.successCount}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className='weak-topics'>
                <h2>Weak Topics</h2>
                {weakTopics.length === 0 ? (
                    <p>No weak topics found. Keep it up!</p>
                ) : (
                    <div className='weak-topics-grid'>
                        {weakTopics.map((topic) => (
                            <div key={topic._id} className='weak-topic-card'>
                                <h3>{topic.topic}</h3>
                                <p>Failure Rate: {Math.round(topic.failureRate)}%</p>
                                <p>Avg Time: {topic.avgTime} mins</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>    
        </div>
    );
};

export default Dashboard;