import React, {useState, useEffect} from 'react';
import { getAllProblems } from '../utils/api';
import './History.css';

const History = ({onBack}) => {
    const [problems, setProblems] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(false);
    const [platformFilter, setPlatformFilter] = useState('all');
    const [difficultyFilter, setDifficultyFilter] = useState('all');
    const [topicFilter, setTopicFilter] = useState('all');

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const response = await getAllProblems();
                setProblems(response.data.problems);
                setFiltered(response.data.problems);
            }
            catch (error) {
                console.log('Error fetching problems:', error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchProblems();
    },[]);

    useEffect(() => {
        let result = problems;
        if(platformFilter !== "all") {
            result = result.filter(p => p.platform === platformFilter);
        }
        if(topicFilter !== "all") {
            result = result.filter(p => p.topic === topicFilter);
        }
        if(difficultyFilter !== "all") {
            result = result.filter(p => p.difficulty === difficultyFilter);
        }
        setFiltered(result);

    },[platformFilter, topicFilter, difficultyFilter, problems]);

    if (loading) {
        return <div className="loading">Loading history...</div>;
    }

    return (
        <div className='history'>
            <div className='history-header'>
                <button onClick={onBack} className='back-btn'>Back</button>
                <h2>Problem History</h2>
            </div>

            <div className='filters'>
                <select value={platformFilter} onChange={(e) => setPlatformFilter(e.target.value)}>
                    <option value="all">All Platforms</option>
                    <option value="leetcode">LeetCode</option>
                    <option value="codeforces">Codeforces</option>
                    <option value="gfg">GFG</option>
                </select>

                <select value={topicFilter} onChange={(e) => setTopicFilter(e.target.value)}>
                    <option value="all">All Topics</option>
                    <option value="Array">Array</option>
                    <option value="String">String</option>
                    <option value="DP">DP</option>
                    <option value="Graph">Graph</option>
                    <option value="Tree">Tree</option>
                    <option value="LinkedList">Linked List</option>
                    <option value="Stack">Stack</option>
                    <option value="Queue">Queue</option>
                    <option value="Binary Search">Binary Search</option>
                    <option value="Greedy">Greedy</option>
                    <option value="Backtracking">Backtracking</option>
                    <option value="Math">Math</option>
                </select>

                <select value={difficultyFilter} onChange={(e) => setDifficultyFilter(e.target.value)}>
                    <option value="all">All Difficulties</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>

            <div className='problems-count'>
                Showing {filtered.length} of {problems.length} problems
            </div>

            <div className='problems-list'>
                {filtered.length === 0 ? (
                    <p className='no-problems'>No problems found</p> 
                ) : (
                    filtered.map((problem) => (
                        <div key={problem._id} className={`problem-card ${problem.success ? 'success' : 'failed'}`}>
                            <div className='problem-top'>
                                <h3>{problem.title}</h3>
                                <span className={`status ${problem.success ? 'success' : 'failed'}`}>
                                    {problem.success ? '✅ Solved' : '❌ Failed'}
                                </span>
                            </div>

                            <div className='problem-details'>
                                <span className="platform">{problem.platform}</span>
                                <span className="topic">{problem.topic}</span>
                                <span className="difficulty">{problem.difficulty}</span>
                                <span className="time">⏱ {problem.timeTaken} mins</span>
                                <span className="verification">{problem.verification_status}</span>
                            </div>
                            {problem.problemLink && (
                                <a href={problem.problemLink} target="_blank" rel="noreferrer" className="problem-link">
                                    View Problem →
                                </a>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default History;

