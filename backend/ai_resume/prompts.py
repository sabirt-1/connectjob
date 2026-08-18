


SUMMARY_PROMPT = """
You are an expert ATS Resume Writer.

Using the candidate information below, write a professional resume summary.

Requirements:

- 60-100 words
- ATS friendly
- Professional tone
- No first person
- Mention strongest skills
- Mention experience if available
- Mention education only if relevant
- Mention projects if useful

Candidate Information

Name:
{name}

Skills:
{skills}

Education:
{education}

Experience:
{experience}

Projects:
{projects}

Return ONLY the summary.
"""


EXPERIENCE_PROMPT = """
Rewrite the following work experience into a strong ATS-friendly resume description.

Requirements:

- Bullet points
- Action verbs
- Professional tone
- Quantify achievements when possible
- Do not invent fake technologies

Experience:

{description}

Return only the improved version.
"""


PROJECT_PROMPT = """
Write a professional ATS project description.

Project Name:
{name}

Technologies:
{technologies}

Purpose:
{purpose}

Return 4-6 bullet points.
"""


COVER_LETTER_PROMPT = """
Write a professional cover letter.

Candidate:
{name}

Job Title:
{job_title}

Company:
{company}

Skills:
{skills}

Experience:
{experience}

Return only the cover letter.
"""


JOB_MATCH_PROMPT = """
You are an ATS Resume Analyzer.

Compare the following resume with the job description.

Resume

Name:
{name}

Skills:
{skills}

Education:
{education}

Experience:
{experience}

Projects:
{projects}

Certifications:
{certifications}

Job Description:

{job_description}

Return ONLY valid JSON in this format:

{{
  "match_score": 85,
  "missing_keywords": [
    "...",
    "..."
  ],
  "strengths": [
    "...",
    "..."
  ],
  "recommendations": [
    "...",
    "..."
  ]
}}
"""


