import { useMemo } from 'react'
import { scoreboardSlice, type TeamKey } from '../../shared/state/scoreboardSlice'
import { dispatchSharedAction, useSharedSelector } from './store/useSharedStore'

const windowKindLabel: Record<string, string> = {
  primary: 'Основное окно',
  secondary: 'Табло'
}

const { goalScored, resetScores } = scoreboardSlice.actions

const getWindowKind = (): string => {
  const params = new URLSearchParams(window.location.search)
  return params.get('window') ?? 'primary'
}

const App = (): React.JSX.Element => {
  const windowKind = useMemo(() => getWindowKind(), [])
  const homeScore = useSharedSelector((state) => state.scoreboard.home)
  const guestScore = useSharedSelector((state) => state.scoreboard.guest)

  const handleGoal = (team: TeamKey) => (): void => {
    void dispatchSharedAction(goalScored({ team }))
  }

  const handleReset = (): void => {
    void dispatchSharedAction(resetScores())
  }

  const handleOpenSecondary = (): void => {
    void window.windowControls.openSecondaryWindow()
  }

  const handleCloseSecondary = (): void => {
    void window.windowControls.closeSecondaryWindow()
  }

  const handleToggleSecondaryFullscreen = (): void => {
    void window.windowControls.toggleSecondaryFullscreen()
  }

  return (
    <main className="layout">
      <header className="panel">
        <span className="panel-label">Режим:</span>
        <strong className="panel-value">{windowKindLabel[windowKind] ?? 'Окно'}</strong>
      </header>

      <section className="scoreboard">
        <article className="score-card">
          <h2>Хозяева</h2>
          <p className="score-value">{homeScore}</p>
          <button className="score-action" onClick={handleGoal('home')}>
            Гол хозяев
          </button>
        </article>

        <article className="score-card">
          <h2>Гости</h2>
          <p className="score-value">{guestScore}</p>
          <button className="score-action" onClick={handleGoal('guest')}>
            Гол гостей
          </button>
        </article>
      </section>

      {windowKind === 'primary' && (
        <section className="controls">
          <button className="primary" onClick={handleOpenSecondary}>
            Открыть второе окно
          </button>
          <button onClick={handleToggleSecondaryFullscreen}>Переключить полный экран</button>
          <button onClick={handleCloseSecondary}>Закрыть второе окно</button>
          <button onClick={handleReset}>Сбросить счёт</button>
        </section>
      )}
    </main>
  )
}

export default App
