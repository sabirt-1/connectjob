


import os
import requests

from dotenv import load_dotenv

from .prompts import (
    SUMMARY_PROMPT,
    JOB_MATCH_PROMPT,
    EXPERIENCE_PROMPT,
    PROJECT_PROMPT,
    COVER_LETTER_PROMPT,
)

load_dotenv()


class AIResumeService:

    def __init__(self):

        # print("===== AIResumeService INIT =====")

        self.provider = "OpenRouter"

        self.api_key = os.getenv("OPENROUTER_API_KEY")

        # print("OPENROUTER KEY =", self.api_key)

        self.url = "https://openrouter.ai/api/v1/chat/completions"

        self.model = "google/gemma-4-26b-a4b-it:free"

    # 

    def generate_summary(self, resume):

        personal = resume.get("personal", {})

        prompt = SUMMARY_PROMPT.format(

            name=personal.get("fullName", ""),

            skills=resume.get("skills", ""),

            education="\n".join(
                f"{item.get('degree','')} - {item.get('institution','')}"
                for item in resume.get("education", [])
            ),

            experience="\n".join(
                f"{item.get('job_title','')} at {item.get('company_name','')}"
                for item in resume.get("experience", [])
            ),

            projects="\n".join(
                item.get("title", "")
                for item in resume.get("projects", [])
            ),
        )

        return self._generate(prompt)

# 
    def analyze_job_match(self, resume, job_description):

        personal = resume.get("personal", {})

        prompt = JOB_MATCH_PROMPT.format(

            name=personal.get("fullName", ""),

            skills=resume.get("skills", ""),

            education="\n".join(
                f"{item.get('degree','')} - {item.get('institution','')}"
                for item in resume.get("education", [])
            ),

            experience="\n".join(
                f"{item.get('job_title','')} at {item.get('company_name','')}"
                for item in resume.get("experience", [])
            ),

            projects="\n".join(
                item.get("title", "")
                for item in resume.get("projects", [])
            ),

            certifications="\n".join(
                item.get("title", "")
                for item in resume.get("certifications", [])
            ),

            job_description=job_description,
        )

        return self._generate(prompt)

    # 

    def improve_experience(self, description):

        prompt = EXPERIENCE_PROMPT.format(
            description=description
        )

        return self._generate(prompt)

    # 

    def generate_project(
        self,
        name,
        technologies,
        purpose,
    ):

        prompt = PROJECT_PROMPT.format(
            name=name,
            technologies=technologies,
            purpose=purpose,
        )

        return self._generate(prompt)

    # 

    def generate_cover_letter(
        self,
        resume,
        job_title,
        company,
    ):

        personal = resume.get("personal", {})

        prompt = COVER_LETTER_PROMPT.format(

            name=personal.get("fullName", ""),

            job_title=job_title,

            company=company,

            skills=resume.get("skills", ""),

            experience="\n".join(
                f"{item.get('job_title','')} at {item.get('company_name','')}"
                for item in resume.get("experience", [])
            ),
        )

        return self._generate(prompt)

    # 

    def _generate(self, prompt):

        headers = {

            "Authorization": f"Bearer {self.api_key}",

            "Content-Type": "application/json",
        }

        payload = {

            "model": self.model,

            "messages": [

                {
                    "role": "user",
                    "content": prompt,
                }

            ],

            "temperature": 0.7,
        }

        try:

            response = requests.post(
                self.url,
                headers=headers,
                json=payload,
                timeout=60,
            )

            data = response.json()

            if response.status_code != 200:

                return {

                    "success": False,

                    "provider": self.provider,

                    "response": str(data),
                }

            text = data["choices"][0]["message"]["content"]

            return {

                "success": True,

                "provider": self.provider,

                "response": text.strip(),
            }

        except Exception as e:

            return {

                "success": False,

                "provider": self.provider,

                "response": str(e),
            }

        
