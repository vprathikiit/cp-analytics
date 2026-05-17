import React, {useState, useEffect} from 'react';
import { getRevision } from '../utils/api';
import './Revision.css';

const Revision = ({onBack}) => {
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRevision = async () => {
            try {
                const response = await getRevision();
                setProblems(response.data.problems);
            }
            catch (error) {
                console.log("Error fetching revision:", error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchRevision();
    },[]);

    if (loading) {
        return <div className="loading">Loading revision...</div>;
    }

    return (
        <div className='revision'>
            <div className='revision-header'>
                <button onClick={onBack} className='back-btn'>Back</button>
                <h2>📅 Revision Schedule</h2>
            </div>

            {problems.length === 0 ? (
                <div className='no-revision'>
                    <h3>🎉 No problems due for revision today!</h3>
                    <p>Keep solving problems and come back later.</p>
                </div>
            ) : (
                <>
                  <p className='revision-count'>
                    You have <strong>{problems.length}</strong> problem(s) to revise today.
                  </p>
                  <div className='revision-list'>
                    {problems.map((problem) => (
                        <div key={problem._id} className='revision-card'>
                            <div className='revision-top'>
                                <h3>{problem.title}</h3>
                                <span className="due-date">
                                        Due: {new Date(problem.nextRevision).toLocaleDateString()}
                                </span>
                            </div>

                            <div className='revision-details'>
                                <span className="platform">{problem.platform}</span>
                                <span className="topic">{problem.topic}</span>
                                <span className="difficulty">{problem.difficulty}</span>
                                <span className="time">⏱ {problem.timeTaken} mins</span>
                            </div>
                            {problem.problemLink && (
                                <a href={problem.problemLink} target="_blank" rel="noreferrer" className="problem-link">
                                    Revise Now →
                                </a>
                            )}
                        </div>
                    ))}
                  </div>
                </>
            )}
        </div>
    );
};

export default Revision;

