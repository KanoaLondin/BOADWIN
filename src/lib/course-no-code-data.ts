// Course track 10: "No-Code AI Data Analysis" (Beginner, Free for now — re-gate
// as Premium once more units exist).
import type { Level } from "./course-data";

export const noCodeDataLevels: Level[] = [
  {
    id: "ncL1",
    title: "No-Code Data Analysis",
    tier: "Free",
    ageRange: "Ages 13+",
    badge: "Beginner",
    units: [
      {
        id: "nc0",
        title: "Ask your spreadsheet a question",
        description: "Use plain-English questions to explore data without writing formulas",
        lessons: [
          {
            id: "nc0l1",
            title: "You don't need formulas anymore",
            xp: 20,
            content:
              "Newer AI tools let you type a plain-English question about your data, like \"what were our top 3 products last month,\" and get an answer or chart back. You don't have to write a formula, build a pivot table by hand, or remember which function does what. The main shift is from telling the computer exactly how to calculate something to describing what you want to know.",
            exercises: [
              {
                type: "multiple-choice",
                question: "What's the main shift these tools make?",
                options: [
                  "You describe what you want to know instead of writing the steps to get it",
                  "They eliminate the need to have any data at all",
                ],
                correctIndex: 0,
              },
            ],
          },
          {
            id: "nc0l2",
            title: "Asking a good question",
            xp: 20,
            content:
              "Vague questions get vague, unreliable answers. \"How's business?\" invites the tool to guess what you mean. A better question names the metric, the time period, and how you want it sorted: \"What was revenue by region last quarter, highest to lowest?\" The more specific you are, the less the AI has to fill in on its own.",
            exercises: [
              {
                type: "multiple-choice",
                question: "Which question is more likely to get a trustworthy answer?",
                options: [
                  "What was total revenue by region in Q3, sorted highest to lowest?",
                  "How are we doing overall?",
                ],
                correctIndex: 0,
              },
              {
                type: "multiple-choice",
                question: "Pick the better rewrite of \"Are sales good this year?\"",
                options: [
                  "What is total sales this year compared to the same period last year, as a percentage change?",
                  "Tell me about sales",
                ],
                correctIndex: 0,
              },
            ],
          },
          {
            id: "nc0l3",
            title: "Reading what it gives you back",
            xp: 20,
            content:
              "Before trusting a generated chart or summary, do a quick sanity check. Does the total roughly match what you already know? Are the units and time period clearly labeled? Could the tool have grabbed the wrong column or counted something twice? A small mismatch is often a sign that the question was interpreted differently than you intended.",
            exercises: [
              {
                type: "multiple-choice",
                question:
                  "A tool reports total customers as 40,000 but your raw spreadsheet only has 4,200 rows. What likely happened?",
                options: [
                  "It probably summed the wrong column, or double-counted rows",
                  "Nothing - spreadsheets often undercount",
                ],
                correctIndex: 0,
              },
            ],
          },
          {
            id: "nc0l4",
            title: "When to trust it, when to double-check",
            xp: 20,
            content:
              "These tools are great for a first pass and for exploring data quickly. But before a generated number drives a real decision — like pricing, headcount, or a public report — verify it the same way you'd verify any other AI claim. Treat the output as a starting point, not the final word.",
            exercises: [
              {
                type: "multiple-choice",
                question:
                  "An AI tool suggests raising prices 8% based on a demand analysis it ran. What's the right next step?",
                options: [
                  "Check the underlying numbers and methodology before acting on it",
                  "Implement it - the analysis came with a specific number, so it's solid",
                ],
                correctIndex: 0,
              },
            ],
          },
          {
            id: "nc0q",
            title: "Unit Review",
            xp: 50,
            isQuiz: true,
            exercises: [
              {
                type: "multiple-choice",
                question: "What do no-code AI data tools let you do?",
                options: [
                  "Ask questions about your data in plain language instead of writing formulas",
                  "Replace the need to ever collect or clean data",
                ],
                correctIndex: 0,
              },
              {
                type: "multiple-choice",
                question: "Which question is more likely to produce a trustworthy answer?",
                options: [
                  "What was total revenue by region in Q3, sorted highest to lowest?",
                  "How are we doing overall?",
                ],
                correctIndex: 0,
              },
              {
                type: "multiple-choice",
                question:
                  "If a generated total doesn't match what you already know, what should you do?",
                options: [
                  "Investigate before trusting it",
                  "Assume your own records are wrong",
                ],
                correctIndex: 0,
              },
              {
                type: "multiple-choice",
                question: "A wildly wrong total is most likely caused by:",
                options: [
                  "The tool summed the wrong column or double-counted rows",
                  "The spreadsheet being too small",
                ],
                correctIndex: 0,
              },
              {
                type: "multiple-choice",
                question: "These tools are best used for:",
                options: [
                  "First-pass exploration, verified before big decisions",
                  "Final decisions without any extra checking",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement:
                  "A specific number from an AI analysis is automatically decision-ready.",
                answer: false,
                explanation:
                  "Specific numbers can still come from wrong assumptions or columns, so verify before acting.",
              },
            ],
          },
        ],
      },
      {
        id: "nc1",
        title: "Getting your data ready",
        description: "Tidy up tables so AI tools can actually understand them",
        lessons: [
          {
            id: "nc1l1",
            title: "What a tidy table looks like",
            xp: 20,
            content:
              "AI tools work best on data shaped like a simple table: one row per record, one column per piece of information, and a single header row with clear names. If a spreadsheet has merged cells, subtotal rows mixed in with data, or two different topics crammed into one sheet, the tool has to guess what you meant, and guesses lead to wrong answers. Before asking a question, take a minute to picture whether a stranger could understand each row and column just by reading the headers.",
            exercises: [
              {
                type: "true-false",
                statement:
                  "A spreadsheet with subtotal rows mixed into the data makes it easier for an AI tool to summarize correctly.",
                answer: false,
                explanation:
                  "Subtotal rows can get counted as if they were regular records, inflating totals.",
              },
              {
                type: "multiple-choice",
                question: "Which describes a 'tidy' table?",
                options: [
                  "One row per record, one column per variable, a single clear header row",
                  "Several unrelated tables stacked in one sheet with no headers",
                ],
                correctIndex: 0,
              },
            ],
          },
          {
            id: "nc1l2",
            title: "One row per record",
            xp: 20,
            content:
              "A common mistake is putting one customer or order across several rows, or squeezing several time periods into one row with a column for each month. AI tools generally assume each row is one independent record, like one sale or one customer. When that assumption is broken, totals get miscounted and comparisons between groups stop making sense. Reshaping a table so every row represents exactly one thing, one order, one visit, one transaction, is one of the highest-value fixes you can make before analysis.",
            exercises: [
              {
                type: "fill-blank",
                prompt:
                  "In a tidy table, each ____ should represent exactly one record, such as one order or one customer.",
                answer: "row",
                acceptableAnswers: ["rows"],
              },
              {
                type: "multiple-choice",
                question:
                  "A sheet has one row per customer but columns named 'Jan Sales', 'Feb Sales', 'Mar Sales'. What problem does this create for a 'sales by month' question?",
                options: [
                  "The tool has to know to treat each month column as a separate time record, which it may not do correctly",
                  "There is no problem, this is the ideal layout",
                ],
                correctIndex: 0,
              },
            ],
          },
          {
            id: "nc1l3",
            title: "Consistent headers and clean dates",
            xp: 20,
            content:
              "Column headers should be short, consistent, and used only once per sheet, things like \"Order Date\" or \"Customer ID\" rather than \"info\" or a blank cell. Dates cause particular trouble: a column mixing \"3/4/24\" and \"March 4, 2024\" and \"2024-03-04\" can be read inconsistently, especially since some formats are ambiguous about whether the month or day comes first. Picking one consistent date format, and keeping text out of numeric columns, saves the AI tool from silently misreading your data.",
            exercises: [
              {
                type: "multiple-choice",
                question: "Why are mixed date formats risky in a data table?",
                options: [
                  "Some formats are ambiguous, so the tool may swap the day and month by mistake",
                  "Dates never cause any issues for AI tools",
                ],
                correctIndex: 0,
              },
              {
                type: "drag-drop",
                instruction:
                  "Put these steps in order for cleaning up a messy date column.",
                words: [
                  "Notice dates are stored in several different formats",
                  "Pick one consistent format for the whole column",
                  "Convert every entry to that format",
                  "Re-check that sorting by date now works correctly",
                ],
              },
            ],
          },
          {
            id: "nc1l4",
            title: "Duplicates and why messy data breaks answers",
            xp: 20,
            content:
              "Duplicate rows, the same order imported twice, or a customer entered under two slightly different spellings, quietly inflate counts and totals. An AI tool has no way to know which rows are true duplicates unless you remove or flag them first. Messy data doesn't just produce slightly-off numbers; it can produce answers that look perfectly confident and specific while being wrong, which is more dangerous than an obviously broken result because it's easy to trust.",
            exercises: [
              {
                type: "true-false",
                statement:
                  "An AI tool can automatically detect and remove duplicate records without you cleaning the data first.",
                answer: false,
                explanation:
                  "Tools generally count what's there; duplicates need to be found and removed before analysis.",
              },
              {
                type: "short-answer",
                question:
                  "Explain in a sentence or two why a confident-looking, specific number from an AI tool can still be wrong.",
                minWords: 15,
                referenceAnswer:
                  "The number can be based on messy data, like duplicate rows or misread dates, so it can look precise while actually being inflated or miscounted.",
              },
            ],
          },
          {
            id: "nc1q",
            title: "Unit Review",
            xp: 50,
            isQuiz: true,
            exercises: [
              {
                type: "multiple-choice",
                question: "What does 'tidy data' mean?",
                options: [
                  "One row per record, one column per variable, clear headers",
                  "Data with no headers so it looks cleaner",
                ],
                correctIndex: 0,
              },
              {
                type: "multiple-choice",
                question:
                  "A sheet has separate columns for Jan, Feb, and Mar sales per customer. What issue can this cause?",
                options: [
                  "The tool may not correctly treat each month as a separate time record",
                  "No issue, this is the most tidy possible layout",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement:
                  "Mixing date formats like '3/4/24' and '2024-03-04' in one column can cause dates to be misread.",
                answer: true,
              },
              {
                type: "fill-blank",
                prompt:
                  "In a tidy table, each row should represent exactly one ____, such as one order or one customer.",
                answer: "record",
                acceptableAnswers: ["records"],
              },
              {
                type: "multiple-choice",
                question: "Why are duplicate rows dangerous?",
                options: [
                  "They quietly inflate totals and counts without any obvious sign something is wrong",
                  "They are always obvious and easy to spot, so they cause no real harm",
                ],
                correctIndex: 0,
              },
              {
                type: "matching",
                instruction: "Match each data problem to its likely effect.",
                pairs: [
                  { term: "Duplicate rows", definition: "Totals and counts get inflated" },
                  {
                    term: "Mixed date formats",
                    definition: "Day and month can be swapped by mistake",
                  },
                  {
                    term: "One customer split across many rows",
                    definition: "Per-customer totals become incorrect",
                  },
                  {
                    term: "Inconsistent headers",
                    definition: "The tool may misread which column holds which data",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "nc2",
        title: "Charts and summaries that tell the truth",
        description: "Spot misleading charts and pick summaries that reflect reality",
        lessons: [
          {
            id: "nc2l1",
            title: "Picking the right chart",
            xp: 20,
            content:
              "Different questions call for different chart types. Comparing a handful of categories usually calls for a bar chart. Showing change over time calls for a line chart. Showing how parts make up a whole calls for a pie chart, but only when there are few slices. When you ask an AI tool for a chart, it will guess a chart type based on your question and data, but it's worth checking that the guess actually fits what you're trying to show, since the wrong chart type can make a clear pattern look confusing or hide it entirely.",
            exercises: [
              {
                type: "multiple-choice",
                question: "Which chart type best shows a trend over the last 12 months?",
                options: ["A line chart", "A pie chart"],
                correctIndex: 0,
              },
              {
                type: "multiple-choice",
                question:
                  "You want to compare total sales across five product categories for one month. What chart fits best?",
                options: ["A bar chart", "A line chart"],
                correctIndex: 0,
              },
            ],
          },
          {
            id: "nc2l2",
            title: "Misleading axes",
            xp: 20,
            content:
              "A chart can be technically accurate and still mislead. Starting a bar chart's y-axis at 90 instead of 0 can make a 2% difference look enormous. Stretching or squashing the x-axis can make a mild trend look dramatic, or a steep trend look flat. AI tools sometimes auto-scale axes in ways that exaggerate small differences, so it's worth glancing at the axis labels before drawing a conclusion from the shape of a chart alone.",
            exercises: [
              {
                type: "true-false",
                statement:
                  "Starting a bar chart's y-axis at a number other than zero can make small differences look much bigger than they are.",
                answer: true,
              },
              {
                type: "fill-blank",
                prompt:
                  "Before trusting the shape of a chart, it's worth checking the ____ labels to see if the scale is exaggerating differences.",
                answer: "axis",
                acceptableAnswers: ["axes"],
              },
            ],
          },
          {
            id: "nc2l3",
            title: "Averages vs medians",
            xp: 20,
            content:
              "The average, or mean, adds up all values and divides by the count, so a few extreme values can pull it a long way. The median is the middle value when everything is sorted, so it's less affected by outliers. If one customer places a $500,000 order in a month of mostly $200 orders, the average order size will look much higher than what a typical customer actually spent, while the median will stay close to typical. When you ask an AI tool to summarize typical behavior, it's worth asking for the median as well as the average, especially for anything involving money.",
            exercises: [
              {
                type: "multiple-choice",
                question:
                  "A single $500,000 order sits among mostly $200 orders. Which measure better reflects the 'typical' order size?",
                options: ["The median", "The average"],
                correctIndex: 0,
              },
              {
                type: "multiple-choice",
                question: "Why can a few extreme values distort an average?",
                options: [
                  "The average adds all values together, so a very large or small value pulls the total a long way",
                  "Averages ignore any value more than twice the median",
                ],
                correctIndex: 0,
              },
            ],
          },
          {
            id: "nc2l4",
            title: "Spotting outliers",
            xp: 20,
            content:
              "An outlier is a value far outside the normal range for the data, like a data-entry typo that turns a $45 order into a $4,500 order, or a genuinely unusual event like a huge one-time sale. Outliers can quietly dominate a summary or chart, so it's worth asking an AI tool to list the highest and lowest values, or to flag anything unusually far from the rest, before trusting an overall summary. Once you spot an outlier, decide deliberately whether to fix it, remove it, or keep it, rather than letting it silently skew the result.",
            exercises: [
              {
                type: "true-false",
                statement:
                  "Outliers should always be deleted from the data without checking why they occurred.",
                answer: false,
                explanation:
                  "An outlier might be a genuine unusual event worth keeping, or a data-entry error worth fixing; it's worth investigating before deciding.",
              },
              {
                type: "short-answer",
                question:
                  "Describe one way to check whether a chart or summary is being skewed by an outlier.",
                minWords: 12,
                referenceAnswer:
                  "Ask the AI tool to list the highest and lowest values in the data, or to flag values far from the rest, and inspect them before trusting the summary.",
              },
            ],
          },
          {
            id: "nc2q",
            title: "Unit Review",
            xp: 50,
            isQuiz: true,
            exercises: [
              {
                type: "multiple-choice",
                question: "Which chart type is best for showing a trend over time?",
                options: ["A line chart", "A pie chart"],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement:
                  "A y-axis that doesn't start at zero can make small differences look dramatic.",
                answer: true,
              },
              {
                type: "multiple-choice",
                question: "What does the median measure?",
                options: [
                  "The middle value when all values are sorted",
                  "The sum of all values divided by the count",
                ],
                correctIndex: 0,
              },
              {
                type: "multiple-choice",
                question:
                  "A dataset of mostly $50 orders has one $50,000 order. Which measure stays closest to 'typical'?",
                options: ["The median", "The average"],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt:
                  "A value far outside the normal range of a dataset, like a data-entry typo, is called an ____.",
                answer: "outlier",
                acceptableAnswers: ["outliers"],
              },
              {
                type: "matching",
                instruction: "Match each concept to its description.",
                pairs: [
                  { term: "Bar chart", definition: "Good for comparing a few categories" },
                  { term: "Line chart", definition: "Good for showing change over time" },
                  {
                    term: "Median",
                    definition: "The middle value, less affected by extreme values",
                  },
                  {
                    term: "Outlier",
                    definition: "A value far outside the normal range of the data",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "nc3",
        title: "From numbers to decisions",
        description: "Turn a summary into a finding you can actually act on",
        lessons: [
          {
            id: "nc3l1",
            title: "Correlation vs causation",
            xp: 20,
            content:
              "Two things moving together, like ice cream sales and sunburn rates both rising in summer, doesn't mean one causes the other. Both can be driven by a third factor, in this case warm weather. AI tools are good at finding patterns and correlations in data, but they can't tell you whether one thing actually causes another just by looking at historical numbers. Before acting on a pattern the tool finds, ask whether there's a believable reason for a direct cause, or whether something else might explain both trends.",
            exercises: [
              {
                type: "true-false",
                statement:
                  "If two variables rise and fall together, one must be causing the other.",
                answer: false,
                explanation:
                  "A third factor can drive both, or the link can be coincidental; correlation alone doesn't prove causation.",
              },
              {
                type: "multiple-choice",
                question:
                  "Website traffic and coffee shop sales near the office both rise every weekday and fall on weekends. What's the most likely explanation?",
                options: [
                  "Both are driven by the same underlying pattern, more people being active on weekdays",
                  "Coffee sales are directly causing more website traffic",
                ],
                correctIndex: 0,
              },
            ],
          },
          {
            id: "nc3l2",
            title: "Sample size and seasonality",
            xp: 20,
            content:
              "A pattern found in five data points is much shakier than the same pattern found in five hundred, so it's worth asking how much data a finding is actually based on before trusting it. Many businesses also have seasonal cycles: a coffee shop's slow February isn't a sign of decline if February is always slow. Comparing this month to last month can be misleading; comparing this month to the same month last year often tells a truer story, since it accounts for the seasonal pattern.",
            exercises: [
              {
                type: "fill-blank",
                prompt:
                  "Regular ups and downs tied to the time of year, like a slow February for a coffee shop, are called ____.",
                answer: "seasonality",
              },
              {
                type: "multiple-choice",
                question:
                  "A finding is based on only 6 data points. What should you do before trusting it?",
                options: [
                  "Treat it cautiously and look for more data before making a big decision on it",
                  "Trust it fully, since any pattern found by an AI tool is reliable",
                ],
                correctIndex: 0,
              },
            ],
          },
          {
            id: "nc3l3",
            title: "Segmenting for a clearer picture",
            xp: 20,
            content:
              "An overall average can hide very different stories happening underneath it. Total sales might look flat, while new customers are actually growing fast and returning customers are shrinking just as fast, and those two facts call for very different responses. Segmenting means breaking a summary down by a meaningful group, like customer type, region, or product line, so those hidden patterns become visible. When an overall number looks surprising or flat, asking an AI tool to break it down by a relevant group is often the fastest way to understand what's really happening.",
            exercises: [
              {
                type: "multiple-choice",
                question: "What does 'segmenting' data mean?",
                options: [
                  "Breaking a summary down by a meaningful group, like region or customer type",
                  "Deleting any rows that don't fit the overall trend",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement:
                  "Overall totals can hide opposite trends happening in different customer groups.",
                answer: true,
              },
            ],
          },
          {
            id: "nc3l4",
            title: "Writing a finding for a decision maker",
            xp: 20,
            content:
              "A good one-paragraph finding states the question, the answer, the evidence behind it, and any caveats, in plain language a busy decision maker can act on. For example: \"Returning-customer revenue fell 12% this quarter versus the same quarter last year, mainly in the under-30 segment; this is based on 3,400 orders and excludes one large one-time order that was removed as an outlier. Recommend investigating retention in that segment before the next campaign.\" This is far more useful than handing someone a raw chart and letting them guess at what matters.",
            exercises: [
              {
                type: "drag-drop",
                instruction:
                  "Put these parts of a good written finding in a sensible order.",
                words: [
                  "State the question that was being investigated",
                  "Give the answer in plain language",
                  "Show the evidence or numbers behind the answer",
                  "Note any caveats or limitations",
                  "Suggest a next step or recommendation",
                ],
              },
              {
                type: "short-answer",
                question:
                  "Write a one-paragraph finding (at least 25 words) for a decision maker, based on any data question you like, including the answer, evidence, and a caveat.",
                minWords: 25,
              },
            ],
          },
          {
            id: "nc3q",
            title: "Unit Review",
            xp: 50,
            isQuiz: true,
            exercises: [
              {
                type: "true-false",
                statement:
                  "If two trends move together, that proves one directly causes the other.",
                answer: false,
                explanation:
                  "A third factor could drive both, or the link could be coincidental.",
              },
              {
                type: "fill-blank",
                prompt:
                  "Regular ups and downs tied to the time of year are called ____.",
                answer: "seasonality",
              },
              {
                type: "multiple-choice",
                question:
                  "Why compare this month to the same month last year rather than to last month?",
                options: [
                  "It accounts for seasonal patterns that would otherwise be misleading",
                  "It is always mathematically identical to comparing to last month",
                ],
                correctIndex: 0,
              },
              {
                type: "multiple-choice",
                question: "What does segmenting data help reveal?",
                options: [
                  "Different trends hidden underneath an overall average",
                  "The exact cause of every trend in the data",
                ],
                correctIndex: 0,
              },
              {
                type: "multiple-choice",
                question: "A good written finding for a decision maker should include:",
                options: [
                  "The question, the answer, the evidence, and any caveats",
                  "Only a raw chart with no explanation",
                ],
                correctIndex: 0,
              },
              {
                type: "matching",
                instruction: "Match each term to its meaning.",
                pairs: [
                  {
                    term: "Correlation",
                    definition: "Two things moving together, without proving one causes the other",
                  },
                  {
                    term: "Seasonality",
                    definition: "A regular pattern tied to the time of year",
                  },
                  {
                    term: "Segmenting",
                    definition: "Breaking data down by a meaningful group",
                  },
                  {
                    term: "Sample size",
                    definition: "How much data a finding is actually based on",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "nc4",
        title: "Doing it safely and repeatably",
        description: "Protect sensitive data and set up analysis you can trust again next month",
        lessons: [
          {
            id: "nc4l1",
            title: "What not to paste into an AI tool",
            xp: 20,
            content:
              "Many AI data tools send your spreadsheet to a server outside your company to process it, and some may use uploaded data to improve their models unless you've turned that off. Before pasting or uploading data, check what the tool's privacy settings actually allow, and avoid pasting anything you wouldn't want to leave the building: full customer lists with contact details, payment information, health records, or anything covered by a confidentiality agreement. When in doubt, remove or mask identifying columns first, or ask a manager whether the tool is approved for that kind of data.",
            exercises: [
              {
                type: "multiple-choice",
                question:
                  "Before uploading customer data to an AI tool, what should you check first?",
                options: [
                  "The tool's privacy settings and whether it's approved for that kind of data",
                  "Nothing, all AI tools handle sensitive data the same safe way",
                ],
                correctIndex: 0,
              },
              {
                type: "true-false",
                statement:
                  "It's fine to paste a full customer list with names, emails, and payment details into any AI tool as long as the analysis is useful.",
                answer: false,
                explanation:
                  "Sensitive personal and payment data should be checked against privacy rules and masked or removed before uploading.",
              },
            ],
          },
          {
            id: "nc4l2",
            title: "Privacy and customer data",
            xp: 20,
            content:
              "Customer data is often protected by law and by your company's own privacy promises, so mishandling it can create real legal and reputational risk. A useful habit is masking: replacing names and contact details with generic labels like \"Customer 1042\" before running an analysis that doesn't actually need to know who each person is. Most business questions, like which region is growing fastest, don't require any personal details at all, so removing them first is usually free protection with no real cost to the analysis.",
            exercises: [
              {
                type: "fill-blank",
                prompt:
                  "Replacing names and contact details with generic labels before analysis is called ____.",
                answer: "masking",
              },
              {
                type: "multiple-choice",
                question:
                  "A question about 'which region is growing fastest' needs which of these?",
                options: [
                  "Region and sales figures, but not customer names or contact details",
                  "Full customer names and personal contact details",
                ],
                correctIndex: 0,
              },
            ],
          },
          {
            id: "nc4l3",
            title: "Documenting your question and method",
            xp: 20,
            content:
              "A useful finding can become useless a month later if nobody remembers exactly what was asked, which data was used, or which rows were excluded. Writing down the exact question, the date range, the source file, and any cleanup steps (like removing duplicates or an outlier) takes only a minute but means the analysis can be checked, explained to a colleague, or redone later with confidence. Treat this documentation as part of the finished work, not an optional extra.",
            exercises: [
              {
                type: "multiple-choice",
                question: "Why document the exact question and data used for an analysis?",
                options: [
                  "So the analysis can be checked, explained, or repeated later with confidence",
                  "So that nobody else is ever able to question the result",
                ],
                correctIndex: 0,
              },
              {
                type: "drag-drop",
                instruction:
                  "Put these documentation items in a sensible order for a written record.",
                words: [
                  "The exact question that was asked",
                  "The source file and date range used",
                  "Any cleanup steps, like removing duplicates",
                  "The resulting finding and any caveats",
                ],
              },
            ],
          },
          {
            id: "nc4l4",
            title: "Rerunning the same analysis next month",
            xp: 20,
            content:
              "A one-off answer is useful once; a repeatable process is useful every month. If you documented the exact question, data source, and cleanup steps, rerunning the same analysis next month is mostly a matter of refreshing the data and asking the same question again, which makes it easy to track a trend over time instead of just seeing a single snapshot. Small differences in wording between runs can change the answer, so reusing the exact same question each time keeps comparisons fair.",
            exercises: [
              {
                type: "true-false",
                statement:
                  "Reusing the exact same question wording each month makes month-to-month comparisons more reliable.",
                answer: true,
              },
              {
                type: "short-answer",
                question:
                  "Explain in a sentence or two why documenting a question and method makes it easier to repeat an analysis next month.",
                minWords: 15,
                referenceAnswer:
                  "With the exact question, data source, and cleanup steps written down, you can refresh the data and rerun the same steps without having to guess what was done originally.",
              },
            ],
          },
          {
            id: "nc4q",
            title: "Unit Review",
            xp: 50,
            isQuiz: true,
            exercises: [
              {
                type: "multiple-choice",
                question:
                  "Before uploading customer data to an AI tool, what should you check?",
                options: [
                  "The tool's privacy settings and whether it's approved for that data",
                  "Nothing, it's always safe",
                ],
                correctIndex: 0,
              },
              {
                type: "fill-blank",
                prompt:
                  "Replacing names and contact details with generic labels before analysis is called ____.",
                answer: "masking",
              },
              {
                type: "true-false",
                statement:
                  "Most business questions about trends require full customer names and contact details.",
                answer: false,
                explanation:
                  "Most trend questions only need figures like region and sales, not personal identifying details.",
              },
              {
                type: "multiple-choice",
                question: "What should be documented alongside an analysis?",
                options: [
                  "The exact question, data source, date range, and cleanup steps",
                  "Nothing, the final chart speaks for itself",
                ],
                correctIndex: 0,
              },
              {
                type: "multiple-choice",
                question:
                  "Why reuse the exact same question wording when repeating an analysis next month?",
                options: [
                  "Small wording differences can change the answer, so consistency keeps comparisons fair",
                  "Wording never affects the answer an AI tool gives",
                ],
                correctIndex: 0,
              },
              {
                type: "matching",
                instruction: "Match each practice to its main benefit.",
                pairs: [
                  {
                    term: "Masking customer data",
                    definition: "Reduces privacy risk while keeping the analysis useful",
                  },
                  {
                    term: "Documenting the method",
                    definition: "Lets the analysis be checked or repeated later",
                  },
                  {
                    term: "Reusing the same question wording",
                    definition: "Keeps month-to-month comparisons fair",
                  },
                  {
                    term: "Checking a tool's privacy settings",
                    definition: "Confirms whether it's safe to upload sensitive data",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
