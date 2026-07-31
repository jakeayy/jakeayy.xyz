<script lang="ts">
  import { PUBLIC_BASE_URL } from "$env/static/public";
</script>

<main class="flex flex-col gap-6 mb-8 mx-auto my-10 w-9/10 max-w-2xl">
    <header class="flex flex-col gap-2">
        <h1>Terms of Use</h1>
        <p class="text-sm opacity-70">Last updated: {new Date("07-31-2026").toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}</p>
    </header>

    <section class="flex flex-col gap-3">
        <p>
            These Terms of Use ("Terms") govern access to and use of {PUBLIC_BASE_URL}
            (the "Site"). By accessing the Site, you agree to these Terms. If you
            do not agree, do not access or use the Site.
        </p>
    </section>

    <section class="flex flex-col gap-3">
        <h2>1. Automated Access &amp; Scraping</h2>
        <p>
            Automated access to the Site — including crawling, scraping,
            indexing, or bulk downloading of Site content by bots, scripts, or
            agents — is only permitted where explicitly allowed by
            <a rel="external" href="/robots.txt">/robots.txt</a>. Any automated access that
            disregards robots.txt directives, evades rate limits, or
            circumvents access controls is unauthorized.
        </p>
    </section>

    <section class="flex flex-col gap-3">
        <h2>2. AI &amp; Machine Learning Use</h2>
        <p>You may not, without prior written permission:</p>
        <ul class="list-disc list-inside flex flex-col gap-1">
            <li>
                Use any content from the Site — text, code, images, or other
                material — to train, fine-tune, validate, or otherwise develop
                any machine learning or AI model, including large language
                models;
            </li>
            <li>
                Include Site content in any dataset intended for such training
                or development; or
            </li>
            <li>
                Operate or direct an automated agent (including an AI agent or
                LLM-based crawler) to access the Site for the purposes above.
            </li>
        </ul>
        <p>
            This restriction applies regardless of whether the resulting model
            or dataset is offered for free or for a fee, and regardless of
            whether the activity is characterized as research or commercial.
        </p>
    </section>

    <section class="flex flex-col gap-3">
        <h2>3. Enforcement</h2>
        <p>
            Violation of these Terms may result in access being blocked at the
            network level, and may be pursued as a breach of contract or under
            applicable computer-access laws. Requests to access or reproduce
            Site content beyond what these Terms allow can be sent via the
            contact details on the homepage.
        </p>
    </section>

    <section class="flex flex-col gap-3">
        <h2>4. Changes</h2>
        <p>
            These Terms may be updated at any time. Continued use of the Site
            after changes are posted constitutes acceptance of the revised
            Terms.
        </p>
    </section>

    <enhanced:img
        alt="Siffrin heart emoji"
        loading="lazy"
        fetchpriority="low"
        src="$lib/assets/img/sifheart.png"
        width="75"
        class="mx-auto mt-10"
    />
</main>
