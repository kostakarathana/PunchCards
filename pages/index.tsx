import { useRouter } from 'next/router'
import Head from 'next/head'

type CardType = 'bug_fix' | 'feature_request' | 'feature_change' | 'documentation' | 'testing' | 'security_audit' | 'cleanup'

export default function Home() {
  const router = useRouter()

  const handleCardSelect = (type: CardType) => {
    router.push(`/${type}`)
  }

  return (
    <>
      <Head>
        <title>PunchCards - AI Task Templates</title>
        <meta name="description" content="Generate structured XML task cards for AI coding assistants" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="container">
        <div className="header">
          <h1 className="typewriter">PUNCHCARDS</h1>
          <p className="subtitle typewriter-slow">
            Generate structured task cards for AI coding assistants
          </p>
        </div>

        <div className="card-grid">
          <button
            className="card-button bug-fix"
            onClick={() => handleCardSelect('bug_fix')}
          >
            <h2>BUG FIX</h2>
            <p>
              Systematic debugging workflow with reproduction, analysis, and verification steps
            </p>
          </button>

          <button
            className="card-button feature-request"
            onClick={() => handleCardSelect('feature_request')}
          >
            <h2>FEATURE REQUEST</h2>
            <p>
              Skeleton-of-Thought approach for building new features with architecture review
            </p>
          </button>

          <button
            className="card-button feature-change"
            onClick={() => handleCardSelect('feature_change')}
          >
            <h2>FEATURE CHANGE</h2>
            <p>
              Safe refactoring workflow with impact analysis and regression testing
            </p>
          </button>

          <button
            className="card-button documentation"
            onClick={() => handleCardSelect('documentation')}
          >
            <h2>DOCUMENTATION</h2>
            <p>
              Comprehensive docs generation with API reference, examples, and formatting options
            </p>
          </button>

          <button
            className="card-button testing"
            onClick={() => handleCardSelect('testing')}
          >
            <h2>TESTING</h2>
            <p>
              Test suite creation with unit, integration, E2E tests and coverage configuration
            </p>
          </button>

          <button
            className="card-button security-audit"
            onClick={() => handleCardSelect('security_audit')}
          >
            <h2>SECURITY AUDIT</h2>
            <p>
              Security review with OWASP checks, vulnerability scanning, and compliance validation
            </p>
          </button>

          <button
            className="card-button cleanup"
            onClick={() => handleCardSelect('cleanup')}
          >
            <h2>CLEANUP</h2>
            <p>
              Code cleanup with dead code removal, formatting, dependency and structure fixes
            </p>
          </button>
        </div>

        <footer className="footer">
          <p>
            Fill out the form to generate XML that provides context and instructions to your AI assistant
          </p>
        </footer>
      </main>
    </>
  )
}
