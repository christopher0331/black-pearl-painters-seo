import type { Chrome } from "@/lib/content";

export default function QuoteForm({ chrome }: { chrome: Chrome }) {
  return (
    <form
      className="quote-form"
      name="request-a-quote"
      method="POST"
      data-netlify="true"
      netlify-honeypot="url"
      action="/thank-you/"
    >
      <input type="hidden" name="form-name" value="request-a-quote" />
      <p className="hp">
        <label>
          URL
          <input name="url" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <div className="form-row">
        <label>
          First name *
          <input name="first-name" placeholder="First Name" required />
        </label>
        <label>
          Last name *
          <input name="last-name" placeholder="Last Name" required />
        </label>
      </div>
      <div className="form-row">
        <label>
          Email *
          <input type="email" name="email" placeholder="Email" required />
        </label>
        <label>
          Phone *
          <input type="tel" name="phone" placeholder="Phone" required />
        </label>
      </div>
      <label>
        Street address
        <input name="street" />
      </label>
      <div className="form-row three">
        <label>
          City
          <input name="city" />
        </label>
        <label>
          State
          <select name="state" defaultValue="Washington">
            <option>Washington</option>
          </select>
        </label>
        <label>
          ZIP code
          <input name="zip" />
        </label>
      </div>
      <div className="form-row">
        <label>
          Best time to contact *
          <select name="best-time" required defaultValue="Morning">
            {chrome.form.times.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <label>
          Project type *
          <select name="project-type" required defaultValue="Painting">
            {chrome.form.projectTypes.map((t) => (
              <option key={t.v} value={t.v}>
                {t.t}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="form-row">
        <label>
          How did you hear about us *
          <select name="lead-source" required defaultValue="Google">
            {chrome.form.sources.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <label>
          Where did you learn about us
          <input name="learn-more" />
        </label>
      </div>
      <label>
        Message *
        <textarea name="message" rows={5} required />
      </label>
      <button className="btn btn-gold" type="submit">
        Request a quote
      </button>
    </form>
  );
}
