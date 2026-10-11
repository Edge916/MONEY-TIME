# Money Time business validation

The first offer is QuotePage: a $249 one-page website for independent mobile detailers, with optional $49/month care. The owner's first 60 days require $0 out-of-pocket spending. Current revenue: not validated.

- [Business comparison, economics, and 30-day plan](PLAN.md)
- [First customer experiment and message drafts](EXPERIMENT.md)
- [Primary evidence and limits](SOURCES.md)
- [Editable financial and prospect tracker](Money-Time-Tracker.xlsx)
- [Private QuotePage demo](https://quotepage.robustchick16.chatgpt.site)
- [Browser-local website studio source](prototype/dist/index.html)
- [Verification record](VERIFICATION.md)

The private demo requires the owner's ChatGPT sign-in. Inquiries await a verified business Gmail inbox, and no payments or outreach have been activated. The studio produces responsive draft HTML without a paid AI API. Inputs stay in the browser tab.

Run the pure generator checks with `node docs/business-validation/verify-generator.mjs` from the repository root. To preview the studio, serve `prototype/dist` with a static HTTP server. Opening `index.html` directly may prevent browser module imports.

The workbook has live formulas and blank actuals. It was recalculated and checked with Artifact Tool; native Excel behavior has not been tested. Keep private customer records outside this public repository.
