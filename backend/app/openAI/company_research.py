import openai
import json
import os
from dotenv import load_dotenv

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

def get_company_name_from_url(url: str) -> str:
    """
    Use OpenAI's API to extract a company's name from a website link.
    
    :param url: The website URL to extract the company information from
    :return: The extracted company
    """

    prompt = f"For the following website: {url}. Get company information to provide insight for a job seeker such as the company name, location, employee count, industry in three words or less, and latest round of funding or "" if not known.  It should return as JSON in this format: {{'name': 'company name', 'location': 'city, state', 'size': 'employee count', 'industry': 'industry', funding: 'latest round of funding'}}"

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}
        ]
    )

    # Extract the JSON string from the response
    message = response["choices"][0]["message"]["content"]

    # Try to parse it into a Python dictionary
    try:
        result = json.loads(message)
        return result
    except json.JSONDecodeError:
        return {"error": "Failed to parse JSON", "raw": message}

