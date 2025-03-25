import uuid
from sqlalchemy import Column, String, TEXT
from app.database import Base

def generate_uuid():
    return str(uuid.uuid4())

class Application(Base):
  __tablename__ = "applications"
  id = Column(String, primary_key=True, default=generate_uuid)
  company = Column(String)
  title = Column(String)
  status = Column(String)
  date_applied = Column(String)
  location = Column(String)
  salary = Column(String)
  posting_link = Column(String)
  company_site = Column(String)
  posting = Column(TEXT)
