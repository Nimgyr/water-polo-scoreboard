import { useMemo } from 'react'
import { scoreboardSlice, type TeamKey } from './shared/state/scoreboardSlice'
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

  const baseControlButton =
    'rounded-2xl px-6 py-3 text-sm font-semibold shadow-lg transition duration-150 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-300'

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 px-6 py-10 text-slate-900">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8">
        <header className="flex items-center gap-2 rounded-full bg-white/80 px-6 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500 shadow-2xl shadow-slate-200/80 backdrop-blur">
          <span>Режим</span>
          <strong className="text-slate-900 tracking-normal">
            {windowKindLabel[windowKind] ?? 'Окно'}
          </strong>
        </header>

        <section className="flex w-full flex-wrap justify-center gap-6">
          <article className="flex min-w-[240px] flex-1 flex-col items-center rounded-3xl bg-white/95 px-10 py-8 text-center shadow-[0_35px_65px_rgba(15,23,42,0.12)] backdrop-blur">
            <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
              Хозяева
            </h2>
            <p className="mt-2 text-7xl font-black text-slate-900">{homeScore}</p>
            <button
              className="mt-6 w-full rounded-2xl bg-gradient-to-r from-sky-500 via-sky-400 to-cyan-400 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-sky-200/60 transition duration-150 hover:-translate-y-0.5 hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-200 focus-visible:ring-offset-2"
              onClick={handleGoal('home')}
            >
              Гол хозяев
            </button>
          </article>

          <article className="flex min-w-[240px] flex-1 flex-col items-center rounded-3xl bg-white/95 px-10 py-8 text-center shadow-[0_35px_65px_rgba(15,23,42,0.12)] backdrop-blur">
            <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
              Гости
            </h2>
            <p className="mt-2 text-7xl font-black text-slate-900">{guestScore}</p>
            <button
              className="mt-6 w-full rounded-2xl bg-gradient-to-r from-indigo-500 via-indigo-400 to-fuchsia-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-indigo-200/60 transition duration-150 hover:-translate-y-0.5 hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 focus-visible:ring-offset-2"
              onClick={handleGoal('guest')}
            >
              Гол гостей
            </button>
          </article>
        </section>

        {windowKind === 'primary' && (
          <section className="flex w-full flex-wrap justify-center gap-4">
            <button
              className={`${baseControlButton} bg-gradient-to-r from-brand-pink to-brand-purple text-white`}
              onClick={handleOpenSecondary}
            >
              Открыть второе окно
            </button>
            <button
              className={`${baseControlButton} bg-white/90 text-slate-900`}
              onClick={handleToggleSecondaryFullscreen}
            >
              Переключить полный экран
            </button>
            <button
              className={`${baseControlButton} border border-rose-100 bg-white text-rose-600`}
              onClick={handleCloseSecondary}
            >
              Закрыть второе окно
            </button>
            <button
              className={`${baseControlButton} bg-white/90 text-slate-900`}
              onClick={handleReset}
            >
              Сбросить счёт
            </button>
          </section>
        )}
      </div>
    </main>
  )
}

export default App
