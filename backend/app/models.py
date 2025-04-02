import uuid
from datetime import datetime
from sqlalchemy import Column, String, TEXT, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
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
  summary = Column(String)

class User(Base):
    __tablename__ = "users"
    id = Column(String, primary_key=True, default=generate_uuid)
    first_name = Column(String)
    last_name = Column(String)
    email = Column(String, unique=True, index=True)
    username = Column(String, unique=True, index=True)
    job_title = Column(String)
    summary = Column(String)
    city = Column(String)
    state = Column(String)
    phone = Column(String)
    git_hub = Column(String)
    linked_in = Column(String)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)

class Skill(Base):
    __tablename__ = "skills"
    id = Column(String, primary_key=True, default=generate_uuid)
    category = Column(String)
    user_id = Column(String, ForeignKey("users.id"))
    skill_options_id = Column(String, ForeignKey("skill_options.id"))

class SkillsOption(Base):
    __tablename__ = "skill_options"
    id = Column(String, primary_key=True, default=generate_uuid)
    name = Column(String, nullable=False)
    default_category = Column(String, nullable=True)

class SkillsAlias(Base):
    __tablename__ = "skill_aliases"
    id = Column(String, primary_key=True, default=generate_uuid)
    skill_options_id = Column(String, ForeignKey("skill_options.id"), nullable=False)
    alias = Column(String, nullable=False)

class Feature_flag(Base):
    __tablename__ = "feature_flags"
    id = Column(String, primary_key=True, default=generate_uuid)
    name = Column(String, nullable=False, unique=True, index=True)
    date_created = Column(DateTime, default=datetime.utcnow)
    description = Column(String)
    is_active  = Column(Boolean, default=True)

