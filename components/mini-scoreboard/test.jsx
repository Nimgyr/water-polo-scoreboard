"use client";
import React from "react";
import { useState, useEffect } from "react";
import { UiSelect } from "../control-panel/select-team-name";

export const TeamsAndCompetitions = () => {
    // Define a state variable "data" and a function "setData" to update the state
    const [data, setData] = useState([]);

    // Use the useEffect hook to fetch data from the API endpoint when the component mounts
    useEffect(() => {
        fetch("http://localhost:3000/api/teams-name", {
            method: "GET",
            headers: {
                "Content-Type": "application/json", // Set the request headers to indicate JSON format
            },
        })
            .then((res) => res.json()) // Parse the response data as JSON
            .then((data) => setData(data)); // Update the state with the fetched data
    }, []);

    // Create a collection of JSX elements based on the fetched "data"
    const collection = data.map((item) => (
        <div
            key={item.team_id || item.competition_id}
            style={{
                marginBottom: "20px",
                padding: "10px",
                border: "1px solid #ccc",
            }}
        >
            {/* Display the competition name and corresponding team name */}
            <h2>{item.competition_name}</h2>
            {item.team_name && <p>Team: {item.team_name}</p>}
        </div>
    ));

    // Return the JSX elements wrapped in a container div
    return <UiSelect teamsName={data} />;
};
