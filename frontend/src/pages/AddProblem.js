import React, {useState} from 'react';
import { addProblem } from '../utils/api';
import './AddProblem.css';

const AddProblem = ({onBack}) => {
    const [title, setTitle] = useState('');
    const [platform, setPlatform] = useState('leetcode');
    const [topic, setTopic] = useState('');
    const [difficulty, setDifficulty] = useState('easy');
    const [timeTaken, setTimeTaken] = useState('');
    const [success, setSuccess] = useState(true);
    const [problemLink, setProblemLink] = useState('');
    const [notes, setNotes] = useState('');
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMsg('');
        setLoading(true);
        
        try {
        await addProblem({
            title,
            platform,
            topic,
            difficulty,
            timeTaken : Number(timeTaken),
            success,
            problemLink,
            notes
        });
        setSuccessMsg('Problem added successfully!');
        setTimeout(() => onBack(), 2000);
    }
    catch (err) {
        setError(err.response?.data?.message || 'Failed to add problem');
    }
    finally {
        setLoading(false);
    }
    }

    return (
        <div className='add-problem'>
            <div className='add-problem-header'>
                <button onClick={onBack} className='back-btn'>Back</button>
                <h2>Add Problem</h2>
            </div>

            <div className='add-problem-form'>
                {error && <p className='error-msg'>{error}</p>}
                {successMsg && <p className='success-msg'>{successMsg}</p>}

                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label>Problem Title</label>
                        <input
                            type='text'
                            placeholder='e.g. Two Sum'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div className='form-group'>
                        <label>Platform</label>
                        <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
                            <option value='leetcode'>LeetCode</option>
                            <option value='codeforces'>CodeForces</option>
                            <option value='gfg'>GFG</option>
                        </select>
                    </div>

                    <div className='form-group'>
                        <label>Topic</label>
                        <select value={topic} onChange={(e) => setTopic(e.target.value)} required>
                            <option value="">Select Topic</option>
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
                    </div>

                    <div className='form-group'>
                        <label>Difficulty</label>
                        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                             <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>

                    <div className='form-group'>
                        <label>Time Taken (minutes)</label>
                        <input
                            type='number'
                            placeholder='e.g. 25'
                            value={timeTaken}
                            onChange={(e) => setTimeTaken(e.target.value)}
                            required
                        />
                    </div>

                    <div className='form-group'>
                        <label>Result</label>
                        <select value={success} onChange={(e) => setSuccess(e.target.value === "true")}>
                            <option value="true">Solved ✅</option>
                            <option value="false">Failed ❌</option>
                        </select>
                    </div>

                    <div className='form-group'>
                        <label>Problem Link (optional)</label>
                        <input
                            type='text'
                            placeholder="e.g. https://leetcode.com/problems/two-sum"
                            value={problemLink}
                            onChange={(e) => setProblemLink(e.target.value)}
                        />
                    </div>

                    <div className='form-group'>
                        <label>Notes (optional)</label>
                        <textarea
                            placeholder='e.g. Used hashmap approach'
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={3}
                        />
                    </div>

                    <button type='submit' disabled={loading} className='submit-btn'>
                        {loading ? 'Adding...' : 'Add Problem'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProblem;