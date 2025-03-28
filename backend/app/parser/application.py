from app.schemas.applications import  ApplicationUpdate
from typing import List
import re


def get_candidates(parsed_text: List[str]) -> List[str]:
    first_items = parsed_text[:10]
    return [s for s in first_items if len(s) < 50]


def find_job_title(parsed_text: List[str]) -> str:
    title = next(
        (text for text in parsed_text if "engineer" in text.lower() or "developer" in text.lower()), 
        ""
    )
    return title

def remove_punctuation(text: str) -> str:
    return re.sub(r'[^\w\s]', '', text)

def find_company(parsed_text: List[str]) -> str:
    is_cap = re.compile(r'[A-Z]')
    is_lower = re.compile(r'[a-z(]')

    candidate = next(
        (text for text in parsed_text if (text[:2].lower() == "at" or text[:2].lower() == "about") and is_cap.search(text.split(" ")[1])), 
        None
    )

    if candidate:
        words = candidate.split(" ")
        words.pop(0)  # Remove "At"
        first_lower_case = next((i for i, word in enumerate(words) if is_lower.match(word[0])), len(words))
        company = " ".join(words[:first_lower_case])
        return remove_punctuation(company)
    
    return ""

def find_location(parsed_text: List[str]) -> str:
    location_text = ""

    location_tag = next((text for text in parsed_text if "Location: " in text), None)
    remote_text = next((text for text in parsed_text if "remote" in text.lower()), None)

    if location_tag:
        location_text = location_tag.replace("Location: ", "")
    elif remote_text:
        location_text = remote_text

    return location_text

def parse_application(application: ApplicationUpdate):
  if application["posting"]:
    parsed_text = [line for line in application["posting"].split("\n") if line.strip()]
    candidates = get_candidates(parsed_text)
    if not application["company"]:
      application["company"] = find_company(parsed_text)
    if not application["title"]:
      application["title"] = find_job_title(candidates)
    if not application["location"]:
      application["location"] = find_location(candidates)
  return application

