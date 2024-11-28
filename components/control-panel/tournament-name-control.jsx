import { EditTournamentButton } from "./edit-tournament-button";

export function TournamentNameControl({ tournamentName, setTournamentName }) {
    return (
        <div className="flex justify-center text-center">
            <EditTournamentButton
                tournamentName={tournamentName}
                setTournamentName={setTournamentName}
            />
        </div>
    );
}
