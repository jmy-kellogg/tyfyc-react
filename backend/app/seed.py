import json
import os
from sqlalchemy.orm import Session
from app.models import SkillsOption, Base
from app.database import SessionLocal, engine

Base.metadata.create_all(bind=engine)

def seed_skill_options():
    file_path = os.path.join(os.path.dirname(__file__), 'seed_data.json')

    with open(file_path, 'r') as file:
        data = json.load(file)
        skills = data["skill_options"]

    db: Session = SessionLocal()

    try:
        for skill in skills:
            existing_skill = db.query(SkillsOption).filter(SkillsOption.name == skill).first()
            if not existing_skill:
              new_skill = SkillsOption(name=skill)
              db.add(new_skill)
              print(f"Added skill: {skill}")
        db.commit()
    except Exception as e:
        db.rollback()
        print(f"Error seeding skills: {e}")
    finally:
        db.close()

    print("Seeding complete.")

# Run the seeding function
if __name__ == '__main__':
    seed_skill_options()