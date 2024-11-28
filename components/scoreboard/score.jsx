/**
 * @param {{
 * team: 'white' | 'blue'
 * }} props
 */

export function Score({ team, score, teamName }) {
    const teamClassName = {
        white: "text-white text-clampText font-extrabold",
        blue: "text-blue-600 text-clampText font-extrabold",
    }[team];

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-row justify-center whitespace-nowrap max-h-[72px]">
                <h1 className={teamClassName}>{teamName}</h1>
            </div>
            <div className="bg-black rounded-3xl p-2 aspect-square flex flex-col justify-center items-center">
                <div className="text-clampScore font-digital text-amber-400 flex justify-center p-2">
                    {("00" + score).slice(-2)}
                </div>
            </div>
        </div>
    );
}
