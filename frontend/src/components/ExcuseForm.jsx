import { useState } from "react";
import axios from "axios";

function ExcuseForm(){
    const [context, setContext] = useState('');
    const [result, setResult] = useState(null);
    const [loading,setLoading] = useState(false);
    const [category, setCategory] = useState("meetings");

    return (
        <div>
            <select value ={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="meetings">Meetings</option>
                <option value="dates">Dates</option>
                <option value="weddings">Weddings</option>
                <option value="group trips">Group Trips</option>
                <option value="family events">Family Events</option>
            </select>
            <textarea placeholder="Why do you want to escape?" value={context} onChange={(e) => setContext(e.target.value)}></textarea>
            <br />
            <button onClick={generateExcuse} disabled={loading}>
                {loading ? 'Generating...' : 'Generate Excuse'}
            </button>
            <p>{result && (
                <div className="result-card">

                <h2>Your Exit Strategy</h2>

                <p>
                    <strong>Excuse:</strong>
                    <br />
                    {result.excuse}
                </p>

                <p>
                <strong>Short Version:</strong>
                <br />
                {result.shortVersion}
                </p>

                <p>
                  <strong>Believability:</strong>
                  <br />
                  {result.believabilityScore}/100
                </p>

                <p>
                  <strong>Risk Level:</strong>
                  <br />
                  {result.riskLevel}
                </p>

            </div>
        )}</p>
        </div>
    );
}

const generateExcuse = async () => {
    try {
        setLoading(true);
        const response =await axios.post('http://localhost:5000/generate', { context, category });
        setResult(response.data);

    }catch(error){
        console.log(error);
    }finally{
        setLoading(false);
    }
};

export default ExcuseForm;