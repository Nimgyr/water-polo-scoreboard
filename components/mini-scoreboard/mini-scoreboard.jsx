export function MiniScoreboard({
    period,
    leftScore,
    rightScore,
    rightTeamName,
    leftTeamName,
    secondsTimer,
}) {
    return (
        <>
            <div className="flex items-center justify-center  p-4 rounded-lg shadow-md w-max space-x-4">
                {/* верхний блок */}
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-4 bg-blue-500"></div>
                    <div className="text-sm font-bold text-gray-700">
                        {leftTeamName}
                    </div>
                    <div className="text-lg font-extrabold text-gray-900">
                        {leftScore}
                    </div>
                </div>

                {/* нижний блок */}
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-4 bg-white "></div>
                    <div className="text-sm font-bold text-gray-700">
                        {rightTeamName}
                    </div>
                    <div className="text-lg font-extrabold text-gray-900">
                        {rightScore}
                    </div>
                </div>

                {/* Таймер и период */}
                <div className="flex flex-col items-center">
                    <div className="text-lg font-extrabold text-gray-900">
                        {("00" + Math.floor(secondsTimer / 60)).slice(-2)}:
                        {("00" + (secondsTimer % 60)).slice(-2)}
                    </div>
                    <div className="text-sm font-bold text-gray-700">
                        {period}{" "}
                    </div>
                </div>
            </div>
        </>
    );
}
