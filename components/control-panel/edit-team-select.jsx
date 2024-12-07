import React from "react";
import { SelectTeamName } from "./select-team-name";

export function EditTeamSelect({ setTeamNameMain, team, teamData }) {
    const teamDefaultName = {
        white: "Белые",
        blue: "Синие",
    }[team];

    const teamClassName = {
        white: "dark:text-white font-extrabold",
        blue: "dark:text-blue-600 font-extrabold",
    }[team];

    const optionsList = teamData.map((team) => (
        <option key={team.id}>{team.name}</option>
    ));

    const handleSelectChange = (event) => {
        setTeamNameMain(event.target.value);
    };

    return (
        <SelectTeamName
            setTeamNameMain={setTeamNameMain}
            defaultOption={teamDefaultName}
            optionsList={optionsList}
            handleSelectChange={handleSelectChange}
            teamClassName={teamClassName}
        />
    );
}
