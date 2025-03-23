from database import Base
from sqlalchemy import Column, Integer, String, TEXT

class Application(Base):
  __tablename__ = "applications"
  id = Column(Integer, primary_key=True, index=True)
  company = Column(String)
  title = Column(String)
  status = Column(String)
  date_applied = Column(String)
  salary = Column(String)
  posting_link = Column(String)
  company_site = Column(String)
  posting = Column(TEXT)
  