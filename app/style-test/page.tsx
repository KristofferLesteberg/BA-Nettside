export default function StyleTestPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 flex flex-col gap-16">

      {/* =========================================
          TYPOGRAPHY
      ========================================= */}
      <section className="flex flex-col gap-4">
        <p className="label">Typography</p>
        <h1 className="heading-1">Heading 1</h1>
        <h2 className="heading-2">Heading 2</h2>
        <h3 className="heading-3">Heading 3</h3>
        <h4 className="heading-4">Heading 4</h4>
        <p className="body-text">
          Body text. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <p className="small-text">Small / muted text</p>
        <p className="label">Label / caption</p>
        <a href="#" className="small-text underline">Link text</a>
      </section>

      {/* =========================================
          COLORS
          Each swatch shows its token name on hover (title attr)
      ========================================= */}
      <section className="flex flex-col gap-4">
        <p className="label">Colors</p>

        <p className="small-text">Brand</p>
        <div className="flex flex-wrap gap-3">
          <div className="w-16 h-16 rounded-lg bg-primary"           title="--color-primary" />
          <div className="w-16 h-16 rounded-lg bg-primary-hover"     title="--color-primary-hover" />
          <div className="w-16 h-16 rounded-lg bg-secondary"         title="--color-secondary" />
          <div className="w-16 h-16 rounded-lg bg-secondary-hover"   title="--color-secondary-hover" />
        </div>

        <p className="small-text">Surfaces</p>
        <div className="flex flex-wrap gap-3">
          <div className="w-16 h-16 rounded-lg bg-page border border-border"   title="--color-bg" />
          <div className="w-16 h-16 rounded-lg bg-subtle border border-border-strong" title="--color-surface" />
          <div className="w-16 h-16 rounded-lg bg-muted border border-border"  title="--color-surface-raised" />
        </div>

        <p className="small-text">Semantic</p>
        <div className="flex flex-wrap gap-3">
          <div className="w-16 h-16 rounded-lg bg-success-bg border border-success"  title="--color-success-bg" />
          <div className="w-16 h-16 rounded-lg bg-error-bg border border-error"    title="--color-error-bg" />
          <div className="w-16 h-16 rounded-lg bg-warning-bg border border-warning"  title="--color-warning-bg" />
          <div className="w-16 h-16 rounded-lg bg-info-bg border border-info"     title="--color-info-bg" />
        </div>
      </section>

      {/* =========================================
          BUTTONS
      ========================================= */}
      <section className="flex flex-col gap-4">
        <p className="label">Buttons</p>
        <div className="flex flex-wrap gap-3 items-center">
          <button className="btn btn-primary">Primary</button>
          <button className="btn btn-secondary">Secondary</button>
          <button className="btn btn-outline">Outline</button>
          <button className="btn btn-ghost">Ghost</button>
          <button className="btn" disabled>Disabled</button>
        </div>
      </section>

      {/* =========================================
          INPUTS
      ========================================= */}
      <section className="flex flex-col gap-4">
        <p className="label">Inputs</p>
        <div className="flex flex-col gap-3">
          <input type="text"  placeholder="Text input"     className="input" />
          <input type="text"  placeholder="Disabled input" className="input" disabled />
          <textarea           placeholder="Textarea"       className="input resize-none" rows={3} />
          <select className="input">
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
          </select>
        </div>
      </section>

      {/* =========================================
          BADGES
      ========================================= */}
      <section className="flex flex-col gap-4">
        <p className="label">Badges</p>
        <div className="flex flex-wrap gap-2">
          <span className="badge badge-primary">Primary</span>
          <span className="badge badge-secondary">Secondary</span>
          <span className="badge badge-neutral">Neutral</span>
          <span className="badge badge-success">Success</span>
          <span className="badge badge-error">Error</span>
          <span className="badge badge-warning">Warning</span>
          <span className="badge badge-info">Info</span>
        </div>
      </section>

      {/* =========================================
          CARDS
      ========================================= */}
      <section className="flex flex-col gap-4">
        <p className="label">Cards</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="card flex flex-col gap-2">
            <h3 className="heading-4">Basic card</h3>
            <p className="small-text">Border + white bg.</p>
          </div>
          <div className="card-subtle flex flex-col gap-2">
            <h3 className="heading-4">Subtle card</h3>
            <p className="small-text">Surface bg, no border.</p>
          </div>
          <div className="card-accented flex flex-col gap-2">
            <h3 className="heading-4">Accented card</h3>
            <p className="small-text">Primary color border.</p>
          </div>
        </div>
      </section>

      {/* =========================================
          DIVIDERS
      ========================================= */}
      <section className="flex flex-col gap-4">
        <p className="label">Dividers</p>
        <hr className="border-default" />
        <hr className="border-strong" />
        <hr className="border-primary" />
      </section>

      {/* =========================================
          SPACING
      ========================================= */}
      <section className="flex flex-col gap-4">
        <p className="label">Spacing scale</p>
        <div className="flex flex-col gap-2">
          {[
            ["--spacing-xs",      "0.5rem",  "w-2"],
            ["--spacing-sm",      "1rem",    "w-4"],
            ["--spacing-md",      "1.5rem",  "w-6"],
            ["--spacing-lg",      "2.5rem",  "w-10"],
            ["--spacing-xl",      "4rem",    "w-16"],
            ["--spacing-section", "6rem",    "w-24"],
          ].map(([token, value, w]) => (
            <div key={token} className="flex items-center gap-4">
              <div className={`${w} h-4 bg-primary rounded-sm flex-shrink-0`} />
              <span className="small-text">{token} — {value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================
          BORDER RADIUS
      ========================================= */}
      <section className="flex flex-col gap-4">
        <p className="label">Border radius</p>
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-surface border border-border" style={{ borderRadius: "var(--radius-sm)" }} />
            <span className="label">sm</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-surface border border-border" style={{ borderRadius: "var(--radius-md)" }} />
            <span className="label">md</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-surface border border-border" style={{ borderRadius: "var(--radius-lg)" }} />
            <span className="label">lg</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-surface border border-border" style={{ borderRadius: "var(--radius-xl)" }} />
            <span className="label">xl</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-surface border border-border" style={{ borderRadius: "var(--radius-full)" }} />
            <span className="label">full</span>
          </div>
        </div>
      </section>

      {/* =========================================
          ADD YOUR SECTIONS BELOW
      ========================================= */}

    </div>
  )
}