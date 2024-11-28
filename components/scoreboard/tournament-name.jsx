export function TournamentName({ tournamentName }) {
    const name = tournamentName || "";
    return (
        <div className="flex justify-center text-center">
            <p className="text-clampText px-14 max-h-56">
                {name.toUpperCase()}
            </p>
        </div>
    );
}
