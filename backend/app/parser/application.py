import re
from bs4 import BeautifulSoup

from app.schemas.applications import  ApplicationUpdate
from typing import List

def find_job_title(soup) -> str:
    title = soup.find(string=re.compile("Engineer")) or soup.find(string=re.compile("Developer"))
    
    return title if title else ""

def find_company(soup) -> str:
    text_candidate = soup.find("At")
    text_list = text_candidate.split() if text_candidate else []
    company_text = ""

    if "At" in text_list:
      keyword_index = text_list.index("At")
      company_text = text_list[keyword_index + 1] or ""
      if text_list[keyword_index +2][-1] == ",":
        company_text = company_text + " " + text_list[2]

    if company_text == "":
      text_candidate = soup.find(string=re.compile("About"))
      text_list = text_candidate.split() if text_candidate else []
      if len(text_list) > 1 and len(text_list) < 4 and text_list[1].lower != "you":
        company_text =  " ".join(text_list[1:])

    if company_text == "":
      text_candidate = soup.find(string=re.compile("is a tech company")) or soup.find(string=re.compile("is an equal opportunity"))
      text_list = text_candidate.split() if text_candidate else []

      if len(text_list) > 1:
        if text_list[1] == "is":
          company_text = text_list[0]
        elif text_list[2] == "is":
          company_text = text_list[0] + " " + text_list[1]

    return company_text.rstrip('.,')


def find_location(soup) -> str:
    remote_text = soup.find(string=re.compile("Remote"))
    if remote_text:
       return remote_text
    
    location_text = ""
    text_list = soup.get_text().split()[0:100]
    for index, text in enumerate(text_list):
        if text == "Location" or text == "Location":
          location_text = text_list[index + 1]
          break
    
    return location_text

def find_salary(soup) -> str:
    text = soup.get_text() if hasattr(soup, 'get_text') else str(soup)

    salary_patterns = [
        r'\$\d{1,3}(?:,?\d{3})*\s*-\s*\$?\d{1,3}(?:,?\d{3})*',
        r'\$?\d{1,3}k?\s*-\s*\$?\d{1,3}k',
        r'\d{1,3}(?:,\d{3})*\s*-\s*\d{1,3}(?:,\d{3})*(?:\s*USD)?',
        r'\$\d{1,3}(?:,?\d{3})*(?:k)?',
        r'\d{1,3}(?:,\d{3})*(?:\s*USD)?'
    ]

    for pattern in salary_patterns:
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            return match.group(0).strip()

    return ""

def parse_application(application: ApplicationUpdate):
  if application["posting"]:
    soup = BeautifulSoup(application["posting"], 'html.parser')

    if not application["company"]:
      application["company"] = find_company(soup)
    if not application["title"]:
      application["title"] = find_job_title(soup)
    if not application["location"]:
      application["location"] = find_location(soup)
    if not application["salary"]:
      application["salary"] = find_salary(soup)

  return application

