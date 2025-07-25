import re
from bs4 import BeautifulSoup

from app.schemas.applications import  ApplicationUpdate
from typing import List

def find_job_title(soup) -> str:
    title = soup.find(string=re.compile("Engineer")) or soup.find(string=re.compile("Developer"))
    
    return title if title else ""

def find_company(soup) -> str:
    text_candidate = soup.find(string=re.compile("At")) or soup.find(string=re.compile("at")) or soup.find(string=re.compile("@"))
    text_list = text_candidate.split() if text_candidate else []
    company_text = ""

    if len(text_list) > 1:
      company_text = text_list[1] or ""

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
   salary_string = soup.find(string=re.compile(",000")) or soup.find(string=re.compile("0K"))
   regex_query = r"\$\d{1,3}(?:,\d{3})*(?:\s*-\s*\d{1,3}(?:,\d{3})*)?"
   salary = re.search(regex_query, salary_string) if salary_string else ""

   return salary.group(0) if salary else ""

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

